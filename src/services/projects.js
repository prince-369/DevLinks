import { databases, storage, ID } from '../config/appwrite';

export const createProject = async (projectData) => {
  try {
    const response = await databases.createDocument(
      'devlink',
      'projects',
      ID.unique(),
      projectData
    );
    return response;
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
};

export const updateProject = async (projectId, projectData) => {
  try {
    const response = await databases.updateDocument(
      'devlink',
      'projects',
      projectId,
      projectData
    );
    return response;
  } catch (error) {
    console.error('Error updating project:', error);
    throw error;
  }
};

export const deleteProject = async (projectId) => {
  try {
    await databases.deleteDocument('devlink', 'projects', projectId);
  } catch (error) {
    console.error('Error deleting project:', error);
    throw error;
  }
};

export const getProject = async (projectId) => {
  try {
    const response = await databases.getDocument(
      'devlink',
      'projects',
      projectId
    );
    return response;
  } catch (error) {
    console.error('Error getting project:', error);
    throw error;
  }
};

export const getUserProjects = async (userId) => {
  try {
    const response = await databases.listDocuments(
      'devlink',
      'projects',
      [`user_id=${userId}`]
    );
    return response.documents;
  } catch (error) {
    console.error('Error getting user projects:', error);
    throw error;
  }
};