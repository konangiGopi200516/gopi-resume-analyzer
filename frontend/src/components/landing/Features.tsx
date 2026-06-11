import { CheckCircle2, Zap, Layout, AlignLeft, Briefcase, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    title: 'ATS Formatting',
    items: ['Parse rate check', 'Section detection', 'Font readability'],
    icon: Layout,
  },
  {
    title: 'Content Impact',
    items: ['Action verbs usage', 'Quantified results', 'Keyword density'],
    icon: Zap,
  },
  {
    title: 'Structure & Length',
    items: ['Optimal page length', 'Bullet point count', 'Contact information'],
    icon: AlignLeft,
  },
  {
    title: 'Experience Match',
    items: ['Seniority alignment', 'Industry keywords', 'Gap analysis'],
    icon: Briefcase,
  },
];

export const Features = () => {
  return (
    <div id="resume-checker" className="py-24 dark-section relative overflow-hidden">
      <div className="absolute top-0 right-0 w-full h-full opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-300 via-transparent to-transparent pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-6">
            Our AI-powered resume checker goes beyond typos and punctuation
          </h2>
          <p className="text-lg text-slate-400">
            Get a comprehensive, 360-degree review of your resume instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 text-slate-900 shadow-xl"
            >
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mb-5">
                <feature.icon className="h-5 w-5 text-emerald-600" />
              </div>
              <h3 className="text-lg font-bold mb-4">{feature.title}</h3>
              <ul className="space-y-3">
                {feature.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm font-medium text-slate-600">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
