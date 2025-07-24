import { Client, Account, Databases, Storage, ID } from 'appwrite';

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
  .setProject('YOUR_PROJECT_ID'); // Your project ID

const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);

const databaseId = 'devlink';
const userCollectionId = 'users';
const projectsCollectionId = 'projects';
const blogsCollectionId = 'blogs';
const bucketId = 'files';

export {
  client,
  account,
  databases,
  storage,
  ID,
  databaseId,
  userCollectionId,
  projectsCollectionId,
  blogsCollectionId,
  bucketId
};