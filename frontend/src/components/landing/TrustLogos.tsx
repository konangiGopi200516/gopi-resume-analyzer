export const TrustLogos = () => {
  return (
    <div className="py-16 bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight uppercase">
            Trusted By Professionals Across Industries
          </h2>
          <p className="text-xs text-slate-500 mt-2">
            Our users have successfully secured interviews at leading companies worldwide.
          </p>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 transition-transform duration-300">
          <img src="/google.png" alt="Google" className="h-8 transition-transform duration-300 hover:scale-110 hover:shadow-lg" />
          <img src="/amazon.png" alt="Amazon" className="h-8 transition-transform duration-300 hover:scale-110 hover:shadow-lg" />
          <img src="/microsoft.png" alt="Microsoft" className="h-8 transition-transform duration-300 hover:scale-110 hover:shadow-lg" />
          <img src="/deloitte.png" alt="Deloitte" className="h-8 transition-transform duration-300 hover:scale-110 hover:shadow-lg" />
          <img src="/ibm.png" alt="IBM" className="h-8 transition-transform duration-300 hover:scale-110 hover:shadow-lg" />
          <img src="/accenture.png" alt="Accenture" className="h-8 transition-transform duration-300 hover:scale-110 hover:shadow-lg" />
        </div>
      </div>
    </div>
  );
};
