import { BarChart3, CheckCircle2, FileText, Layout, Type } from 'lucide-react';

export const ScoreDashboard = () => {
  return (
    <div className="py-24 bg-slate-900 text-white relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-full h-1/2 opacity-20 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-blue-500 via-transparent to-transparent pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 relative z-10">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6">
            See Exactly What Recruiters See
          </h2>
          <p className="text-lg text-slate-400">
            Stop guessing. Our premium analytics dashboard breaks down your resume into actionable data points, ensuring you never miss an opportunity due to a technicality.
          </p>
        </div>

        {/* Dashboard Mockup */}
        <div className="relative z-10 bg-slate-800 rounded-3xl p-8 md:p-12 border border-slate-700 shadow-2xl max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-700 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full border-4 border-emerald-500 flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-white">88</span>
              </div>
              <h3 className="font-bold text-slate-300">Overall Score</h3>
              <p className="text-sm text-emerald-400 mt-1">Excellent</p>
            </div>
            
            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-700">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Score Breakdown</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>ATS Compatibility</span>
                    <span className="text-emerald-400 font-bold">100%</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2">
                    <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Content Impact</span>
                    <span className="text-amber-400 font-bold">75%</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2">
                    <div className="bg-amber-400 h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Formatting</span>
                    <span className="text-emerald-400 font-bold">90%</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2">
                    <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-700">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Quick Fixes</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm text-slate-300">
                  <div className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-500 flex items-center justify-center shrink-0 mt-0.5">!</div>
                  Replace 3 passive verbs with action verbs.
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-300">
                  <div className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-500 flex items-center justify-center shrink-0 mt-0.5">!</div>
                  Quantify 2 more achievements in your latest role.
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-300">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center shrink-0 mt-0.5">✓</div>
                  Contact info correctly parsed.
                </li>
              </ul>
            </div>
          </div>

          <div className="flex justify-center mt-10">
            <button className="bg-white hover:bg-slate-100 text-slate-900 px-8 py-4 rounded-xl font-bold transition-colors">
              Explore Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
