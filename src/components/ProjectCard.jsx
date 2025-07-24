import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

const ProjectCard = ({ project }) => {
  const { theme } = useTheme();

  return (
    <div className={`p-4 rounded-lg shadow ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'}`}>
      <h3 className="text-lg font-medium">
        <Link
          to={`/projects/${project.$id}`}
          className={`hover:underline ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
        >
          {project.title}
        </Link>
      </h3>
      <p className={`mt-1 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
        {project.description.substring(0, 150)}...
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {project.tech_stack.split(',').map((tech, index) => (
          <span
            key={index}
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${theme === 'dark' ? 'bg-gray-700 text-primary-400' : 'bg-primary-100 text-primary-800'}`}
          >
            {tech.trim()}
          </span>
        ))}
      </div>
      <div className="mt-4 flex space-x-3">
        {project.github_url && (
          <a
            href={project.github_url}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center text-sm font-medium ${theme === 'dark' ? 'text-primary-400 hover:text-primary-300' : 'text-primary-600 hover:text-primary-500'}`}
          >
            GitHub
          </a>
        )}
        {project.live_url && (
          <a
            href={project.live_url}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center text-sm font-medium ${theme === 'dark' ? 'text-primary-400 hover:text-primary-300' : 'text-primary-600 hover:text-primary-500'}`}
          >
            Live Demo
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;