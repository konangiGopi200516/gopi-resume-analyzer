import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

// Updated data with short and full stories
const successStories = [
  {
    id: 1,
    name: 'Rahul Kumar',
    role: 'Software Engineer',
    scoreBefore: 58,
    scoreAfter: 89,
    company: 'Hired as Software Engineer',
    avatar: '/avatars/rahul.jpg',
    shortStory: 'The AI Resume Analyzer identified missing keywords and weak project descriptions. After implementing the suggestions, my ATS score increased significantly, and I secured a Software Engineer role within two months.',
    fullStory: 'The AI Resume Analyzer identified missing keywords and weak project descriptions. After implementing the suggestions, my ATS score increased significantly, and I secured a Software Engineer role within two months.',
    improvements: ['Keyword Optimization', 'Project Descriptions'],
  },
  {
    id: 2,
    name: 'Priya Sharma',
    role: 'Full Stack Developer Intern',
    scoreBefore: 62,
    scoreAfter: 92,
    company: 'Hired as Full Stack Developer Intern',
    avatar: '/avatars/priya.jpg',
    shortStory: 'I was applying for internships but receiving no responses. The analyzer improved my resume structure, grammar, and keyword optimization. I received multiple interview calls and landed a Full Stack Internship.',
    fullStory: 'I was applying for internships but receiving no responses. The analyzer improved my resume structure, grammar, and keyword optimization. I received multiple interview calls and landed a Full Stack Internship.',
    improvements: ['Resume Structure', 'Grammar', 'Keyword Optimization'],
  },
  {
    id: 3,
    name: 'Arjun Reddy',
    role: 'Junior Web Developer',
    scoreBefore: 45,
    scoreAfter: 84,
    company: 'Hired as Junior Web Developer',
    avatar: '/avatars/arjun.jpg',
    shortStory: 'As someone transitioning from Mechanical Engineering to IT, I struggled to showcase my skills effectively. The analyzer helped me highlight relevant projects and certifications.',
    fullStory: 'As someone transitioning from Mechanical Engineering to IT, I struggled to showcase my skills effectively. The analyzer helped me highlight relevant projects and certifications.',
    improvements: ['Skill Highlighting', 'Project Showcasing', 'Certifications'],
  },
  {
    id: 4,
    name: 'Sneha Patel',
    role: 'Graduate Trainee',
    scoreBefore: 55,
    scoreAfter: 90,
    company: 'Hired as Graduate Trainee',
    avatar: '/avatars/sneha.jpg',
    shortStory: 'The platform provided clear recommendations for improving readability and professional formatting. My resume became much stronger and helped me get my first job offer.',
    fullStory: 'The platform provided clear recommendations for improving readability and professional formatting. My resume became much stronger and helped me get my first job offer.',
    improvements: ['Readability', 'Professional Formatting'],
  },
  {
    id: 5,
    name: 'Karthik Varma',
    role: 'Data Analyst',
    scoreBefore: 60,
    scoreAfter: 91,
    company: 'Hired as Data Analyst',
    avatar: '/avatars/karthik.jpg',
    shortStory: 'The analyzer pointed out missing analytics tools and data-related keywords. After updating my resume, I received interview invitations from multiple companies.',
    fullStory: 'The analyzer pointed out missing analytics tools and data-related keywords. After updating my resume, I received interview invitations from multiple companies.',
    improvements: ['Tool Highlighting', 'Data Keywords'],
  },
  {
    id: 6,
    name: 'Neha Singh',
    role: 'QA Testing Engineer',
    scoreBefore: 52,
    scoreAfter: 88,
    company: 'Hired as QA Testing Engineer',
    avatar: '/avatars/neha.jpg',
    shortStory: 'I wasn\'t getting shortlisted despite having good skills. The AI recommendations improved my resume\'s ATS compatibility and highlighted my testing experience effectively.',
    fullStory: 'I wasn\'t getting shortlisted despite having good skills. The AI recommendations improved my resume\'s ATS compatibility and highlighted my testing experience effectively.',
    improvements: ['ATS Compatibility', 'Experience Highlighting'],
  },
  {
    id: 7,
    name: 'Aditya Verma',
    role: 'Cloud Engineer',
    scoreBefore: 57,
    scoreAfter: 93,
    company: 'Hired as Cloud Engineer',
    avatar: '/avatars/aditya.jpg',
    shortStory: 'The analyzer suggested adding cloud certifications and restructuring my technical skills section. My profile became more appealing to recruiters.',
    fullStory: 'The analyzer suggested adding cloud certifications and restructuring my technical skills section. My profile became more appealing to recruiters.',
    improvements: ['Cloud Certifications', 'Technical Skills Structure'],
  },
  {
    id: 8,
    name: 'Pooja Mehta',
    role: 'Business Analyst',
    scoreBefore: 61,
    scoreAfter: 87,
    company: 'Hired as Business Analyst',
    avatar: '/avatars/pooja.jpg',
    shortStory: 'The AI Resume Analyzer helped me create achievement-focused descriptions instead of generic responsibilities. Recruiters started noticing my profile immediately.',
    fullStory: 'The AI Resume Analyzer helped me create achievement-focused descriptions instead of generic responsibilities. Recruiters started noticing my profile immediately.',
    improvements: ['Achievement-focused Descriptions'],
  },
  {
    id: 9,
    name: 'Vikram Nair',
    role: 'DevOps Engineer',
    scoreBefore: 49,
    scoreAfter: 90,
    company: 'Hired as DevOps Engineer',
    avatar: '/avatars/vikram.jpg',
    shortStory: 'My resume lacked important DevOps keywords and measurable achievements. The analyzer provided actionable feedback that transformed my resume.',
    fullStory: 'My resume lacked important DevOps keywords and measurable achievements. The analyzer provided actionable feedback that transformed my resume.',
    improvements: ['DevOps Keywords', 'Measurable Achievements'],
  },
  {
    id: 10,
    name: 'Ananya Gupta',
    role: 'UI/UX Designer',
    scoreBefore: 54,
    scoreAfter: 86,
    company: 'Hired as UI/UX Designer',
    avatar: '/avatars/ananya.jpg',
    shortStory: 'The tool helped me improve portfolio links, design project descriptions, and resume organization. Within weeks, I received offers from multiple startups.',
    fullStory: 'The tool helped me improve portfolio links, design project descriptions, and resume organization. Within weeks, I received offers from multiple startups.',
    improvements: ['Portfolio Links', 'Project Descriptions', 'Organization'],
  }
];

const ProgressBar = ({ from, to }: { from: number; to: number }) => (
  <div className="mb-4 mt-2">
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div className="bg-emerald-600 h-2.5 rounded-full transition-all duration-1000" style={{ width: `${to}%` }}></div>
    </div>
    <div className="text-xs font-semibold text-gray-500 mt-1.5 flex justify-between">
      <span>Original Score: {from}</span>
      <span className="text-emerald-600 font-bold">New ATS Score: {to}</span>
    </div>
  </div>
);

export const SuccessStories = () => {
  const [selected, setSelected] = useState<typeof successStories[0] | null>(null);

  const closeModal = () => setSelected(null);

  return (
    <section className="bg-gray-50 dark:bg-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 text-center mb-8">
          Success Stories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {successStories.map((s) => (
            <div
              key={s.id}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-6 flex flex-col h-full">
                <div className="flex items-center mb-4">
                  {s.avatar && (<img src={s.avatar} alt={s.name} className="w-12 h-12 rounded-full mr-3" onError={(e)=>{ (e.target as HTMLImageElement).style.display='none'; }} />)}
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-gray-200">{s.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{s.role}</p>
                  </div>
                </div>
                <ProgressBar from={s.scoreBefore} to={s.scoreAfter} />
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-2 line-clamp-2" title={s.shortStory}>
                  {s.shortStory}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center space-x-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4" fill="currentColor" />
                    ))}
                  </div>
                  <button
                    onClick={() => setSelected(s)}
                    className="text-emerald-600 hover:underline text-sm font-medium"
                  >
                    Read Full Story
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Statistics */}
        <div className="mt-12 text-center">
          <p className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            25,000+ Resumes Analyzed • 5,000+ Successful Placements
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
            4.8/5 Average User Rating • 85%+ ATS Score Achieved by Top Candidates
          </p>
        </div>
      </div>

      {/* Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-900 rounded-xl w-full max-w-2xl mx-4 p-6 relative overflow-y-auto max-h-[90vh]">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <div className="flex items-center mb-4">
              {selected.avatar && (<img src={selected.avatar} alt={selected.name} className="w-16 h-16 rounded-full mr-4" onError={(e)=>{ (e.target as HTMLImageElement).style.display='none'; }} />)}
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">{selected.name}</h3>
                <p className="text-gray-600 dark:text-gray-300">{selected.role}</p>
                <p className="mt-1 text-gray-700 dark:text-gray-200">
                  ATS Score: {selected.scoreBefore} → {selected.scoreAfter}
                </p>
              </div>
            </div>
            <p className="text-gray-800 dark:text-gray-200 mb-4 whitespace-pre-line">
              {selected.fullStory}
            </p>
            <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">Improvements</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 mb-4">
              {selected.improvements.map((imp, idx) => (
                <li key={idx}>✓ {imp}</li>
              ))}
            </ul>
            <div className="flex justify-end">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
