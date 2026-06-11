package com.resumeanalyzer.backend.service;

import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class AtsScoringService {

    // Weightage constants
    private static final double SKILLS_WEIGHT = 0.30;
    private static final double KEYWORDS_WEIGHT = 0.25;
    private static final double EXPERIENCE_WEIGHT = 0.15;
    private static final double EDUCATION_WEIGHT = 0.10;
    private static final double STRUCTURE_WEIGHT = 0.10;
    private static final double GRAMMAR_WEIGHT = 0.05;
    private static final double STUFFING_PENALTY = 0.05; // -5% if detected

    public AtsScoreResult calculateScore(ResumeData resume, JobDescriptionData job) {
        
        // 1. Calculate Skills Match
        double skillsScore = calculateSkillsMatch(resume.getSkills(), job.getRequiredSkills());
        
        // 2. Calculate Keywords Match
        double keywordScore = calculateKeywordsMatch(resume.getText(), job.getKeywords());
        
        // 3. Experience Match
        double expScore = calculateExperienceScore(resume.getYearsOfExperience(), job.getRequiredYearsOfExperience());
        
        // 4. Education Match
        double eduScore = resume.hasRequiredEducation(job.getRequiredDegree()) ? 100.0 : 50.0;
        
        // 5. Structure Score
        double structureScore = calculateStructureScore(resume.getSections());
        
        // 6. Spelling & Grammar (Mocked to 100 for now, could use LanguageTool API later)
        double grammarScore = 100.0 - (resume.getSpellingErrors() * 2); // -2 points per error
        if (grammarScore < 0) grammarScore = 0;
        
        // 7. Keyword Stuffing Detection
        boolean isStuffingDetected = checkKeywordStuffing(resume.getText(), job.getKeywords());
        
        // Calculate Final Score using User's formula
        double finalScore = (SKILLS_WEIGHT * skillsScore) +
                            (KEYWORDS_WEIGHT * keywordScore) +
                            (EXPERIENCE_WEIGHT * expScore) +
                            (EDUCATION_WEIGHT * eduScore) +
                            (STRUCTURE_WEIGHT * structureScore) +
                            (GRAMMAR_WEIGHT * grammarScore);
                            
        if (isStuffingDetected) {
            finalScore -= (STUFFING_PENALTY * 100); // subtract 5 absolute points
        }
        
        // Ensure bounds
        finalScore = Math.max(0, Math.min(100, finalScore));
        
        // Determine Status
        String status = determineStatus(finalScore);
        
        // Find missing skills
        List<String> missingSkills = findMissingSkills(resume.getSkills(), job.getRequiredSkills());

        return new AtsScoreResult(
            (int) Math.round(finalScore),
            status,
            (int) skillsScore,
            (int) keywordScore,
            (int) grammarScore,
            (int) structureScore,
            missingSkills,
            isStuffingDetected
        );
    }

    private double calculateSkillsMatch(List<String> resumeSkills, List<String> jobSkills) {
        if (jobSkills == null || jobSkills.isEmpty()) return 100.0;
        long matched = jobSkills.stream()
            .filter(js -> resumeSkills.stream().anyMatch(rs -> rs.equalsIgnoreCase(js)))
            .count();
        return ((double) matched / jobSkills.size()) * 100.0;
    }

    private double calculateKeywordsMatch(String text, List<String> keywords) {
        if (keywords == null || keywords.isEmpty()) return 100.0;
        String lowerText = text.toLowerCase();
        long matched = keywords.stream()
            .filter(kw -> lowerText.contains(kw.toLowerCase()))
            .count();
        return ((double) matched / keywords.size()) * 100.0;
    }
    
    private double calculateExperienceScore(int resumeYoe, int jobYoe) {
        if (resumeYoe >= jobYoe) return 100.0;
        if (resumeYoe == 0 && jobYoe > 0) return 30.0;
        return ((double) resumeYoe / jobYoe) * 100.0;
    }

    private double calculateStructureScore(List<String> sections) {
        List<String> required = Arrays.asList("contact", "skills", "experience", "education");
        long matched = required.stream()
            .filter(req -> sections.stream().anyMatch(sec -> sec.toLowerCase().contains(req)))
            .count();
        return ((double) matched / required.size()) * 100.0;
    }

    private boolean checkKeywordStuffing(String text, List<String> keywords) {
        String lowerText = text.toLowerCase();
        for (String kw : keywords) {
            int count = (lowerText.length() - lowerText.replace(kw.toLowerCase(), "").length()) / kw.length();
            if (count > 10) { // arbitrary threshold for stuffing
                return true;
            }
        }
        return false;
    }

    private String determineStatus(double score) {
        if (score >= 85) return "Excellent Match";
        if (score >= 70) return "Good Match";
        if (score >= 50) return "Average Match";
        return "Needs Improvement";
    }

    private List<String> findMissingSkills(List<String> resumeSkills, List<String> jobSkills) {
        List<String> missing = new ArrayList<>();
        for (String js : jobSkills) {
            boolean found = resumeSkills.stream().anyMatch(rs -> rs.equalsIgnoreCase(js));
            if (!found) {
                missing.add(js);
            }
        }
        return missing;
    }
    
    // DTOs for Service
    public static class ResumeData {
        private String text;
        private List<String> skills;
        private int yearsOfExperience;
        private boolean hasRequiredDegree;
        private List<String> sections;
        private int spellingErrors;
        
        public ResumeData(String text, List<String> skills, int yearsOfExperience, boolean hasDegree, List<String> sections, int errors) {
            this.text = text; this.skills = skills; this.yearsOfExperience = yearsOfExperience; 
            this.hasRequiredDegree = hasDegree; this.sections = sections; this.spellingErrors = errors;
        }
        
        public String getText() { return text; }
        public List<String> getSkills() { return skills; }
        public int getYearsOfExperience() { return yearsOfExperience; }
        public boolean hasRequiredEducation(String degree) { return hasRequiredDegree; }
        public List<String> getSections() { return sections; }
        public int getSpellingErrors() { return spellingErrors; }
    }

    public static class JobDescriptionData {
        private List<String> requiredSkills;
        private List<String> keywords;
        private int requiredYearsOfExperience;
        private String requiredDegree;

        public JobDescriptionData(List<String> skills, List<String> keywords, int yoe, String degree) {
            this.requiredSkills = skills; this.keywords = keywords; this.requiredYearsOfExperience = yoe; this.requiredDegree = degree;
        }

        public List<String> getRequiredSkills() { return requiredSkills; }
        public List<String> getKeywords() { return keywords; }
        public int getRequiredYearsOfExperience() { return requiredYearsOfExperience; }
        public String getRequiredDegree() { return requiredDegree; }
    }

    public static class AtsScoreResult {
        public int finalScore;
        public String status;
        public int skillsMatchScore;
        public int keywordMatchScore;
        public int grammarScore;
        public int structureScore;
        public List<String> missingSkills;
        public boolean keywordStuffingDetected;

        public AtsScoreResult(int finalScore, String status, int skillsMatch, int keywordMatch, int grammarScore, int structureScore, List<String> missingSkills, boolean stuffing) {
            this.finalScore = finalScore; this.status = status; this.skillsMatchScore = skillsMatch;
            this.keywordMatchScore = keywordMatch; this.grammarScore = grammarScore; this.structureScore = structureScore;
            this.missingSkills = missingSkills; this.keywordStuffingDetected = stuffing;
        }
    }
}
