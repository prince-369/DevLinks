import { databases, ID } from '../config/appwrite';

export const createBlog = async (blogData) => {
  try {
    const response = await databases.createDocument(
      'devlink',
      'blogs',
      ID.unique(),
      blogData
    );
    return response;
  } catch (error) {
    console.error('Error creating blog:', error);
    throw error;
  }
};

export const updateBlog = async (blogId, blogData) => {
  try {
    const response = await databases.updateDocument(
      'devlink',
      'blogs',
      blogId,
      blogData
    );
    return response;
  } catch (error) {
    console.error('Error updating blog:', error);
    throw error;
  }
};

export const deleteBlog = async (blogId) => {
  try {
    await databases.deleteDocument('devlink', 'blogs', blogId);
  } catch (error) {
    console.error('Error deleting blog:', error);
    throw error;
  }
};

export const getBlog = async (blogId) => {
  try {
    const response = await databases.getDocument(
      'devlink',
      'blogs',
      blogId
    );
    return response;
  } catch (error) {
    console.error('Error getting blog:', error);
    throw error;
  }
};

export const getUserBlogs = async (userId) => {
  try {
    const response = await databases.listDocuments(
      'devlink',
      'blogs',
      [`user_id=${userId}`]
    );
    return response.documents;
  } catch (error) {
    console.error('Error getting user blogs:', error);
    throw error;
  }
};