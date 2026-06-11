import { Star } from 'lucide-react';

export const Testimonial = () => {
  return (
    <div className="bg-emerald-500 py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Testimonial Card */}
        <div className="bg-orange-50 rounded-2xl p-8 md:p-12 shadow-2xl relative max-w-md mx-auto md:ml-auto">
          <div className="absolute -top-6 left-1/2 -translate-x-1/2">
            <img 
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&h=100&auto=format&fit=crop" 
              alt="User profile" 
              className="w-16 h-16 rounded-full border-4 border-white shadow-md object-cover"
            />
          </div>
          <div className="mt-8">
            <p className="text-slate-800 text-lg font-medium italic mb-6">
              "ResumeAI helped me identify exactly why I wasn't getting callbacks. After applying the changes suggested by the ATS checker, I landed interviews at three top tech companies within a week."
            </p>
            <div>
              <p className="font-bold text-slate-900">Sarah Jenkins</p>
              <p className="text-sm text-slate-500 mb-4">Software Engineer</p>
              <div className="flex text-emerald-500">
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Text */}
        <div className="text-white">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
            Your resume is an <br/>
            extension of yourself - <br/>
            make one that's truly you
          </h2>
          <button className="bg-emerald-800 hover:bg-emerald-900 text-white px-8 py-3 rounded-xl font-bold transition-colors">
            See more success stories
          </button>
          
          <div className="mt-8 flex items-center gap-2">
            <span className="font-semibold">Excellent</span>
            <div className="flex gap-1 text-emerald-900">
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
            </div>
            <span className="text-emerald-100 text-sm ml-2">Based on 1,245 reviews</span>
          </div>
        </div>

      </div>
    </div>
  );
};
