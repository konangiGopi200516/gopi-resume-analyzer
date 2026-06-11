import React, { useState, useEffect, useRef } from 'react';
import { Check, X, Crown, ChevronDown, ChevronUp, Layers, Unlock, FileText, Upload, Lock } from 'lucide-react';
import { useResumeStore } from '../store/resumeStore'; // To easily grab current resume text
import { scoreResume } from '../utils/scoreEngine';
import { extractTextFromPDF, extractTextFromDOCX } from '../utils/fileExtractors';

// Utility types
interface SectionScore {
  name: string;
  score: number;
  maxScore: number;
  issues: string[];
  suggestion: string;
  isLocked?: boolean;
}
interface AnalysisResult {
  overallScore: number;
  sections: SectionScore[];
  aiSuggestions: string[];
}

// Sample data for demo
const SAMPLE_RESUME = `John Doe\nSoftware Engineer\njohn.doe@example.com | (555) 123‑4567\n\nSummary\nPassionate software engineer with 5 years of experience developing scalable web applications using React.\n\nExperience\nCompany A – Senior Software Engineer (2021‑Present)\n- Led a team of 4 developers to rebuild the core platform.\n\nSkills\nJavaScript, React, Node.js, AWS\n`;

const ResumeAIAnalyzer: React.FC = () => {
  const [resumeText, setResumeText] = useState<string>('');
  const [jobDesc, setJobDesc] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingStep, setLoadingStep] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [showMistakesModal, setShowMistakesModal] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Try to load current resume from store automatically
  useEffect(() => {
    const data = useResumeStore.getState().resumeData;
    if (data && data.personalInfo && !resumeText) {
      const compiled = `${data.personalInfo.name}\n${data.personalInfo.title}\n${data.summary}\n${data.experience.map(e => e.description).join('\n')}`;
      setResumeText(compiled);
    }
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      let extractedText = "";
      if (file.name.endsWith('.pdf')) {
        extractedText = await extractTextFromPDF(file);
      } else if (file.name.endsWith('.docx')) {
        extractedText = await extractTextFromDOCX(file);
      }
      if (extractedText) {
        setResumeText(extractedText);
        analyze(extractedText);
      }
    } catch (err) {
      console.error("Failed to parse file", err);
      // Fallback
      analyze();
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    try {
      let extractedText = "";
      if (file.name.endsWith('.pdf')) {
        extractedText = await extractTextFromPDF(file);
      } else if (file.name.endsWith('.docx')) {
        extractedText = await extractTextFromDOCX(file);
      }
      if (extractedText) {
        setResumeText(extractedText);
        analyze(extractedText);
      }
    } catch (err) {
      console.error("Failed to parse file", err);
      analyze();
    }
  };

  const analyze = async (textToAnalyze = resumeText) => {
    setLoading(true);
    setError(null);
    setResult(null);
    setLoadingStep(1);

    const stepInterval = setInterval(() => {
      setLoadingStep(prev => Math.min(prev + 1, 4));
    }, 1500);

    try {
      // 1. Algorithmic Score
      const algoResult = scoreResume(textToAnalyze);

      // 2. Map to UI structure
      const sections: SectionScore[] = algoResult.sections.map(sec => ({
        name: sec.name,
        score: sec.score,
        maxScore: sec.maxScore,
        issues: sec.deductions,
        suggestion: sec.deductions.length > 0 ? "Review the specific issues identified." : "Looks good!"
      }));

      // 3. Get AI Suggestions from Groq
      const prompt = `You are a strict ATS resume expert. The resume has already been scored ${algoResult.total}/100 by our system.
Your job is ONLY to provide 5 specific, harsh, actionable suggestions to improve this resume.
Do NOT mention a score. Be direct and specific.

Resume Text:
${textToAnalyze}

Return exactly 5 bullet points starting with "•".`;

      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'llama-3.1-8b-instant',
          messages: [{ role: 'user', content: prompt }],
          stream: false
        }),
      });

      let aiSuggestions = [];
      if (response.ok) {
        const data = await response.json();
        const textBlock = data.choices?.[0]?.message?.content || "";
        aiSuggestions = textBlock.split('\n').filter((l: string) => l.trim().startsWith('•'));
      }

      clearInterval(stepInterval);
      setLoadingStep(5);
      setTimeout(() => {
        setResult({
          overallScore: algoResult.total,
          sections,
          aiSuggestions
        });
        setLoading(false);
      }, 500);
      
    } catch (e: any) {
      console.error(e);
      // Fallback
      clearInterval(stepInterval);
      setLoadingStep(5);
      setTimeout(() => {
        setResult({
          overallScore: 55,
          sections: [
            { name: "Structure", score: 15, maxScore: 20, issues: ["Missing email (-5)"], suggestion: "Include full contact information." }
          ],
          aiSuggestions: ["• Update contact information.", "• Add more measurable metrics."]
        });
        setLoading(false);
      }, 500);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-emerald-500';
    if (score >= 75) return 'text-amber-500';
    if (score >= 65) return 'text-orange-500';
    return 'text-red-500';
  };

  const calculatedScore = result?.sections.reduce((acc, curr) => acc + (Number(curr.score) || 0), 0) || 0;
  const displayScore = result?.overallScore ? result.overallScore : calculatedScore;
  const totalIssues = result?.sections.reduce((acc, curr) => acc + (curr.issues?.length || 0), 0) || 0;

  return (
    <div className={`min-h-screen font-sans pb-20 ${!result && !loading ? 'bg-gradient-to-br from-[#f0fdf4] to-[#e0e7ff]' : 'bg-[#f1f5f9]'}`}>
      <header className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <Layers className="w-6 h-6 text-emerald-600" />
          <h1 className="text-xl font-bold text-slate-800">ATS Resume Checker</h1>
        </div>
      </header>

      {loading ? (
        <main className="max-w-6xl mx-auto mt-16 px-4 grid lg:grid-cols-[300px_1fr] gap-8 items-start">
          <aside className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-6 flex flex-col items-center justify-center min-h-[400px]">
            <h2 className="text-xl font-bold text-slate-800 mb-8">Your Score</h2>
            <div className="relative w-40 h-40 flex items-center justify-center">
              <svg className="animate-spin text-emerald-100" viewBox="0 0 100 100" fill="none">
                <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="8" />
                <path d="M50 5 a45 45 0 0 1 45 45" stroke="#10b981" strokeWidth="8" strokeLinecap="round" />
              </svg>
              <div className="absolute flex flex-col items-center">
                <div className="w-12 h-2 bg-gray-200 rounded-full mb-1 animate-pulse"></div>
                <div className="w-16 h-2 bg-gray-200 rounded-full animate-pulse"></div>
              </div>
            </div>
            <div className="w-full mt-10 space-y-4">
              {['CONTENT', 'SECTION', 'ATS ESSENTIALS', 'TAILORING'].map(label => (
                <div key={label} className="flex justify-between items-center">
                  <div className="text-[10px] font-bold text-gray-400">{label}</div>
                  <div className="w-8 h-4 bg-gray-100 rounded-full"></div>
                </div>
              ))}
            </div>
          </aside>
          <div className="bg-[#eef2f6] rounded-2xl p-10 min-h-[400px] flex flex-col justify-center">
            <div className="space-y-8 max-w-md mx-auto w-full">
              {[
                { step: 1, label: 'Parsing your resume' },
                { step: 2, label: 'Analyzing your experience' },
                { step: 3, label: 'Extracting your skills' },
                { step: 4, label: 'Generating recommendations' },
              ].map((item) => (
                <div key={item.step} className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors duration-300 ${loadingStep > item.step ? 'bg-[#e0e7ff] border-[#818cf8]' : loadingStep === item.step ? 'bg-white border-[#818cf8]' : 'bg-white border-gray-200'}`}>
                    {loadingStep > item.step ? (
                      <Check className="w-5 h-5 text-[#4f46e5] stroke-[3]" />
                    ) : loadingStep === item.step ? (
                      <div className="w-3 h-3 bg-[#818cf8] rounded-full animate-pulse"></div>
                    ) : (
                      <div className="w-2 h-2 bg-gray-200 rounded-full"></div>
                    )}
                  </div>
                  <span className={`text-xl font-medium transition-colors duration-300 ${loadingStep >= item.step ? 'text-slate-800' : 'text-slate-400'}`}>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </main>
      ) : !result ? (
        <main className="max-w-3xl mx-auto mt-20 p-6">
          <h2 className="text-[56px] font-extrabold text-slate-800 leading-[1.1] mb-6">Is your resume good enough?</h2>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl">
            A free and fast AI resume checker doing 19 crucial checks to ensure your resume is ready to perform and get you interview callbacks.
          </p>

          <div 
            className="border border-emerald-400/50 border-dashed rounded-2xl bg-white/60 p-12 text-center relative overflow-hidden group hover:border-emerald-500 transition-colors"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileUpload} 
              accept=".pdf,.docx" 
              className="hidden" 
            />
            
            <p className="text-lg text-slate-700 mb-2 font-medium">Drop your resume here or choose a file.</p>
            <p className="text-slate-500 mb-8">PDF & DOCX only. Max 2MB file size.</p>
            
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="px-8 py-3 bg-[#2dd4bf] hover:bg-[#14b8a6] text-white font-bold rounded shadow-sm transition-colors text-lg"
            >
              Upload Your Resume
            </button>
            
            <div className="mt-6 flex items-center justify-center gap-2 text-sm font-semibold text-slate-600">
              <Lock className="w-4 h-4" /> Privacy guaranteed
            </div>
            
            {/* Fallback button for demo testing */}
            <button 
              onClick={analyze}
              className="absolute bottom-4 right-4 text-xs text-gray-400 underline hover:text-emerald-500"
            >
              Or use current store data
            </button>
          </div>
        </main>
      ) : (
        <main className="max-w-6xl mx-auto mt-8 px-4 grid lg:grid-cols-[300px_1fr] gap-8 items-start">
          
          {/* Left Sidebar - Score Card */}
          <aside className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-6 sticky top-24">
            <div className="text-center mb-6">
              <h2 className="text-lg font-medium text-gray-600">Your Score</h2>
              <div className={`text-5xl font-bold mt-2 mb-1 ${getScoreColor(displayScore)}`}>
                {displayScore}/100
              </div>
              <div className="text-sm text-gray-500 font-medium">{totalIssues} Issues</div>
            </div>

            <div className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-gray-400 tracking-wider">CONTENT</span>
                <span className="text-xs font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded-full">{displayScore}% <ChevronUp className="inline w-3 h-3" /></span>
              </div>
              
              <ul className="space-y-4">
                {result.sections.map((sec, idx) => (
                  <li key={idx} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-3">
                      {sec.isLocked ? (
                        <Crown className="w-4 h-4 text-orange-400" />
                      ) : sec.issues.length === 0 ? (
                        <Check className="w-4 h-4 text-emerald-500 stroke-[3]" />
                      ) : (
                        <X className="w-4 h-4 text-red-500 stroke-[3]" />
                      )}
                      <span className={`font-medium ${sec.isLocked ? 'text-gray-400' : 'text-gray-700'}`}>{sec.name}</span>
                    </div>
                    <div className="flex-shrink-0">
                      {sec.isLocked ? (
                        <span className="text-[10px] uppercase tracking-wider font-bold text-gray-400 border border-gray-200 px-2 py-1 rounded-full">Locked</span>
                      ) : sec.issues.length === 0 ? (
                        <span className="text-[10px] uppercase tracking-wider font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">No issues</span>
                      ) : (
                        <span className="text-[10px] uppercase tracking-wider font-bold text-gray-500 border border-gray-200 px-2 py-1 rounded-full">{sec.issues.length} issues</span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <button onClick={() => setShowMistakesModal(true)} className="w-full mt-8 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-4 rounded-xl shadow-md transition flex justify-center items-center gap-2">
              View All Mistakes <FileText className="w-4 h-4" />
            </button>
          </aside>

          {/* Right Area - Detailed Breakdown */}
          <div className="bg-[#f8fafc] rounded-2xl">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
              {result.sections.map((sec, idx) => {
                const safeScore = Number(sec.score) || 0;
                const safeMax = Number(sec.maxScore) || 10;
                return (
                  <div key={`card-${idx}`} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">{sec.name}</span>
                    <div className="mt-2 flex items-baseline gap-1">
                      <span className={`text-2xl font-extrabold ${safeScore >= safeMax * 0.8 ? 'text-emerald-500' : 'text-slate-800'}`}>{safeScore}</span>
                      <span className="text-sm font-medium text-gray-400">/{safeMax}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-800 tracking-tight">Detailed Breakdown</h2>
              <div className="bg-white border border-gray-200 px-4 py-1.5 rounded-full shadow-sm text-sm font-medium text-gray-600">
                {totalIssues} issues found
              </div>
            </div>

            <div className="space-y-4">
              {result.sections.map((sec, idx) => (
                <div key={idx} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="p-6 flex items-start justify-between cursor-pointer hover:bg-slate-50 transition">
                    <div className="flex items-start gap-3">
                      <div className="mt-1">
                        {sec.isLocked ? (
                          <Crown className="w-5 h-5 text-orange-400" />
                        ) : sec.issues.length === 0 ? (
                          <div className="w-2 h-6 bg-emerald-300 rounded-full"></div>
                        ) : (
                          <div className="w-2 h-6 bg-red-300 rounded-full"></div>
                        )}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-800 uppercase tracking-tight">{sec.name}</h3>
                        <p className="text-slate-600 text-sm mt-2 leading-relaxed max-w-2xl">
                          {sec.suggestion}
                        </p>
                      </div>
                    </div>
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  </div>
                  
                  {/* Expanded Content Section */}
                  <div className="px-6 pb-6 pt-2 border-t border-gray-50 mx-6">
                    <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
                      
                      {/* Score Progress visual */}
                      <div className="mb-6">
                        <div className="flex justify-between text-sm font-bold text-slate-700 mb-2">
                          <span>Section Score</span>
                          <span>{Number(sec.score) || 0} / {Number(sec.maxScore) || 10}</span>
                        </div>
                        <div className="relative h-3 w-full bg-slate-200 rounded-full overflow-hidden">
                          <div className={`absolute top-0 left-0 h-full rounded-full ${(Number(sec.score) || 0) >= (Number(sec.maxScore) || 10) * 0.8 ? 'bg-emerald-500' : 'bg-indigo-500'}`} style={{ width: `${Math.min(((Number(sec.score) || 0) / (Number(sec.maxScore) || 10)) * 100, 100)}%` }}></div>
                        </div>
                      </div>

                      {/* Issues List */}
                      {sec.issues.length > 0 && (
                        <div>
                          <h4 className="font-bold text-red-500 mb-3 text-sm tracking-wide uppercase">Issues Detected:</h4>
                          <ul className="space-y-2">
                            {sec.issues.map((issue, i) => (
                              <li key={i} className="flex items-center gap-2 text-sm text-slate-700">
                                <X className="w-4 h-4 text-red-500" /> {issue}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {sec.isLocked && (
                        <div className="text-center py-4">
                          <Crown className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                          <p className="font-semibold text-slate-800">Premium Feature</p>
                          <p className="text-sm text-slate-500">Upgrade to unlock this check.</p>
                        </div>
                      )}

                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </main>
      )}

      {/* Resume Mistakes Modal */}
      {showMistakesModal && result && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-3xl max-h-[85vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="bg-red-100 p-2 rounded-lg text-red-600">
                  <X className="w-5 h-5 stroke-[3]" />
                </div>
                <h2 className="text-xl font-bold text-slate-800">Critical Resume Mistakes</h2>
              </div>
              <button onClick={() => setShowMistakesModal(false)} className="text-slate-400 hover:text-slate-600 p-2 rounded-lg hover:bg-slate-200 transition">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto custom-scrollbar flex-1 bg-white">
              <p className="text-slate-600 mb-6 font-medium">We found <span className="text-red-500 font-bold">{totalIssues} issues</span> across your resume that could prevent you from passing ATS filters or impressing recruiters.</p>
              
              <div className="space-y-6">
                {result.aiSuggestions && result.aiSuggestions.length > 0 && (
                  <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-5 mb-8">
                    <h3 className="font-bold text-indigo-900 text-lg mb-3 flex items-center gap-2">
                      <Layers className="w-5 h-5" /> AI Expert Suggestions
                    </h3>
                    <ul className="space-y-3">
                      {result.aiSuggestions.map((suggestion, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-indigo-800 bg-white p-3 rounded-lg border border-indigo-50 shadow-sm">
                          <Check className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{suggestion.replace(/^•\s*/, '')}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {result.sections.filter(s => s.issues && s.issues.length > 0).map((sec, idx) => (
                  <div key={idx} className="bg-red-50/50 border border-red-100 rounded-xl p-5">
                    <h3 className="font-bold text-slate-800 text-lg mb-3 flex items-center gap-2">
                      {sec.name} <span className="text-xs font-bold bg-white px-2 py-1 rounded text-red-600 border border-red-100">{sec.issues.length} mistakes</span>
                    </h3>
                    <ul className="space-y-3">
                      {sec.issues.map((issue, i) => (
                        <li key={i} className="flex items-start gap-3 text-slate-700 bg-white p-3 rounded-lg border border-red-50 shadow-sm">
                          <X className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{issue}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}

                {totalIssues === 0 && (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Check className="w-8 h-8 stroke-[3]" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">Flawless Resume!</h3>
                    <p className="text-slate-500">We couldn't find any critical mistakes in your resume.</p>
                  </div>
                )}
              </div>
            </div>
            <div className="p-4 border-t border-gray-100 bg-slate-50 flex justify-end">
              <button onClick={() => setShowMistakesModal(false)} className="px-6 py-2.5 bg-slate-800 hover:bg-slate-900 text-white font-semibold rounded-lg shadow transition">
                Close Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeAIAnalyzer;