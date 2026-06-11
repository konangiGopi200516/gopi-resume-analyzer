import { Upload, Cpu, Rocket } from 'lucide-react';

export const HowItWorks = () => {
  return (
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
            Optimize Your Resume in 3 Simple Steps
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -translate-y-1/2 z-0"></div>

          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center text-white text-xl font-bold mb-6 shadow-xl shadow-emerald-500/30">
              <Upload className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Step 1: Upload Your Resume</h3>
            <p className="text-slate-600">Securely upload your existing resume in PDF, DOCX, or TXT format.</p>
          </div>

          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center text-white text-xl font-bold mb-6 shadow-xl shadow-emerald-500/30">
              <Cpu className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Step 2: AI Analysis</h3>
            <p className="text-slate-600">Our engine performs an ATS scan, keyword matching, and deep content analysis.</p>
          </div>

          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center text-white text-xl font-bold mb-6 shadow-xl shadow-emerald-500/30">
              <Rocket className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Step 3: Apply With Confidence</h3>
            <p className="text-slate-600">Download your newly optimized resume and start applying to your dream jobs.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
