import { Link } from 'react-router-dom';

const items = [
  'Missing Keywords',
  'Skill Gaps',
  'ATS Match Score',
  'Improvement Recommendations'
];

export const JobMatcher = () => {
  return (
    <div className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        <div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
            Match Your Resume to Any Job Description
          </h2>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            Paste a job posting and our intelligent matcher will instantly discover exactly what you need to change to become the perfect candidate.
          </p>
          
          <ul className="space-y-4 mb-10">
            {items.map((item, index) => (
              <li key={index} className="flex items-center gap-3 text-slate-700 font-medium">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                {item}
              </li>
            ))}
          </ul>

          <Link 
            to="/register" 
            className="inline-flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-emerald-500/30"
          >
            Match My Resume
          </Link>
        </div>

        <div className="relative flex justify-center">
          {/* Match Score Widget Mockup */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-2xl relative w-full max-w-sm">
            <div className="text-center mb-6">
              <h3 className="text-slate-500 font-bold uppercase tracking-wider text-sm mb-2">Job Match Score</h3>
              <div className="relative inline-flex items-center justify-center">
                <svg className="w-40 h-40 transform -rotate-90">
                  <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-100" />
                  <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray="440" strokeDashoffset="35" className="text-emerald-500" />
                </svg>
                <div className="absolute flex flex-col items-center justify-center">
                  <span className="text-5xl font-extrabold text-slate-900">92<span className="text-3xl">%</span></span>
                </div>
              </div>
            </div>
            
            <div className="space-y-3 border-t border-slate-100 pt-6">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">Keywords Match</span>
                <span className="font-bold text-emerald-600">Excellent</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">Experience Level</span>
                <span className="font-bold text-emerald-600">Perfect Match</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">Missing Skills</span>
                <span className="font-bold text-amber-500">2 Identified</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
