import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-primary-600 dark:text-primary-400">
          DevLink
        </Link>
        
        <div className="flex items-center space-x-4">
          <NavLink 
            to="/explore" 
            className={({ isActive }) => 
              `px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'text-primary-600 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400'}`
            }
          >
            Explore
          </NavLink>
          
          {user ? (
            <>
              <NavLink 
                to="/dashboard" 
                className={({ isActive }) => 
                  `px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'text-primary-600 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400'}`
                }
              >
                Dashboard
              </NavLink>
              <button
                onClick={logout}
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink 
                to="/login" 
                className={({ isActive }) => 
                  `px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'text-primary-600 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400'}`
                }
              >
                Login
              </NavLink>
              <NavLink 
                to="/signup" 
                className={({ isActive }) => 
                  `px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'text-primary-600 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400'}`
                }
              >
                Sign Up
              </NavLink>
            </>
          )}
          
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full focus:outline-none"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <SunIcon className="h-5 w-5 text-yellow-400" />
            ) : (
              <MoonIcon className="h-5 w-5 text-gray-700" />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;