package com.resumeanalyzer.backend.service;

import org.springframework.stereotype.Service;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class ResumeRewriterService {

    // Weak verbs to detect
    private static final List<String> WEAK_VERBS = Arrays.asList(
        "responsible for", "worked on", "helped", "made", "did", "assisted", "handled", "managed" // Note: "managed" can be okay, but often used weakly
    );

    // Strong action verbs to suggest
    private static final List<String> STRONG_VERBS = Arrays.asList(
        "Led", "Developed", "Implemented", "Engineered", "Designed", "Optimized", "Spearheaded", "Architected", "Executed"
    );

    // Basic rules for MVP enhancement
    private static final Map<String, String> ENHANCEMENT_RULES = new HashMap<>();
    static {
        ENHANCEMENT_RULES.put("responsible for", "Led efforts in");
        ENHANCEMENT_RULES.put("worked on", "Developed and maintained");
        ENHANCEMENT_RULES.put("helped", "Collaborated to");
        ENHANCEMENT_RULES.put("made", "Architected");
        ENHANCEMENT_RULES.put("did", "Executed");
        ENHANCEMENT_RULES.put("handled", "Managed end-to-end");
    }

    public BulletPointAnalysis analyzeAndEnhance(String bulletPoint) {
        String lowerBullet = bulletPoint.toLowerCase();
        
        // 1. Detect weak verbs
        List<String> foundWeakVerbs = new ArrayList<>();
        for (String weakVerb : WEAK_VERBS) {
            if (lowerBullet.contains(weakVerb)) {
                foundWeakVerbs.add(weakVerb);
            }
        }

        // 2. Action Verb Score
        int actionVerbScore = 100 - (foundWeakVerbs.size() * 20); // Penalty for each weak verb
        actionVerbScore = Math.max(0, Math.min(100, actionVerbScore));

        // 3. Achievement Score (Look for numbers, %, metrics)
        boolean hasNumbers = bulletPoint.matches(".*\\d+.*");
        boolean hasPercentage = bulletPoint.contains("%");
        boolean hasMetrics = hasNumbers || hasPercentage || lowerBullet.matches(".*(reduced|increased|improved|saved).*");
        
        int achievementScore = 40; // Base score
        if (hasNumbers) achievementScore += 30;
        if (hasPercentage) achievementScore += 20;
        if (hasMetrics) achievementScore += 10;
        achievementScore = Math.max(0, Math.min(100, achievementScore));

        // 4. Calculate Impact/Tone scores
        int professionalTone = (actionVerbScore + achievementScore) / 2;
        int atsFriendliness = hasMetrics ? 90 : 60;

        // 5. Rule-based Enhancement (MVP logic)
        String enhancedText = applyRuleBasedEnhancement(bulletPoint);

        return new BulletPointAnalysis(
            bulletPoint,
            enhancedText,
            actionVerbScore,
            achievementScore,
            professionalTone,
            atsFriendliness,
            foundWeakVerbs,
            STRONG_VERBS
        );
    }

    private String applyRuleBasedEnhancement(String bulletPoint) {
        String enhanced = bulletPoint;
        String lowerEnhanced = enhanced.toLowerCase();

        for (Map.Entry<String, String> rule : ENHANCEMENT_RULES.entrySet()) {
            if (lowerEnhanced.contains(rule.getKey())) {
                // simple case-insensitive replace for the start of the sentence usually
                enhanced = enhanced.replaceAll("(?i)" + rule.getKey(), rule.getValue());
                
                // If the user didn't include numbers, let's append a placeholder for them to fill in
                if (!bulletPoint.matches(".*\\d+.*")) {
                    enhanced += " resulting in a [X]% increase in efficiency.";
                }
                break; // Only apply one major transformation for simplicity
            }
        }
        
        // Capitalize first letter if needed
        if (enhanced.length() > 0) {
            enhanced = enhanced.substring(0, 1).toUpperCase() + enhanced.substring(1);
        }
        
        return enhanced;
    }

    public static class BulletPointAnalysis {
        public String originalText;
        public String enhancedText;
        public int actionVerbScore;
        public int achievementScore;
        public int professionalTone;
        public int atsFriendliness;
        public List<String> weakVerbsFound;
        public List<String> suggestedVerbs;

        public BulletPointAnalysis(String orig, String enhanced, int actionScore, int achieveScore, int tone, int ats, List<String> weak, List<String> strong) {
            this.originalText = orig;
            this.enhancedText = enhanced;
            this.actionVerbScore = actionScore;
            this.achievementScore = achieveScore;
            this.professionalTone = tone;
            this.atsFriendliness = ats;
            this.weakVerbsFound = weak;
            this.suggestedVerbs = strong;
        }
    }
}
