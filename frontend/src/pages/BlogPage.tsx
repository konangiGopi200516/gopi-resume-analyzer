import React from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { BookOpen, Calendar, Clock, ChevronRight, Search, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const BLOG_POSTS = [
  {
    id: 1,
    title: "How to Build an ATS-Friendly Resume in 2026",
    excerpt: "Learn the essential strategies and formatting rules to ensure your resume passes through automated Applicant Tracking Systems effortlessly.",
    category: "Resume Tips",
    date: "Jun 10, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=600",
    featured: true
  },
  {
    id: 2,
    title: "Top 10 Resume Mistakes Freshers Make",
    excerpt: "Avoid these common pitfalls that cost new graduates their dream jobs. From formatting errors to vague objective statements.",
    category: "Career Advice",
    date: "Jun 08, 2026",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?auto=format&fit=crop&q=80&w=600",
    featured: true
  },
  {
    id: 3,
    title: "How to Answer \"Tell Me About Yourself\"",
    excerpt: "Master the most common interview question with our proven formula for crafting the perfect professional elevator pitch.",
    category: "Interview Prep",
    date: "Jun 05, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=600",
    featured: false
  },
  {
    id: 4,
    title: "Best Projects for CSE Students",
    excerpt: "Stand out from the crowd with these impressive, real-world project ideas that showcase your technical depth and problem-solving skills.",
    category: "Projects",
    date: "Jun 01, 2026",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=600",
    featured: false
  },
  {
    id: 5,
    title: "Java Developer Roadmap",
    excerpt: "A comprehensive, step-by-step guide to becoming a highly paid Java Developer. From core concepts to enterprise architecture.",
    category: "Roadmaps",
    date: "May 28, 2026",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600",
    featured: false
  },
  {
    id: 6,
    title: "Spring Boot Interview Questions",
    excerpt: "Crush your backend engineering interviews with this curated list of the most frequently asked Spring Boot technical questions.",
    category: "Interview Prep",
    date: "May 25, 2026",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&q=80&w=600",
    featured: false
  },
  {
    id: 7,
    title: "React Developer Career Guide",
    excerpt: "Navigate the dynamic world of frontend development. Learn what it takes to progress from junior React developer to senior architect.",
    category: "Career Advice",
    date: "May 20, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=600",
    featured: false
  },
  {
    id: 8,
    title: "LinkedIn Profile Optimization Guide",
    excerpt: "Transform your LinkedIn profile into a lead-generation magnet for recruiters. Optimize your headline, summary, and experience sections.",
    category: "Networking",
    date: "May 15, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=600",
    featured: false
  }
];

export const BlogPage = () => {
  const featuredPosts = BLOG_POSTS.filter(post => post.featured);
  const regularPosts = BLOG_POSTS.filter(post => !post.featured);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <Navbar />
      
      <main className="flex-grow pt-[72px]">
        {/* Header Section */}
        <div className="bg-emerald-900 text-white py-20 px-4 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
          <div className="max-w-7xl mx-auto relative z-10 text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">ResumeAI <span className="text-emerald-400">Blog</span></h1>
            <p className="text-xl md:text-2xl text-emerald-100 max-w-2xl mx-auto mb-10 leading-relaxed">
              Expert career advice, interview strategies, and technical roadmaps to help you land your dream job.
            </p>
            <div className="max-w-lg mx-auto relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="w-5 h-5 text-gray-400 group-focus-within:text-emerald-500 transition-colors" />
              </div>
              <input 
                type="text" 
                placeholder="Search articles..." 
                className="w-full pl-12 pr-4 py-4 rounded-full text-slate-800 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-emerald-500/30 shadow-lg transition-all"
              />
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          
          {/* Featured Posts Section */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <TrendingUp className="w-6 h-6 text-emerald-600" />
              <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Trending Now</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <div key={post.id} className="group rounded-2xl overflow-hidden bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col">
                  <div className="h-64 overflow-hidden relative">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-bold text-emerald-700 rounded-full uppercase tracking-wide">
                      {post.category}
                    </div>
                  </div>
                  <div className="p-8 flex flex-col flex-grow">
                    <div className="flex items-center gap-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {post.date}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {post.readTime}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-4 group-hover:text-emerald-600 transition-colors leading-tight">
                      <Link to={`/blog/${post.id}`}>{post.title}</Link>
                    </h3>
                    <p className="text-slate-600 leading-relaxed mb-8 flex-grow">
                      {post.excerpt}
                    </p>
                    <Link to={`/blog/${post.id}`} className="inline-flex items-center font-bold text-emerald-600 hover:text-emerald-700 transition-colors group/btn w-max">
                      Read Article <ChevronRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* All Posts Grid */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <BookOpen className="w-6 h-6 text-emerald-600" />
              <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Latest Articles</h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post) => (
                <div key={post.id} className="group rounded-2xl overflow-hidden bg-white shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 flex flex-col hover:-translate-y-1">
                  <div className="h-48 overflow-hidden relative">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-0.5 text-[10px] font-bold text-emerald-700 rounded-full uppercase tracking-wider">
                      {post.category}
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center justify-between text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3">
                      <span>{post.date}</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 mb-3 group-hover:text-emerald-600 transition-colors leading-snug">
                      <Link to={`/blog/${post.id}`}>{post.title}</Link>
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed mb-6 flex-grow line-clamp-3">
                      {post.excerpt}
                    </p>
                    <Link to={`/blog/${post.id}`} className="inline-flex items-center text-sm font-bold text-emerald-600 hover:text-emerald-700 transition-colors group/btn w-max">
                      Read More <ChevronRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            

          </div>
          
        </div>
      </main>

      <Footer />
    </div>
  );
};
