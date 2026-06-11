import { Link } from 'react-router-dom';
import { UploadCloud, PenTool } from 'lucide-react';

export const CtaBanner = () => {
  return (
    <div className="bg-slate-900 py-24 relative overflow-hidden">
      <div className="absolute inset-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-900/40 via-slate-900 to-slate-900 pointer-events-none"></div>
      
      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
          Your Next Job Starts With a <br className="hidden md:block"/> Better Resume
        </h2>
        <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
          Stop guessing whether your resume is good enough. Get actionable insights, ATS optimization, and AI-powered improvements in minutes.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
          <Link 
            to="/resume-analyzer" 
            className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg w-full sm:w-auto text-lg"
          >
            <UploadCloud className="w-5 h-5" />
            <span>Analyze My Resume Free</span>
          </Link>
          <Link 
            to="/templates" 
            className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-4 rounded-xl font-bold transition-all w-full sm:w-auto text-lg backdrop-blur-sm"
          >
            <PenTool className="w-5 h-5" />
            <span>Build My Resume</span>
          </Link>
        </div>
        
        <div className="flex items-center justify-center gap-2 text-sm text-emerald-400 font-medium">
          <span>No Credit Card Required</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          <span>Free Resume Score</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          <span>Instant Results</span>
        </div>
      </div>
    </div>
  );
};
