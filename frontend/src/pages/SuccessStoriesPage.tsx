import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { SuccessStories } from '../components/landing/SuccessStories';

export default function SuccessStoriesPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-8 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
        <Link
          to="/"
          className="inline-flex items-center text-emerald-600 hover:underline font-medium"
        >
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Home
        </Link>
      </div>
      <SuccessStories />
    </div>
  );
}
