import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { databases, storage } from '../config/appwrite';

const Explore = () => {
  const { theme } = useTheme();
  const [developers, setDevelopers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchDevelopers = async () => {
      try {
        const response = await databases.listDocuments('devlink', 'users');
        const developersWithAvatars = await Promise.all(
          response.documents.map(async (dev) => {
            let avatarUrl = '';
            if (dev.avatar_id) {
              avatarUrl = storage.getFilePreview('files', dev.avatar_id);
            }
            return { ...dev, avatarUrl };
          })
        );
        setDevelopers(developersWithAvatars);
      } catch (error) {
        console.error('Error fetching developers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDevelopers();
  }, []);

  const filteredDevelopers = developers.filter((dev) =>
    dev.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (dev.bio && dev.bio.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Explore Developers</h1>
          <div className="max-w-md">
            <label htmlFor="search" className="sr-only">
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className={`h-5 w-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                type="text"
                name="search"
                id="search"
                placeholder="Search developers by name or bio"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`block w-full pl-10 pr-3 py-2 border rounded-md leading-5 ${theme === 'dark' ? 'bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500' : 'border-gray-300 placeholder-gray-500 focus:ring-primary-500 focus:border-primary-500'}`}
              />
            </div>
          </div>
        </div>

        {filteredDevelopers.length === 0 ? (
          <div className={`text-center py-12 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
            <p>No developers found matching your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredDevelopers.map((dev) => (
              <div
                key={dev.$id}
                className={`rounded-lg shadow overflow-hidden ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}
              >
                <div className="p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      {dev.avatarUrl ? (
                        <img
                          className="h-12 w-12 rounded-full"
                          src={dev.avatarUrl}
                          alt={`${dev.name}'s avatar`}
                        />
                      ) : (
                        <div className={`h-12 w-12 rounded-full flex items-center justify-center ${theme === 'dark' ? 'bg-gray-700 text-gray-400' : 'bg-gray-200 text-gray-500'}`}>
                          <svg
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1}
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="ml-4">
                      <h3 className="font-medium">
                        <Link
                          to={`/${dev.username}`}
                          className={`hover:underline ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
                        >
                          {dev.name}
                        </Link>
                      </h3>
                      {dev.bio && (
                        <p className={`mt-1 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                          {dev.bio.length > 60 ? `${dev.bio.substring(0, 60)}...` : dev.bio}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="mt-4">
                    <Link
                      to={`/${dev.username}`}
                      className={`inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ${theme === 'dark' ? 'focus:ring-offset-gray-800' : ''}`}
                    >
                      View Profile
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Explore;