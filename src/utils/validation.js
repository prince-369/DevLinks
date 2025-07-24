export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 6;
};

export const validateName = (name) => {
  return name.trim().length >= 2;
};

export const validateProject = (project) => {
  const { title, description, tech_stack } = project;
  return (
    title.trim().length >= 3 &&
    description.trim().length >= 10 &&
    tech_stack.trim().length >= 2
  );
};

export const validateBlog = (blog) => {
  const { title, content } = blog;
  return title.trim().length >= 3 && content.trim().length >= 50;
};