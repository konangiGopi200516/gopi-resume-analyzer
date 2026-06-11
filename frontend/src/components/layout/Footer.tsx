import { FileText, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export const Footer = () => {
  const [showInfo, setShowInfo] = useState(false);
  const [infoTitle, setInfoTitle] = useState("");

  const modalContent: Record<string, React.ReactNode> = {
    'Career Advice': (
      <div className="space-y-3 text-slate-600 leading-relaxed text-sm max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
        <p><strong>Master Your Interview Skills</strong><br/>Practice common behavioral and technical interview questions. Use the STAR method (Situation, Task, Action, Result) to provide structured and impactful answers.</p>
        <p><strong>Build a Strong Professional Presence</strong><br/>Keep your LinkedIn profile updated with your latest skills, projects, certifications, and achievements. A strong online presence can increase your visibility to recruiters.</p>
        <p><strong>Expand Your Professional Network</strong><br/>Connect with alumni, mentors, industry professionals, and recruiters. Networking can help you discover opportunities that may not be publicly advertised.</p>
        <p><strong>Customize Your Resume</strong><br/>Tailor your resume for each opportunity by highlighting the most relevant skills, projects, and accomplishments. A targeted resume significantly improves your chances of getting shortlisted.</p>
        <p><strong>Showcase Real-World Projects</strong><br/>Employers value practical experience. Build projects that demonstrate your technical abilities, problem-solving skills, and understanding of industry tools and technologies.</p>
        <p><strong>Continue Learning</strong><br/>Stay updated with emerging technologies, industry trends, certifications, and online courses. Continuous learning helps you remain competitive in the job market.</p>
        <p><strong>Develop Communication Skills</strong><br/>Strong verbal and written communication skills are essential for interviews, teamwork, and professional growth.</p>
        <p><strong>Track Your Progress</strong><br/>Set career goals, monitor your achievements, and regularly update your resume and portfolio with new accomplishments.</p>
      </div>
    ),
    'ATS Guide': (
      <div className="space-y-3 text-slate-600 leading-relaxed text-sm">
        <p><strong>Understand the ATS:</strong> Applicant Tracking Systems are software used by 99% of Fortune 500 companies to filter resumes before a human ever sees them.</p>
        <p><strong>Stick to Standard Headings:</strong> Use simple, recognizable section titles like "Work Experience", "Education", and "Skills" instead of creative alternatives.</p>
        <p><strong>Use Exact Keywords:</strong> Mirror the exact terminology used in the job description, including specific software names, certifications, and hard skills.</p>
        <p><strong>Avoid Complex Formatting:</strong> Tables, columns, graphics, and unconventional fonts can confuse ATS parsers, leading to an automatic rejection.</p>
        <p><strong>Submit the Right File Type:</strong> Unless specifically requested otherwise, always submit your resume as a clean, text-selectable PDF document.</p>
      </div>
    ),

    'Resume Examples': (
      <div className="space-y-3 text-slate-600 leading-relaxed text-sm">
        <p><strong>Browse Proven Templates:</strong> Explore our curated gallery of successful resumes that have landed candidates jobs at FAANG and top-tier tech companies.</p>
        <p><strong>Role-Specific Designs:</strong> Whether you are a Software Engineer, Data Scientist, or Product Manager, see exactly how to structure your specific achievements.</p>
        <p><strong>Action Verb Inspiration:</strong> View hundreds of powerful bullet points that effectively demonstrate leadership, technical execution, and business impact.</p>
        <p><strong>Format Comparisons:</strong> Compare reverse-chronological, functional, and hybrid resume formats to determine which best suits your career history.</p>
        <p><strong>Instant Application:</strong> Found an example you love? You can instantly apply its structure and styling to your own profile using our AI Resume Builder.</p>
      </div>
    ),
    'About Us': (
      <div className="space-y-3 text-slate-600 leading-relaxed text-sm">
        <p><strong>About ResumeAI</strong></p>
        <p>ResumeAI is an intelligent career development platform designed to help job seekers create professional resumes, analyze resume quality, generate cover letters, and improve their chances of landing interviews. Our goal is to simplify the job application process through AI-powered tools that provide actionable insights, personalized recommendations, and professional templates.</p>
        <p>We empower students, fresh graduates, and experienced professionals to build stronger resumes, showcase their skills effectively, and advance their careers with confidence.</p>
      </div>
    ),
    'Privacy Policy': (
      <div className="space-y-3 text-slate-600 leading-relaxed text-sm">
        <p><strong>Privacy Policy</strong></p>
        <p>At ResumeAI, we value your privacy and are committed to protecting your personal information.</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Your resume data is stored securely.</li>
          <li>We do not sell your personal information to third parties.</li>
          <li>Uploaded resumes are used only to provide analysis and enhancement services.</li>
          <li>We implement industry-standard security measures to protect user data.</li>
          <li>Users have control over their stored resumes and projects.</li>
        </ul>
        <p>By using ResumeAI, you agree to the collection and use of information as described in this Privacy Policy.</p>
      </div>
    ),
    'Contact': (
      <div className="space-y-3 text-slate-600 leading-relaxed text-sm">
        <p><strong>Contact Us</strong></p>
        <p>We're here to help with any questions, feedback, or support requests.</p>
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 mt-2 mb-2">
          <p><strong>Email:</strong> gopikonangi@gmail.com</p>
          <p><strong>Phone:</strong> +91 7842239718</p>
          <p><strong>Response Time:</strong> We aim to respond to all inquiries within 24–48 hours.</p>
        </div>
        <p>Whether you need assistance with resume creation, resume analysis, cover letters, project management, or technical support, we're committed to providing timely and effective assistance.</p>
      </div>
    ),
    'Default': (
      <div className="space-y-3 text-slate-600 leading-relaxed text-sm">
        <p><strong>Welcome to ResumeAI!</strong> We are your ultimate career progression platform built to help you land your dream job faster and with more confidence.</p>
        <p>Our platform provides an enterprise-grade <strong>ATS Resume Analyzer</strong> that scans your resume against strict industry standards to identify crucial mistakes before recruiters do.</p>
        <p>Additionally, our intuitive <strong>AI Resume Builder</strong> allows you to quickly create professional, highly-formatted resumes using proven, beautiful templates.</p>
        <p>By combining advanced AI feedback with seamless design tools, we ensure your application easily bypasses automated ATS filters and impresses hiring managers.</p>
      </div>
    )
  };

  const handleLinkClick = (e: React.MouseEvent, title: string) => {
    e.preventDefault();
    setInfoTitle(title);
    setShowInfo(true);
  };

  return (
    <footer className="border-t border-slate-200 bg-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="text-emerald-600">
                <FileText className="w-6 h-6" strokeWidth={2.5} />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-slate-900">
                Resume<span className="text-emerald-600">AI</span>
              </span>
            </Link>
            <p className="text-slate-600 max-w-xs mb-6 leading-relaxed">
              The ultimate AI-powered career assistant. Analyze your resume, find skill gaps, and land your dream job faster.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-slate-900 mb-4 tracking-tight">Product</h3>
            <ul className="space-y-3">
              <li><Link to="/resume-analyzer" className="text-slate-600 hover:text-emerald-600 text-sm font-medium transition-colors">Resume Checker</Link></li>
              <li><Link to="/templates" className="text-slate-600 hover:text-emerald-600 text-sm font-medium transition-colors">Resume Builder</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-slate-900 mb-4 tracking-tight">Resources</h3>
            <ul className="space-y-3">
              <li><a href="#" onClick={(e) => handleLinkClick(e, 'Resume Examples')} className="text-slate-600 hover:text-emerald-600 text-sm font-medium transition-colors">Resume Examples</a></li>
              <li><a href="#" onClick={(e) => handleLinkClick(e, 'Career Advice')} className="text-slate-600 hover:text-emerald-600 text-sm font-medium transition-colors">Career Advice</a></li>
              <li><a href="#" onClick={(e) => handleLinkClick(e, 'ATS Guide')} className="text-slate-600 hover:text-emerald-600 text-sm font-medium transition-colors">ATS Guide</a></li>
              <li><Link to="/blog" className="text-slate-600 hover:text-emerald-600 text-sm font-medium transition-colors">Blog</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-slate-900 mb-4 tracking-tight">Company</h3>
            <ul className="space-y-3">
              <li><a href="#" onClick={(e) => handleLinkClick(e, 'About Us')} className="text-slate-600 hover:text-emerald-600 text-sm font-medium transition-colors">About</a></li>
              <li><a href="#" onClick={(e) => handleLinkClick(e, 'Contact')} className="text-slate-600 hover:text-emerald-600 text-sm font-medium transition-colors">Contact</a></li>
              <li><a href="#" onClick={(e) => handleLinkClick(e, 'Privacy Policy')} className="text-slate-600 hover:text-emerald-600 text-sm font-medium transition-colors">Privacy Policy</a></li>
              <li><a href="#" onClick={(e) => handleLinkClick(e, 'Terms of Service')} className="text-slate-600 hover:text-emerald-600 text-sm font-medium transition-colors">Terms</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm font-medium">&copy; {new Date().getFullYear()} ResumeAI. All rights reserved.</p>
          
          <div className="flex gap-6">
            <a href="#" className="text-slate-400 hover:text-emerald-600 transition-colors flex items-center gap-2 text-sm font-medium">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
              LinkedIn
            </a>
            <a href="#" className="text-slate-400 hover:text-emerald-600 transition-colors flex items-center gap-2 text-sm font-medium">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
              Twitter
            </a>
            <a href="#" className="text-slate-400 hover:text-emerald-600 transition-colors flex items-center gap-2 text-sm font-medium">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
              </svg>
              Facebook
            </a>
          </div>
        </div>
      </div>

      {/* Generic Info Modal for Footer Links */}
      {showInfo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 relative shadow-2xl animate-in fade-in zoom-in duration-200">
            <button onClick={() => setShowInfo(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-bold text-slate-900 mb-4">{infoTitle}</h3>
            {modalContent[infoTitle] || modalContent['Default']}
            <div className="mt-6 flex justify-end">
              <button onClick={() => setShowInfo(false)} className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors">
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
