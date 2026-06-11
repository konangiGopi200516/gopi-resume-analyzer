import { motion } from 'framer-motion';

export const AlternatingFeatures = () => {
  return (
    <div className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32">
        
        {/* Feature 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">
              Rewrite your resume with AI
            </h2>
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              Don't know how to phrase your achievements? Our AI instantly suggests powerful, action-driven bullet points tailored to your role and industry. Say goodbye to writer's block and hello to a resume that stands out.
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2 bg-white p-4 rounded-2xl shadow-xl border border-slate-100"
          >
            <img src="https://images.unsplash.com/photo-1542626991-cbc4e32524cc?q=80&w=2069&auto=format&fit=crop" alt="AI Rewriter" className="rounded-xl w-full object-cover h-[300px]" />
          </motion.div>
        </div>

        {/* Feature 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 lg:order-1 bg-white p-4 rounded-2xl shadow-xl border border-slate-100"
          >
            <img src="https://images.unsplash.com/photo-1627398240309-089a14cecb6a?q=80&w=1965&auto=format&fit=crop" alt="ATS Check" className="rounded-xl w-full object-cover h-[300px]" />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-2 lg:order-2"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">
              Get an ATS understand to check
            </h2>
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              Our system simulates exact algorithms used by top Applicant Tracking Systems like Workday, Taleo, and Greenhouse. Find out exactly why you might be getting auto-rejected and fix it instantly.
            </p>
          </motion.div>
        </div>

        {/* Feature 3 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">
              Use the best resume builder on the internet
            </h2>
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              Choose from dozens of professionally designed, ATS-friendly templates. Build a beautiful resume in minutes, totally free. Download as PDF and start applying immediately.
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2 bg-white p-4 rounded-2xl shadow-xl border border-slate-100"
          >
            <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop" alt="Resume Builder" className="rounded-xl w-full object-cover h-[300px]" />
          </motion.div>
        </div>

      </div>
    </div>
  );
};
