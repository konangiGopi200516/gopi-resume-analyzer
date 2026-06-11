import { CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const checks = [
  'ATS Compatibility',
  'Missing Keywords',
  'Formatting Issues',
  'Contact Information',
  'Readability Score',
  'Experience Relevance'
];

export const AtsShowcase = () => {
  return (
    <div id="ats-checker" className="py-24 bg-slate-900 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-full h-full opacity-20 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-emerald-500 via-transparent to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        <div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6 leading-tight">
            Beat Applicant Tracking Systems Before Recruiters See Your Resume
          </h2>
          <p className="text-lg text-slate-300 mb-8 leading-relaxed">
            Over 75% of resumes get rejected before a human ever reads them. ResumeAI scans your document exactly like enterprise ATS software does to ensure you make it to the recruiter's desk.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            {checks.map((check, index) => (
              <div key={index} className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                <span className="font-medium text-slate-200">{check}</span>
              </div>
            ))}
          </div>

          <Link 
            to="/resume-analyzer" 
            className="inline-flex items-center justify-center bg-emerald-500 hover:bg-emerald-400 text-slate-900 px-8 py-4 rounded-xl font-bold transition-all shadow-lg"
          >
            Check My Resume Score
          </Link>
        </div>

        <div className="relative">
          <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop" 
              alt="ATS Scanner Dashboard" 
              className="rounded-xl w-full object-cover h-[400px] opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
