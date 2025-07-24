import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

const NotFound = () => {
  const { theme } = useTheme();

  return (
    <div className="min-h-full pt-16 pb-12 flex flex-col">
      <main className="flex-grow flex flex-col justify-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex-shrink-0 flex justify-center">
          <svg
            className={`h-12 w-auto ${theme === 'dark' ? 'text-primary-400' : 'text-primary-600'}`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <div className="py-8">
          <div className="text-center">
            <h1 className={`mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Page not found.
            </h1>
            <p className={`mt-2 text-base ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              Sorry, we couldn't find the page you're looking for.
            </p>
            <div className="mt-6">
              <Link
                to="/"
                className={`text-base font-medium ${theme === 'dark' ? 'text-primary-400 hover:text-primary-300' : 'text-primary-600 hover:text-primary-500'}`}
              >
                Go back home<span aria-hidden="true"> &rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <footer className="flex-shrink-0 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex justify-center space-x-4">
          <Link
            to="/contact"
            className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-600'}`}
          >
            Contact Support
          </Link>
          <span className={`inline-block border-l ${theme === 'dark' ? 'border-gray-600' : 'border-gray-300'}`} aria-hidden="true" />
          <Link
            to="/status"
            className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-600'}`}
          >
            Status
          </Link>
        </nav>
      </footer>
    </div>
  );
};

export default NotFound;