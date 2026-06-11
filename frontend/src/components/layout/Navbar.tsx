import { Link } from 'react-router-dom';
import { Menu, X, User } from 'lucide-react';
import { useState, useEffect } from 'react';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState<{name: string, email: string} | null>(null);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        setUser(JSON.parse(userStr));
      } catch (e) {}
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/login';
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white border-b border-gray-200 backdrop-blur-sm h-[72px] flex items-center font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-full">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-1">
          <span className="font-bold text-xl text-gray-900">Resume</span>
          <span className="font-bold text-xl text-emerald-600">AI</span>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden lg:flex items-center space-x-8 ml-12">
          <Link
            to="/resume-analyzer"
            className="text-gray-600 hover:text-emerald-600 transition-colors duration-300"
          >
            ATS Resume Checker
          </Link>
          <Link
            to="/templates"
            className="text-gray-600 hover:text-emerald-600 transition-colors duration-300"
          >
            AI Resume Builder
          </Link>

          <Link
            to="/success-stories"
            className="text-gray-600 hover:text-emerald-600 transition-colors duration-300"
          >
            Success Stories
          </Link>
        </div>

        {/* Right side: buttons & mobile menu button */}
        <div className="flex items-center space-x-8 ml-8">

          {user ? (
            <div className="relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-2 text-slate-700 bg-slate-50 hover:bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200 transition"
              >
                <User className="w-4 h-4 text-emerald-600" />
                <span className="text-sm font-medium">{user.name.split(' ')[0]}</span>
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-xl shadow-lg py-2 z-50">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-bold text-slate-800 truncate">{user.name}</p>
                    <p className="text-xs text-slate-500 truncate mt-0.5">{user.email}</p>
                  </div>
                  <div className="px-2 pt-2">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-600 hover:text-emerald-600 font-medium transition-colors duration-300"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-md px-4 py-2 font-medium transition-colors duration-300 shadow-md"
              >
                Sign Up
              </Link>
            </>
          )}
          {/* Mobile menu toggle */}
          <button
            className="lg:hidden p-2 text-gray-600 hover:text-emerald-600 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200">
          <div className="flex flex-col space-y-2 px-4 py-3">
            <Link
              to="/resume-analyzer"
              className="text-gray-600 hover:text-emerald-600 transition-colors duration-300"
            >
              ATS Resume Checker
            </Link>
            <Link
              to="/templates"
              className="text-gray-600 hover:text-emerald-600 transition-colors duration-300"
            >
              AI Resume Builder
            </Link>

            <Link
              to="#success"
              className="text-gray-600 hover:text-emerald-600 transition-colors duration-300"
            >
              Success Stories
            </Link>

            {user ? (
              <div className="border-t border-gray-100 mt-2 pt-2 pb-2">
                <div className="px-2 py-2">
                  <p className="text-sm font-bold text-slate-800">{user.name}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{user.email}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left mt-2 px-2 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-emerald-600 font-medium transition-colors duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-md px-4 py-2 font-medium transition-colors duration-300 shadow-md"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
