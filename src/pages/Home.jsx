import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

const Home = () => {
  const { theme } = useTheme();

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className={`text-base font-semibold tracking-wide uppercase ${theme === 'dark' ? 'text-primary-400' : 'text-primary-600'}`}>
            For Developers
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl">
            Showcase your work and connect with others
          </p>
          <p className={`mt-4 max-w-2xl text-xl lg:mx-auto ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            Create your developer portfolio, share your projects, write blog posts, and discover other developers.
          </p>
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className={`pt-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-xl overflow-hidden`}>
              <div className="px-6 py-8">
                <div className={`flex items-center justify-center h-12 w-12 rounded-md ${theme === 'dark' ? 'bg-primary-500' : 'bg-primary-600'} text-white`}>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="mt-6">
                  <h3 className={`text-lg font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Create Your Profile</h3>
                  <p className={`mt-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    Build a professional profile to showcase your skills, experience, and projects.
                  </p>
                </div>
              </div>
            </div>

            <div className={`pt-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-xl overflow-hidden`}>
              <div className="px-6 py-8">
                <div className={`flex items-center justify-center h-12 w-12 rounded-md ${theme === 'dark' ? 'bg-primary-500' : 'bg-primary-600'} text-white`}>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="mt-6">
                  <h3 className={`text-lg font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Showcase Projects</h3>
                  <p className={`mt-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    Add your projects with details like tech stack, GitHub links, and live demos.
                  </p>
                </div>
              </div>
            </div>

            <div className={`pt-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-xl overflow-hidden`}>
              <div className="px-6 py-8">
                <div className={`flex items-center justify-center h-12 w-12 rounded-md ${theme === 'dark' ? 'bg-primary-500' : 'bg-primary-600'} text-white`}>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
                <div className="mt-6">
                  <h3 className={`text-lg font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Write Blog Posts</h3>
                  <p className={`mt-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    Share your knowledge and experiences through blog posts with markdown support.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/signup"
            className={`px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500`}
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;