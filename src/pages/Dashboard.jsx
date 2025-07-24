import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { databases, storage } from '../config/appwrite';
import { ID } from 'appwrite';

const Dashboard = () => {
  const { user } = useAuth();
  const { theme } = useTheme();
  const [projects, setProjects] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch projects
        const projectsResponse = await databases.listDocuments(
          'devlink',
          'projects',
          [`user_id=${user.$id}`]
        );
        setProjects(projectsResponse.documents);

        // Fetch blogs
        const blogsResponse = await databases.listDocuments(
          'devlink',
          'blogs',
          [`user_id=${user.$id}`]
        );
        setBlogs(blogsResponse.documents);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

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
          <h1 className="text-3xl font-bold mb-4">Welcome, {user.name}</h1>
          <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            Manage your portfolio and blog posts from here.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className={`p-6 rounded-lg shadow ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Your Projects</h2>
              <Link
                to="/projects/new"
                className={`px-3 py-1 rounded-md text-sm font-medium ${theme === 'dark' ? 'bg-primary-600 hover:bg-primary-700 text-white' : 'bg-primary-100 hover:bg-primary-200 text-primary-800'}`}
              >
                Add Project
              </Link>
            </div>

            {projects.length === 0 ? (
              <div className={`text-center py-8 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                <p>You haven't added any projects yet.</p>
                <Link
                  to="/projects/new"
                  className={`mt-2 inline-block text-sm font-medium ${theme === 'dark' ? 'text-primary-400 hover:text-primary-300' : 'text-primary-600 hover:text-primary-500'}`}
                >
                  Add your first project
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {projects.map((project) => (
                  <div
                    key={project.$id}
                    className={`p-4 rounded-md ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'}`}
                  >
                    <h3 className="font-medium">{project.title}</h3>
                    <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                      {project.description.substring(0, 100)}...
                    </p>
                    <div className="mt-2 flex justify-between items-center">
                      <span className={`text-xs px-2 py-1 rounded ${theme === 'dark' ? 'bg-gray-600 text-gray-200' : 'bg-gray-200 text-gray-700'}`}>
                        {project.tech_stack}
                      </span>
                      <Link
                        to={`/projects/${project.$id}`}
                        className={`text-sm ${theme === 'dark' ? 'text-primary-400 hover:text-primary-300' : 'text-primary-600 hover:text-primary-500'}`}
                      >
                        View
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className={`p-6 rounded-lg shadow ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Your Blog Posts</h2>
              <Link
                to="/blogs/new"
                className={`px-3 py-1 rounded-md text-sm font-medium ${theme === 'dark' ? 'bg-primary-600 hover:bg-primary-700 text-white' : 'bg-primary-100 hover:bg-primary-200 text-primary-800'}`}
              >
                Add Blog Post
              </Link>
            </div>

            {blogs.length === 0 ? (
              <div className={`text-center py-8 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                <p>You haven't written any blog posts yet.</p>
                <Link
                  to="/blogs/new"
                  className={`mt-2 inline-block text-sm font-medium ${theme === 'dark' ? 'text-primary-400 hover:text-primary-300' : 'text-primary-600 hover:text-primary-500'}`}
                >
                  Write your first blog post
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {blogs.map((blog) => (
                  <div
                    key={blog.$id}
                    className={`p-4 rounded-md ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'}`}
                  >
                    <h3 className="font-medium">{blog.title}</h3>
                    <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                      {blog.content.substring(0, 100)}...
                    </p>
                    <div className="mt-2 flex justify-between items-center">
                      <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                        {new Date(blog.$createdAt).toLocaleDateString()}
                      </span>
                      <Link
                        to={`/blogs/${blog.$id}`}
                        className={`text-sm ${theme === 'dark' ? 'text-primary-400 hover:text-primary-300' : 'text-primary-600 hover:text-primary-500'}`}
                      >
                        View
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;