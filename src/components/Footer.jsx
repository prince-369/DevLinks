import { useTheme } from '../contexts/ThemeContext';

const Footer = () => {
  const { theme } = useTheme();

  return (
    <footer className={`py-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
      <div className="container mx-auto px-4 text-center">
        <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          © {new Date().getFullYear()} DevLink. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;