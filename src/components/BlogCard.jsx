import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { format } from 'date-fns';

const BlogCard = ({ blog }) => {
  const { theme } = useTheme();

  return (
    <div className={`p-4 rounded-lg shadow ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'}`}>
      <h3 className="text-lg font-medium">
        <Link
          to={`/blog/${blog.$id}`}
          className={`hover:underline ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
        >
          {blog.title}
        </Link>
      </h3>
      <p className={`mt-1 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
        {blog.content.substring(0, 150)}...
      </p>
      <div className="mt-3 flex justify-between items-center">
        <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
          {format(new Date(blog.$createdAt), 'MMMM d, yyyy')}
        </span>
        <Link
          to={`/blog/${blog.$id}`}
          className={`text-sm font-medium ${theme === 'dark' ? 'text-primary-400 hover:text-primary-300' : 'text-primary-600 hover:text-primary-500'}`}
        >
          Read more
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;