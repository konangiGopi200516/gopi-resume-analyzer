import { Link } from 'react-router-dom';
import { File } from 'lucide-react';

const features = [
  'ATS-Friendly Templates',
  'Multiple Design Styles',
  'Export to PDF',
  'One-Click Editing'
];

export const ResumeBuilderSection = () => {
  return (
    <div id="resume-builder" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        <div className="order-2 lg:order-1 relative">
          <div className="bg-slate-100 rounded-3xl p-4 border border-slate-200 shadow-xl transform -rotate-2 hover:rotate-0 transition-transform duration-500">
            <div className="bg-white rounded-2xl w-full h-[500px] overflow-hidden flex flex-col font-sans">
              {/* Toolbar */}
              <div className="flex items-center px-4 py-3 border-b border-slate-100 bg-slate-50/50">
                <File className="w-5 h-5 text-emerald-600 mr-2" />
                <span className="font-semibold text-slate-700 text-sm">Resume Builder Interface</span>
              </div>
              
              {/* Resume Content */}
              <div className="flex-1 overflow-hidden bg-slate-100 p-4">
                <div className="bg-white w-full h-full rounded shadow-sm flex overflow-hidden text-[8px] sm:text-[10px]">
                  
                  {/* Left Column */}
                  <div className="w-1/3 bg-slate-50 p-4 border-r border-slate-100">
                    <div className="flex justify-center mb-4">
                      <div className="w-16 h-16 rounded-full bg-slate-200 overflow-hidden border-2 border-white shadow-sm">
                        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop" alt="Profile" className="w-full h-full object-cover" />
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="font-bold text-emerald-700 tracking-widest mb-2 border-b border-emerald-100 pb-1 uppercase text-[9px]">Skills</h4>
                      <ul className="space-y-1 text-slate-600 list-disc pl-3">
                        <li>Java</li>
                        <li>Spring Boot</li>
                        <li>React.js</li>
                        <li>JavaScript</li>
                        <li>MySQL</li>
                        <li>MongoDB</li>
                        <li>HTML & CSS</li>
                        <li>Git & GitHub</li>
                      </ul>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-bold text-emerald-700 tracking-widest mb-2 border-b border-emerald-100 pb-1 uppercase text-[9px]">Education</h4>
                      <div className="text-slate-800 font-bold">B.Tech in Computer Science</div>
                      <div className="text-slate-500">ABC University</div>
                      <div className="text-slate-500">2019 - 2023</div>
                      <div className="text-slate-600 mt-1">CGPA: 8.7/10</div>
                    </div>

                    <div>
                      <h4 className="font-bold text-emerald-700 tracking-widest mb-2 border-b border-emerald-100 pb-1 uppercase text-[9px]">Certifications</h4>
                      <ul className="space-y-1 text-slate-600 list-disc pl-3">
                        <li>AWS Certified Developer</li>
                        <li>Oracle Java Certification</li>
                        <li>MongoDB Associate</li>
                      </ul>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="w-2/3 p-4">
                    <div className="mb-4">
                      <h1 className="text-lg font-black text-slate-900 leading-tight">Rahul Sharma</h1>
                      <div className="text-emerald-600 font-medium mb-2">Full Stack Developer</div>
                      
                      <div className="grid grid-cols-2 gap-1 text-slate-500 text-[8px]">
                        <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-slate-200"></div> rahul.sharma@email.com</div>
                        <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-slate-200"></div> +91 98765 43210</div>
                        <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-slate-200"></div> Bengaluru, India</div>
                        <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-slate-200"></div> linkedin.com/in/rahulsharma</div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-bold text-emerald-700 tracking-widest mb-1 border-b border-emerald-100 pb-1 uppercase text-[9px]">Professional Summary</h4>
                      <p className="text-slate-600 leading-relaxed">
                        Motivated Full Stack Developer with expertise in building scalable web applications using Java, Spring Boot, React, and modern technologies. Passionate about solving complex problems and delivering high-quality software solutions.
                      </p>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-bold text-emerald-700 tracking-widest mb-2 border-b border-emerald-100 pb-1 uppercase text-[9px]">Experience</h4>
                      <div className="mb-2">
                        <div className="flex justify-between items-baseline">
                          <div className="font-bold text-slate-800">Software Developer Intern</div>
                          <div className="text-emerald-600 text-[8px]">Jan 2023 - Present</div>
                        </div>
                        <div className="text-slate-500 mb-1">Tech Solutions Inc.</div>
                        <ul className="list-disc pl-3 text-slate-600 space-y-0.5">
                          <li>Developed and maintained RESTful APIs using Spring Boot.</li>
                          <li>Built responsive UI components using React.js and Tailwind CSS.</li>
                          <li>Improved application performance leading to 25% faster load times.</li>
                          <li>Collaborated with cross-functional teams in Agile environment.</li>
                        </ul>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-bold text-emerald-700 tracking-widest mb-2 border-b border-emerald-100 pb-1 uppercase text-[9px]">Projects</h4>
                      <div className="mb-2">
                        <div className="font-bold text-slate-800">E-Commerce Web Application</div>
                        <ul className="list-disc pl-3 text-slate-600 space-y-0.5 mt-1">
                          <li>Built a full-stack e-commerce platform using Spring Boot and React.</li>
                          <li>Integrated Razorpay for payments and JWT for authentication.</li>
                          <li>Achieved 99.9% uptime with optimized database queries.</li>
                        </ul>
                      </div>
                      <div>
                        <div className="font-bold text-slate-800">Task Management System</div>
                        <ul className="list-disc pl-3 text-slate-600 space-y-0.5 mt-1">
                          <li>Developed a task management tool with role-based authentication.</li>
                          <li>Implemented real-time updates using WebSockets.</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer Toolbar */}
              <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100 bg-white">
                <div className="flex gap-4 text-slate-500 font-medium text-xs">
                  <span className="flex items-center gap-1 hover:text-emerald-600 cursor-pointer"><div className="w-3 h-3 bg-slate-200 rounded-sm"></div> Templates</span>
                  <span className="flex items-center gap-1 hover:text-emerald-600 cursor-pointer"><div className="w-3 h-3 bg-slate-200 rounded-sm"></div> Design</span>
                  <span className="flex items-center gap-1 hover:text-emerald-600 cursor-pointer"><div className="w-3 h-3 bg-slate-200 rounded-sm"></div> Customize</span>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1.5 border border-emerald-600 text-emerald-600 rounded text-xs font-bold hover:bg-emerald-50">Save</button>
                  <button className="px-3 py-1.5 bg-emerald-600 text-white rounded text-xs font-bold hover:bg-emerald-700">Download PDF</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
            Create a Professional Resume in Minutes
          </h2>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            Choose from recruiter-approved templates designed specifically to pass ATS systems. Our intuitive builder makes formatting perfectly simple.
          </p>
          
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center gap-3 text-slate-700 font-medium bg-slate-50 p-3 rounded-lg border border-slate-100">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                {feature}
              </li>
            ))}
          </ul>

          <Link 
            to="/templates" 
            className="inline-flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-emerald-500/30"
          >
            Build Resume Now
          </Link>
        </div>

      </div>
    </div>
  );
};
