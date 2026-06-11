import { Link } from 'react-router-dom';
import { Breadcrumb } from '../components/Breadcrumb';

const examples = [
  {
    title: 'Software Engineer Cover Letter Example',
    slug: 'software-engineer',
    category: 'Technology',
    atsScore: 98,
    description: 'Professional cover letter for software engineers focusing on Java, Spring Boot, and React.',
    thumbnail: '/cover-letter-examples/software-engineer.png',
  },
  {
    title: 'Java Developer Cover Letter Example',
    slug: 'java-developer',
    category: 'Technology',
    atsScore: 96,
    description: 'Tailored for Java developers with emphasis on Spring and microservices.',
    thumbnail: '/cover-letter-examples/java-developer.png',
  },
  // Add more example objects as needed
];

export const CoverLetterExamples = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <Breadcrumb />
      {/* Hero Section */}
      <section className="bg-white py-12 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            Professional Cover Letter Examples for Every Career
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse ATS‑friendly cover letter examples and templates used by professionals across industries.
          </p>
          <div className="mt-8 flex justify-center space-x-4">
            <input
              type="text"
              placeholder="Search examples..."
              className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {['Technology','Engineering','Business','Healthcare','Education','Design','Marketing','Finance','Freshers'].map((cat) => (
              <button key={cat} className="px-3 py-1 bg-gray-100 hover:bg-emerald-100 text-gray-800 rounded-md text-sm">
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex gap-8">
        {/* Main Content */}
        <div className="flex-1">
          {/* Featured Example */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Featured Cover Letter Example</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-white p-6 rounded-xl shadow-sm">
              <div className="flex flex-col items-center">
                <img
                  src="/cover-letter-examples/software-engineer.png"
                  alt="Software Engineer Cover Letter"
                  className="w-full max-w-md rounded-md border"
                />
                <div className="mt-2 flex gap-2">
                  <button className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors">
                    Download PDF
                  </button>
                  <button className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors">
                    Download DOCX
                  </button>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Software Engineer Cover Letter Example</h3>
                <p className="text-gray-700 mb-4">
                  A concise, ATS‑optimized cover letter that highlights Java, Spring Boot, REST APIs, MySQL, and React experience.
                </p>
                <ul className="list-disc list-inside text-gray-600 mb-4">
                  <li>Java</li>
                  <li>Spring Boot</li>
                  <li>REST API</li>
                  <li>MySQL</li>
                  <li>React</li>
                </ul>
                <p className="font-bold mb-4">ATS Compatibility Score: 98/100</p>
                <Link
                  to="/cover-letter-examples/software-engineer"
                  className="inline-block px-6 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors"
                >
                  Use This Template
                </Link>
              </div>
            </div>
          </section>

          {/* Popular Examples Grid */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Popular Cover Letter Examples</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {examples.map((ex) => (
                <div key={ex.slug} className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <img src={ex.thumbnail} alt={ex.title} className="w-full h-40 object-cover" />
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-1">{ex.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{ex.description}</p>
                    <p className="text-sm font-medium text-emerald-600 mb-2">ATS Score: {ex.atsScore}/100</p>
                    <div className="flex gap-2">
                      <Link
                        to={`/cover-letter-examples/${ex.slug}`}
                        className="px-3 py-1 bg-gray-100 text-gray-800 rounded-md hover:bg-emerald-100 transition-colors text-sm"
                      >
                        Preview
                      </Link>
                      <Link
                        to={`/cover-letter-examples/${ex.slug}`}
                        className="px-3 py-1 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors text-sm"
                      >
                        Use Template
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sticky Sidebar */}
        <aside className="w-64 hidden lg:block flex-shrink-0">
          <div className="sticky top-20 space-y-6">
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <h4 className="font-semibold mb-2">Popular Examples</h4>
              <ul className="space-y-1 text-sm">
                <li><Link to="/cover-letter-examples/software-engineer" className="text-gray-600 hover:text-emerald-600">Software Engineer</Link></li>
                <li><Link to="/cover-letter-examples/java-developer" className="text-gray-600 hover:text-emerald-600">Java Developer</Link></li>
                <li><Link to="/cover-letter-examples/data-analyst" className="text-gray-600 hover:text-emerald-600">Data Analyst</Link></li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <h4 className="font-semibold mb-2">ATS Tips</h4>
              <ul className="list-disc list-inside text-sm text-gray-600">
                <li>Use keywords from the job description</li>
                <li>Keep formatting simple</li>
                <li>Avoid images and tables</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <h4 className="font-semibold mb-2">Writing Guides</h4>
              <ul className="space-y-1 text-sm">
                <li><Link to="/cover-letter-guides" className="text-gray-600 hover:text-emerald-600">How to Write a Cover Letter</Link></li>
                <li><Link to="/cover-letter-guides" className="text-gray-600 hover:text-emerald-600">Cover Letter Format</Link></li>
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
