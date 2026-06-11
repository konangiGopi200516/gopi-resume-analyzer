export interface ScoreBreakdown {
  total: number;
  sections: {
    name: string;
    score: number;
    maxScore: number;
    deductions: string[];
  }[];
}

export function scoreResume(resumeText: string): ScoreBreakdown {
  const text = resumeText.toLowerCase();
  const lines = resumeText.split("\n").map(l => l.trim()).filter(Boolean);
  const sections: ScoreBreakdown["sections"] = [];
  let total = 100;

  // ── 1. CONTACT INFO (max deduction: -20) ──────────────────
  const contactDeductions: string[] = [];
  if (!/[\w.]+@[\w.]+\.\w+/.test(resumeText)) {
    contactDeductions.push("Missing email (-10)"); total -= 10;
  }
  if (!/(\+?\d[\d\s\-().]{7,})/.test(resumeText)) {
    contactDeductions.push("Missing phone number (-5)"); total -= 5;
  }
  if (!/linkedin\.com/.test(text)) {
    contactDeductions.push("Missing LinkedIn URL (-5)"); total -= 5;
  }
  sections.push({ name: "Contact Info", score: 20 - contactDeductions.length * 5, maxScore: 20, deductions: contactDeductions });

  // ── 2. STRUCTURE (max deduction: -15) ─────────────────────
  const structureDeductions: string[] = [];
  const requiredSections = ["experience", "education", "skills"];
  requiredSections.forEach(sec => {
    if (!text.includes(sec)) {
      structureDeductions.push(`Missing "${sec}" section (-5)`); total -= 5;
    }
  });
  sections.push({ name: "Structure", score: 15 - structureDeductions.length * 5, maxScore: 15, deductions: structureDeductions });

  // ── 3. MEASURABLE ACHIEVEMENTS (max deduction: -20) ───────
  const achieveDeductions: string[] = [];
  const metricPattern = /(\d+%|\$[\d,]+|\d+x|\d+ (users|clients|projects|team|employees|revenue|sales|months|years))/gi;
  const metrics = resumeText.match(metricPattern) || [];
  if (metrics.length === 0) {
    achieveDeductions.push("No measurable metrics (e.g. 40%, $1M, 3x) (-15)"); total -= 15;
  } else if (metrics.length < 3) {
    achieveDeductions.push("Too few metrics, add more quantified achievements (-7)"); total -= 7;
  }
  sections.push({ name: "Achievements", score: 20 - achieveDeductions.reduce((a, b) => a + (b.includes('15') ? 15 : 7), 0), maxScore: 20, deductions: achieveDeductions });

  // ── 4. ACTION VERBS (max deduction: -10) ──────────────────
  const actionVerbs = ["led", "built", "designed", "developed", "managed", "increased", "reduced", "launched", "delivered", "optimized", "created", "implemented", "achieved", "spearheaded", "collaborated"];
  const verbDeductions: string[] = [];
  const foundVerbs = actionVerbs.filter(v => text.includes(v));
  if (foundVerbs.length < 3) {
    verbDeductions.push(`Only ${foundVerbs.length} strong action verbs found, need at least 3 (-10)`); total -= 10;
  } else if (foundVerbs.length < 6) {
    verbDeductions.push("Add more action verbs to bullet points (-5)"); total -= 5;
  }
  sections.push({ name: "Action Verbs", score: 10 - verbDeductions.reduce((a, b) => a + (b.includes('10') ? 10 : 5), 0), maxScore: 10, deductions: verbDeductions });

  // ── 5. SKILLS SECTION (max deduction: -15) ────────────────
  const skillsDeductions: string[] = [];
  const techKeywords = ["python", "javascript", "react", "sql", "java", "aws", "docker", "typescript", "node", "git", "excel", "figma", "machine learning", "api"];
  const foundSkills = techKeywords.filter(k => text.includes(k));
  if (foundSkills.length === 0) {
    skillsDeductions.push("No recognizable technical skills found (-15)"); total -= 15;
  } else if (foundSkills.length < 4) {
    skillsDeductions.push("Too few skills listed, expand your skills section (-7)"); total -= 7;
  }
  sections.push({ name: "Skills", score: 15 - skillsDeductions.reduce((a, b) => a + (b.includes('15') ? 15 : 7), 0), maxScore: 15, deductions: skillsDeductions });

  // ── 6. LENGTH / COMPLETENESS (max deduction: -10) ─────────
  const lengthDeductions: string[] = [];
  const wordCount = resumeText.split(/\s+/).length;
  if (wordCount < 200) {
    lengthDeductions.push(`Resume too short (${wordCount} words, need 300+) (-10)`); total -= 10;
  } else if (wordCount < 300) {
    lengthDeductions.push(`Resume a bit thin (${wordCount} words) (-5)`); total -= 5;
  }
  sections.push({ name: "Completeness", score: 10 - lengthDeductions.reduce((a, b) => a + (b.includes('10') ? 10 : 5), 0), maxScore: 10, deductions: lengthDeductions });

  // ── 7. REPETITION (max deduction: -10) ────────────────────
  const repetitionDeductions: string[] = [];
  const wordFreq: Record<string, number> = {};
  resumeText.split(/\s+/).forEach(w => {
    const clean = w.toLowerCase().replace(/[^a-z]/g, "");
    if (clean.length > 4) wordFreq[clean] = (wordFreq[clean] || 0) + 1;
  });
  const overused = Object.entries(wordFreq).filter(([, count]) => count > 5).map(([word]) => word);
  if (overused.length > 3) {
    repetitionDeductions.push(`Overused words: ${overused.slice(0, 3).join(", ")} (-10)`); total -= 10;
  }
  sections.push({ name: "Repetition", score: 10 - repetitionDeductions.length * 10, maxScore: 10, deductions: repetitionDeductions });

  return {
    total: Math.max(0, Math.min(100, total)),
    sections,
  };
}
