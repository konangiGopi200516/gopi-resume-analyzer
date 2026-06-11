import { UploadCloud, PenTool, Star, Users, FileText, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const Hero = () => {
  return (
    <div className="relative pt-32 pb-20 lg:pt-40 lg:pb-24 overflow-hidden bg-white">
      {/* Soft Gradient Mesh Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-50 rounded-full mix-blend-multiply filter blur-[100px] opacity-70"></div>
        <div className="absolute top-40 left-10 w-[500px] h-[500px] bg-blue-50 rounded-full mix-blend-multiply filter blur-[100px] opacity-70"></div>
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1] mb-6">
            Get More Interviews With an <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
              ATS-Optimized Resume
            </span>
          </h1>
          
          <p className="text-xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            Instantly discover ATS issues, rewrite weak content, optimize keywords, and increase your chances of getting shortlisted. Trusted by job seekers worldwide.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
  <Link
    to="/resume-analyzer"
    className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-emerald-500/30 w-full sm:w-auto text-lg"
  >
    <UploadCloud className="w-5 h-5" />
    <span>Analyze My Resume Free</span>
  </Link>
  <Link
    to="/templates"
    className="flex items-center justify-center gap-2 bg-white border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 px-8 py-4 rounded-xl font-bold transition-all w-full sm:w-auto text-lg"
  >
    <PenTool className="w-5 h-5" />
    <span>Build My Resume</span>
  </Link>
</div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto border-t border-slate-100 pt-10">
            <div className="flex flex-col items-center gap-2">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
              </div>
              <span className="text-sm font-semibold text-slate-700">4.9/5 Rating</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Users className="w-6 h-6 text-emerald-500" />
              <span className="text-sm font-semibold text-slate-700">50,000+ Job Seekers</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <FileText className="w-6 h-6 text-emerald-500" />
              <span className="text-sm font-semibold text-slate-700">1M+ Resumes Analyzed</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <CheckCircle className="w-6 h-6 text-emerald-500" />
              <span className="text-sm font-semibold text-slate-700 text-center">Workday, Greenhouse & Lever Compatible</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
