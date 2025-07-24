import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { databases, storage } from '../config/appwrite';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark, prism } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { format } from 'date-fns';

const BlogPost = () => {
  const { blogId } = useParams();
  const { theme } = useTheme();
  const [blog, setBlog] = useState(null);
  const [author, setAuthor] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        // Fetch the blog post
        const blogResponse = await databases.getDocument(
          'devlink',
          'blogs',
          blogId
        );
        setBlog(blogResponse);
        
        // Fetch the author's information
        const authorResponse = await databases.listDocuments(
          'devlink',
          'users',
          [`user_id=${blogResponse.user_id}`]
        );
        
        if (authorResponse.documents.length > 0) {
          const authorData = authorResponse.documents[0];
          setAuthor(authorData);
          
          // Get author's avatar if exists
          if (authorData.avatar_id) {
            const url = storage.getFilePreview('files', authorData.avatar_id);
            setAvatarUrl(url);
          }
        }
      } catch (error) {
        console.error('Error fetching blog data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchBlogData();
  }, [blogId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="py-12 text-center">
        <h1 className="text-2xl font-bold">Blog post not found</h1>
        <p className={`mt-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          The blog post you're looking for doesn't exist or has been removed.
        </p>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`p-6 rounded-lg shadow ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} mb-8`}>
          <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
          
          {author && (
            <div className="flex items-center space-x-3 mb-6">
              {avatarUrl ? (
                <img
                  className="h-10 w-10 rounded-full"
                  src={avatarUrl}
                  alt={`${author.name}'s avatar`}
                />
              ) : (
                <div className={`h-10 w-10 rounded-full flex items-center justify-center ${theme === 'dark' ? 'bg-gray-700 text-gray-400' : 'bg-gray-200 text-gray-500'}`}>
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
              <div>
                <Link
                  to={`/${author.username}`}
                  className={`font-medium hover:underline ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
                >
                  {author.name}
                </Link>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  {format(new Date(blog.$createdAt), 'MMMM d, yyyy')}
                </p>
              </div>
            </div>
          )}
          
          <div className={`prose max-w-none ${theme === 'dark' ? 'prose-invert' : ''}`}>
            <ReactMarkdown
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '');
                  return !inline && match ? (
                    <SyntaxHighlighter
                      style={theme === 'dark' ? atomDark : prism}
                      language={match[1]}
                      PreTag="div"
                      {...props}
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
              }}
            >
              {blog.content}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;