import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const features = [
  'AI Bullet Point Generator',
  'Achievement Enhancement',
  'Professional Tone Suggestions',
  'Action Verb Optimization'
];

export const AiWriter = () => {
  return (
    <div id="ai-writer" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        <div className="order-2 lg:order-1">
          <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200 shadow-sm relative">
            <div className="absolute -top-4 -right-4 bg-amber-400 text-amber-900 text-xs font-bold px-4 py-2 rounded-full transform rotate-12 shadow-sm">
              AI Powered
            </div>
            
            <div className="mb-8">
              <span className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2 block">Before</span>
              <div className="bg-white p-4 rounded-xl border border-red-100 border-l-4 border-l-red-400 text-slate-600 line-through decoration-red-300">
                "Responsible for managing sales team."
              </div>
            </div>

            <div className="flex justify-center mb-8">
              <div className="bg-emerald-100 p-2 rounded-full">
                <ArrowRight className="w-6 h-6 text-emerald-600 transform rotate-90 lg:rotate-0" />
              </div>
            </div>

            <div>
              <span className="text-sm font-bold text-emerald-600 uppercase tracking-wider mb-2 block flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> After
              </span>
              <div className="bg-emerald-50 p-5 rounded-xl border border-emerald-100 border-l-4 border-l-emerald-500 text-emerald-900 font-medium">
                "Increased regional sales by 34% through strategic team leadership and process optimization."
              </div>
            </div>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
            Turn Weak Bullet Points Into Powerful Achievements
          </h2>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            Stop describing your responsibilities and start highlighting your impact. Our AI analyzes your job role and rewrites your bullet points using powerful action verbs and quantified results.
          </p>
          
          <ul className="space-y-4 mb-10">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center gap-3 text-slate-700 font-medium">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                {feature}
              </li>
            ))}
          </ul>

          <Link 
            to="/register" 
            className="inline-flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-emerald-500/30"
          >
            Rewrite My Resume
          </Link>
        </div>

      </div>
    </div>
  );
};
