import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';

export const CoverLetterTemplates = () => {
  return (
    <section className="bg-gray-50 dark:bg-gray-800 min-h-screen py-12">
      {/* Hero Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-4">
          Professional Cover Letter Templates
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
          Choose from ATS‑friendly cover letter templates designed to help you stand out and increase your interview opportunities.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/cover-letter-templates"
            className="px-6 py-3 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition"
          >
            Browse Templates
          </Link>
          <Link
            to="/cover-letter-builder"
            className="px-6 py-3 border border-emerald-600 text-emerald-600 rounded-md hover:bg-emerald-50 transition"
          >
            Create Cover Letter
          </Link>
        </div>
      </div>

      {/* What Makes a Good Template */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          What Makes a Good Cover Letter Template?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            'Professional Layout',
            'ATS‑Friendly Structure',
            'Clean Typography',
            'Consistent Formatting',
            'Easy Customization',
            'Recruiter Approved',
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center space-x-2 p-4 bg-white dark:bg-gray-900 rounded-lg shadow-sm"
            >
              <Check className="w-5 h-5 text-emerald-600" />
              <span className="text-gray-800 dark:text-gray-200">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Template Categories */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          Template Categories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: 'Modern', description: 'Sleek, contemporary designs', img: '/templates/modern.png' },
            { name: 'Professional', description: 'Classic corporate look', img: '/templates/professional.png' },
            { name: 'Creative', description: 'Bold colours & layouts', img: '/templates/creative.png' },
            { name: 'Corporate', description: 'Formal business style', img: '/templates/corporate.png' },
            { name: 'Technology', description: 'Tech‑savvy formatting', img: '/templates/technology.png' },
            { name: 'Executive', description: 'High‑level leadership vibe', img: '/templates/executive.png' },
            { name: 'Student', description: 'Entry‑level & internship focus', img: '/templates/student.png' },
          ].map((cat, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow hover:shadow-lg transition"
            >
              {/* Placeholder image – replace with real preview */}
              <div className="h-40 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <span className="text-gray-500 dark:text-gray-400">{cat.name} Preview</span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  {cat.name} Templates
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{cat.description}</p>
                <div className="flex gap-2">
                  <button className="px-3 py-1 bg-emerald-600 text-white text-sm rounded hover:bg-emerald-700 transition">
                    Use Template
                  </button>
                  <button className="px-3 py-1 border border-emerald-600 text-emerald-600 text-sm rounded hover:bg-emerald-50 transition">
                    Preview
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Essential Sections */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          Essential Sections of a Cover Letter
        </h2>
        <ol className="list-decimal list-inside space-y-2 text-gray-800 dark:text-gray-200">
          <li>Contact Information</li>
          <li>Hiring Manager Details</li>
          <li>Professional Greeting</li>
          <li>Introduction Paragraph</li>
          <li>Skills & Experience Section</li>
          <li>Achievement Highlights</li>
          <li>Closing Paragraph</li>
          <li>Professional Signature</li>
        </ol>
      </div>

      {/* Best Practices */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          Best Practices
        </h2>
        <ul className="space-y-2 text-gray-800 dark:text-gray-200">
          <li>🗒 Keep it to one page</li>
          <li>🖋 Use professional fonts</li>
          <li>✏️ Customize for each job</li>
          <li>📊 Include measurable achievements</li>
          <li>🔑 Match keywords from the job description</li>
          <li>✅ Proofread before sending</li>
        </ul>
      </div>

      {/* Example Cover Letter Structure */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 bg-white dark:bg-gray-900 rounded-lg p-6 shadow">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          Example Cover Letter Structure
        </h2>
        <pre className="whitespace-pre-wrap text-gray-800 dark:text-gray-200">
{`[Your Name]
[Contact Information]

Dear Hiring Manager,

I am excited to apply for the Software Engineer position...

[Skills and Achievements]

Thank you for your consideration.

Sincerely,
Your Name`}
        </pre>
      </div>

      {/* Call to Action */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Link
          to="/cover-letter-builder"
          className="inline-block px-8 py-3 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition"
        >
          Start Building Your Cover Letter
        </Link>
      </div>
    </section>
  );
};
