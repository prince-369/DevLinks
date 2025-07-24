import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { databases, storage } from '../config/appwrite';
import ProjectCard from '../components/ProjectCard';
import BlogCard from '../components/BlogCard';

const UserProfile = () => {
  const { username } = useParams();
  const { theme } = useTheme();
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [avatarUrl, setAvatarUrl] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user by username
        const usersResponse = await databases.listDocuments(
          'devlink',
          'users',
          [`username=${username}`]
        );
        
        if (usersResponse.documents.length === 0) {
          throw new Error('User not found');
        }
        
        const userData = usersResponse.documents[0];
        setUser(userData);
        
        // Get avatar URL if exists
        if (userData.avatar_id) {
          const url = storage.getFilePreview('files', userData.avatar_id);
          setAvatarUrl(url);
        }
        
        // Fetch user's projects
        const projectsResponse = await databases.listDocuments(
          'devlink',
          'projects',
          [`user_id=${userData.user_id}`]
        );
        setProjects(projectsResponse.documents);
        
        // Fetch user's blogs
        const blogsResponse = await databases.listDocuments(
          'devlink',
          'blogs',
          [`user_id=${userData.user_id}`]
        );
        setBlogs(blogsResponse.documents);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [username]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="py-12 text-center">
        <h1 className="text-2xl font-bold">User not found</h1>
        <p className={`mt-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          The developer you're looking for doesn't exist or has been removed.
        </p>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`p-6 rounded-lg shadow ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} mb-8`}>
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-6">
            <div className="flex-shrink-0">
              {avatarUrl ? (
                <img
                  className="h-24 w-24 rounded-full"
                  src={avatarUrl}
                  alt={`${user.name}'s avatar`}
                />
              ) : (
                <div className={`h-24 w-24 rounded-full flex items-center justify-center ${theme === 'dark' ? 'bg-gray-700 text-gray-400' : 'bg-gray-200 text-gray-500'}`}>
                  <svg
                    className="h-12 w-12"
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
            <div className="flex-grow">
              <h1 className="text-2xl font-bold">{user.name}</h1>
              {user.bio && (
                <p className={`mt-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  {user.bio}
                </p>
              )}
              <div className="mt-4 flex flex-wrap gap-3">
                {user.website && (
                  <a
                    href={user.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${theme === 'dark' ? 'bg-gray-700 text-primary-400 hover:bg-gray-600' : 'bg-gray-100 text-primary-800 hover:bg-gray-200'}`}
                  >
                    Website
                  </a>
                )}
                {user.github && (
                  <a
                    href={user.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${theme === 'dark' ? 'bg-gray-700 text-primary-400 hover:bg-gray-600' : 'bg-gray-100 text-primary-800 hover:bg-gray-200'}`}
                  >
                    GitHub
                  </a>
                )}
                {user.twitter && (
                  <a
                    href={user.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${theme === 'dark' ? 'bg-gray-700 text-primary-400 hover:bg-gray-600' : 'bg-gray-100 text-primary-800 hover:bg-gray-200'}`}
                  >
                    Twitter
                  </a>
                )}
                {user.linkedin && (
                  <a
                    href={user.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${theme === 'dark' ? 'bg-gray-700 text-primary-400 hover:bg-gray-600' : 'bg-gray-100 text-primary-800 hover:bg-gray-200'}`}
                  >
                    LinkedIn
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Projects ({projects.length})</h2>
            {projects.length === 0 ? (
              <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800 text-gray-400' : 'bg-gray-50 text-gray-500'}`}>
                No projects to display.
              </div>
            ) : (
              <div className="space-y-4">
                {projects.map((project) => (
                  <ProjectCard key={project.$id} project={project} />
                ))}
              </div>
            )}
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Blog Posts ({blogs.length})</h2>
            {blogs.length === 0 ? (
              <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800 text-gray-400' : 'bg-gray-50 text-gray-500'}`}>
                No blog posts to display.
              </div>
            ) : (
              <div className="space-y-4">
                {blogs.map((blog) => (
                  <BlogCard key={blog.$id} blog={blog} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;