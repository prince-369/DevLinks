import { databases, storage, ID } from '../config/appwrite';

export const createUserProfile = async (userData) => {
  try {
    const response = await databases.createDocument(
      'devlink',
      'users',
      ID.unique(),
      userData
    );
    return response;
  } catch (error) {
    console.error('Error creating user profile:', error);
    throw error;
  }
};

export const updateUserProfile = async (userId, userData) => {
  try {
    const response = await databases.updateDocument(
      'devlink',
      'users',
      userId,
      userData
    );
    return response;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

export const getUserProfile = async (userId) => {
  try {
    const response = await databases.listDocuments(
      'devlink',
      'users',
      [`user_id=${userId}`]
    );
    return response.documents[0] || null;
  } catch (error) {
    console.error('Error getting user profile:', error);
    throw error;
  }
};

export const getUserByUsername = async (username) => {
  try {
    const response = await databases.listDocuments(
      'devlink',
      'users',
      [`username=${username}`]
    );
    return response.documents[0] || null;
  } catch (error) {
    console.error('Error getting user by username:', error);
    throw error;
  }
};

export const uploadAvatar = async (file) => {
  try {
    const fileId = ID.unique();
    const response = await storage.createFile('files', fileId, file);
    return response.$id;
  } catch (error) {
    console.error('Error uploading avatar:', error);
    throw error;
  }
};

export const deleteAvatar = async (fileId) => {
  try {
    await storage.deleteFile('files', fileId);
  } catch (error) {
    console.error('Error deleting avatar:', error);
    throw error;
  }
};