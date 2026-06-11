import { ShieldCheck, PenTool, Target, BarChart2, Briefcase, Zap } from 'lucide-react';

const features = [
  {
    title: 'ATS Compatibility Analysis',
    description: 'Ensure your resume passes applicant tracking systems before a human ever sees it.',
    icon: ShieldCheck,
  },
  {
    title: 'AI-Powered Resume Writing',
    description: 'Generate professional, achievement-focused content instantly without writer\'s block.',
    icon: PenTool,
  },
  {
    title: 'Keyword Optimization',
    description: 'Match your resume exactly with job descriptions to rank higher in recruiter searches.',
    icon: Target,
  },
  {
    title: 'Resume Scoring',
    description: 'Receive a detailed score with actionable insights on formatting, impact, and brevity.',
    icon: BarChart2,
  },
  {
    title: 'Industry-Specific Suggestions',
    description: 'Get personalized recommendations tailored to your specific profession and seniority level.',
    icon: Briefcase,
  },
  {
    title: 'Instant Feedback',
    description: 'Get improvement suggestions in seconds instead of waiting days for a manual review.',
    icon: Zap,
  },
];

export const WhyChooseUs = () => {
  return (
    <div className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
            Why Thousands of Candidates Choose ResumeAI
          </h2>
          <p className="text-lg text-slate-600">
            Instead of simply checking grammar, ResumeAI analyzes your resume exactly like a recruiter and modern ATS system would.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-6">
                <feature.icon className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
