import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Calendar, Clock, ChevronLeft } from 'lucide-react';

// This is a simplified version of the blog posts data just to render the page
const BLOG_POSTS = {
  1: {
    title: "How to Build an ATS-Friendly Resume in 2026",
    content: (
      <>
        <p>Applicant Tracking Systems (ATS) have become the gatekeepers of modern recruitment. In 2026, AI-driven parsers are more advanced than ever, but they still rely on structured data. To ensure your resume gets seen by a human, you must understand exactly how these systems digest your PDF.</p>
        <p>First and foremost, avoid complex formatting. Tables, multi-column layouts, and heavy graphics can completely break older ATS models, causing them to extract gibberish instead of your work history. Stick to a clean, single-column layout with clear hierarchical spacing.</p>
        <p>Secondly, use standard section headers. While "My Professional Journey" sounds creative, an ATS is explicitly programmed to look for standard headers like "Experience", "Education", and "Skills". Don't try to outsmart the system with unique nomenclature.</p>
        <p>Finally, context matters for keywords. Simply listing "Python" in a skills section is no longer enough. The ATS expects to see those keywords embedded contextually within your bullet points (e.g., "Built a data pipeline using Python and Pandas..."). Strategically embed exact keywords from the job description directly into your achievements.</p>
      </>
    ),
    category: "Resume Tips",
    date: "Jun 10, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=1200",
  },
  2: {
    title: "Top 10 Resume Mistakes Freshers Make",
    content: (
      <>
        <p>When entering the job market, many graduates make critical errors that instantly cost them interviews. Without years of experience to fall back on, the structure and clarity of your resume become your most valuable assets.</p>
        <p>The most common mistake is a generic objective statement. Saying "Seeking a challenging role to utilize my skills" provides zero value to the recruiter. Instead, write a professional summary stating exactly what value you bring and what specific technologies you specialize in.</p>
        <p>Another major mistake is listing duties instead of achievements. Don't just say "Tested software"; say "Reduced bug rate by 15% through automated testing scripts in JUnit." Freshers often underestimate their academic projects; treat them like real work experience and quantify the results.</p>
        <p>Lastly, spelling and grammar errors remain the number one reason recruiters instantly reject applications. Always run your resume through a grammar checker and have at least two peers review it before submitting.</p>
      </>
    ),
    category: "Career Advice",
    date: "Jun 08, 2026",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?auto=format&fit=crop&q=80&w=1200",
  },
  3: {
    title: "How to Answer \"Tell Me About Yourself\"",
    content: (
      <>
        <p>This classic interview opener is often the most terrifying question for candidates, but it's actually an incredible opportunity to frame the entire conversation on your terms.</p>
        <p>Do not recite your resume bullet-by-bullet or share your entire life story. The interviewer has already read your resume; they are asking this question to gauge your communication skills and to see what you prioritize about your own professional identity.</p>
        <p>Instead, use the highly effective "Present-Past-Future" formula. Start with your "Present": your current role, your major responsibilities, and a recent big win. Keep it punchy and relevant to the job you're interviewing for.</p>
        <p>Next, briefly cover your "Past" that led you to this point. Highlight the connecting thread in your career choices. Finally, conclude with the "Future": what you are looking for next and exactly why this specific role at this specific company aligns perfectly with your trajectory.</p>
      </>
    ),
    category: "Interview Prep",
    date: "Jun 05, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=1200",
  },
  4: {
    title: "Best Projects for CSE Students",
    content: (
      <>
        <p>Building theoretical knowledge in your Computer Science courses is important, but practical, deployed projects are what actually get you hired. Recruiters look for candidates who can take a concept from ideation to production.</p>
        <p>If you want to stand out, build full-stack applications that solve real problems. A great starter project is an E-Commerce platform. It forces you to deal with state management, user authentication, and secure payment gateway integration via Stripe or PayPal.</p>
        <p>Another excellent choice is a Real-Time application, such as a collaborative document editor or a chat application using WebSockets (like Socket.io). This demonstrates your understanding of real-time data flow and concurrent connections.</p>
        <p>Finally, consider building and deploying your own RESTful API. Document it professionally using Swagger/OpenAPI. Showing recruiters that you understand backend architecture, database schema design, and secure routing will put you far ahead of the competition.</p>
      </>
    ),
    category: "Projects",
    date: "Jun 01, 2026",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1200",
  },
  5: {
    title: "Java Developer Roadmap",
    content: (
      <>
        <p>Becoming a top-tier Java developer requires mastering a vast ecosystem that goes far beyond just understanding the syntax. Java remains the backbone of enterprise software, and the demand for skilled architects is higher than ever.</p>
        <p>Start with Core Java. You must have an unshakable understanding of Object-Oriented Programming (OOP) concepts, the Collections framework, multithreading, and Exception handling. This is the foundation upon which everything else is built.</p>
        <p>Next, master database interaction. Understand JDBC, but more importantly, learn Object-Relational Mapping (ORM) tools like Hibernate. You need to know how Java models interact with complex SQL schemas.</p>
        <p>The most crucial step in the modern era is mastering the Spring Framework, specifically Spring Boot. Learn how to quickly spin up REST APIs, configure Spring Security, and manage application properties. Finally, progress into cloud-native development: learn microservices architecture, Docker containerization, and deployment strategies using AWS or Azure.</p>
      </>
    ),
    category: "Roadmaps",
    date: "May 28, 2026",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200",
  },
  6: {
    title: "Spring Boot Interview Questions",
    content: (
      <>
        <p>If you're interviewing for a backend Java role today, it is almost guaranteed that the technical screening will revolve heavily around Spring Boot. You must know the framework inside out to pass technical rounds.</p>
        <p>Be prepared to explain the core concepts of the framework. You will undoubtedly be asked to explain the difference between @Controller and @RestController, and how Spring Boot's auto-configuration magic actually works under the hood via the @SpringBootApplication annotation.</p>
        <p>Dependency Injection (DI) is another massive topic. You should thoroughly understand how the Inversion of Control (IoC) container works, the different scopes of Spring Beans, and why constructor injection is universally preferred over @Autowired field injection.</p>
        <p>Finally, advanced topics separate the juniors from the seniors. Ensure you can confidently explain Spring Boot Actuator for monitoring, how to handle global exceptions using @ControllerAdvice, and the basics of implementing stateless JWT authentication with Spring Security.</p>
      </>
    ),
    category: "Interview Prep",
    date: "May 25, 2026",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&q=80&w=1200",
  },
  7: {
    title: "React Developer Career Guide",
    content: (
      <>
        <p>React continues to dominate the frontend ecosystem, but the skills required to be a "React Developer" have shifted significantly. To advance your career in 2026, you need to move far beyond simply rendering functional components.</p>
        <p>First, master the React lifecycle and advanced hooks. If you don't deeply understand when and why a component re-renders, you cannot build performant applications. Learn how to properly use useMemo and useCallback to prevent unnecessary rendering in complex data grids.</p>
        <p>State management is the next hurdle. While Context API is great, senior developers must be comfortable with robust global state solutions like Redux Toolkit or Zustand, and understand server-state caching using tools like React Query.</p>
        <p>Finally, modern React is all about meta-frameworks. Senior React developers are expected to understand Server-Side Rendering (SSR) and Static Site Generation (SSG) using frameworks like Next.js. You must also prioritize web accessibility (a11y) standards to ensure your applications are usable by everyone.</p>
      </>
    ),
    category: "Career Advice",
    date: "May 20, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=1200",
  },
  8: {
    title: "LinkedIn Profile Optimization Guide",
    content: (
      <>
        <p>In the modern job market, your LinkedIn profile is arguably more important than your resume. It acts as your 24/7 digital billboard, and if properly optimized, it can generate inbound leads from recruiters while you sleep.</p>
        <p>Start with the visual fundamentals. A professional, high-resolution headshot is non-negotiable. Pair this with a custom banner image that reflects your industry or personal brand to immediately signal professionalism.</p>
        <p>Your headline is the most heavily weighted field in LinkedIn's search algorithm. Do not just list your current job title. Turn it into a value proposition (e.g., 'Frontend Engineer | React & TypeScript Specialist | Building Scalable UIs'). This ensures you rank higher when recruiters search for those specific skills.</p>
        <p>Finally, your 'About' section should tell a compelling professional narrative, not just summarize your resume. Use this space to explain *why* you love what you do. Ensure your experience section is heavily keyword-optimized and contains specific metrics of success, just like your ATS-friendly resume.</p>
      </>
    ),
    category: "Networking",
    date: "May 15, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=1200",
  }
};

export const BlogPostPage = () => {
  const { id } = useParams();
  const post = BLOG_POSTS[Number(id) as keyof typeof BLOG_POSTS];

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
        <Navbar />
        <main className="flex-grow pt-[72px] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-slate-800 mb-4">Article Not Found</h1>
            <Link to="/blog" className="text-emerald-600 hover:text-emerald-700 font-medium">← Back to Blog</Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans">
      <Navbar />
      
      <main className="flex-grow pt-[72px]">
        {/* Article Hero */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <Link to="/blog" className="inline-flex items-center text-sm font-semibold text-emerald-600 hover:text-emerald-700 mb-8 transition-colors">
            <ChevronLeft className="w-4 h-4 mr-1" /> Back to all articles
          </Link>
          
          <div className="mb-6 flex justify-center">
            <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
              {post.category}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-8 leading-tight">
            {post.title}
          </h1>
          
          <div className="flex items-center justify-center gap-6 text-sm font-medium text-slate-500 mb-12">
            <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {post.date}</span>
            <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> {post.readTime}</span>
          </div>
        </div>

        {/* Hero Image */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <img src={post.image} alt={post.title} className="w-full h-[400px] md:h-[500px] object-cover" />
          </div>
        </div>

        {/* Article Body */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          <div className="prose prose-lg prose-emerald max-w-none text-slate-700 leading-loose article-content">
            <div className="text-xl leading-relaxed text-slate-800 mb-8 space-y-6">
              {post.content}
            </div>
            
            <div className="mt-16 p-8 bg-emerald-50 rounded-2xl border border-emerald-100">
              <h3 className="text-2xl font-bold text-emerald-900 mb-4">Ready to take the next step?</h3>
              <p className="mb-6 text-emerald-800">Ensure your resume is perfectly optimized and beautifully designed based on these best practices.</p>
              <div className="flex gap-4">
                <Link to="/resume-analyzer" className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-bold transition-colors">
                  Analyze Resume
                </Link>
                <Link to="/templates" className="bg-white border border-emerald-200 text-emerald-700 hover:bg-emerald-50 px-6 py-3 rounded-lg font-bold transition-colors">
                  Build Resume
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
