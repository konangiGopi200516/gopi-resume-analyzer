import { Check, X } from 'lucide-react';

const comparisons = [
  { feature: 'Instant Feedback', us: true, them: false },
  { feature: 'ATS Analysis', us: true, them: false },
  { feature: 'Keyword Optimization', us: true, them: false },
  { feature: 'Resume Scoring', us: true, them: false },
  { feature: 'AI Rewriting', us: true, them: false },
  { feature: 'Available 24/7', us: true, them: false },
];

export const Comparison = () => {
  return (
    <div className="py-24 bg-slate-50 border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-6">
            Why ResumeAI Is Better Than Traditional Resume Reviews
          </h2>
        </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">
          <div className="grid grid-cols-3 bg-slate-900 text-white p-6 border-b border-slate-800">
            <div className="col-span-1 font-bold">Feature</div>
            <div className="col-span-1 text-center font-bold text-emerald-400">ResumeAI</div>
            <div className="col-span-1 text-center font-bold text-slate-400">Manual Review</div>
          </div>
          
          <div className="divide-y divide-slate-100">
            {comparisons.map((item, index) => (
              <div key={index} className="grid grid-cols-3 p-6 items-center hover:bg-slate-50 transition-colors">
                <div className="col-span-1 font-medium text-slate-700">{item.feature}</div>
                <div className="col-span-1 flex justify-center">
                  {item.us ? (
                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                      <Check className="w-5 h-5" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                      <X className="w-5 h-5" />
                    </div>
                  )}
                </div>
                <div className="col-span-1 flex justify-center">
                  {item.them ? (
                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                      <Check className="w-5 h-5" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                      <X className="w-5 h-5" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
