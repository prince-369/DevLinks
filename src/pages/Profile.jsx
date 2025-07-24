import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { databases, storage } from '../config/appwrite';
import { ID } from 'appwrite';

const Profile = () => {
  const { user } = useAuth();
  const { theme } = useTheme();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    website: '',
    github: '',
    twitter: '',
    linkedin: '',
  });
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await databases.listDocuments(
          'devlink',
          'users',
          [`user_id=${user.$id}`]
        );
        
        if (response.documents.length > 0) {
          setProfile(response.documents[0]);
          setFormData({
            name: response.documents[0].name,
            bio: response.documents[0].bio || '',
            website: response.documents[0].website || '',
            github: response.documents[0].github || '',
            twitter: response.documents[0].twitter || '',
            linkedin: response.documents[0].linkedin || '',
          });
          
          if (response.documents[0].avatar_id) {
            const avatarUrl = storage.getFilePreview(
              'files',
              response.documents[0].avatar_id
            );
            setPreviewImage(avatarUrl);
          }
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let avatarId = profile?.avatar_id || null;
      
      // Upload new image if selected
      if (profileImage) {
        const fileId = ID.unique();
        await storage.createFile('files', fileId, profileImage);
        avatarId = fileId;
        
        // Delete old image if exists
        if (profile?.avatar_id) {
          await storage.deleteFile('files', profile.avatar_id);
        }
      }
      
      // Update or create profile
      const profileData = {
        user_id: user.$id,
        name: formData.name,
        username: user.name.toLowerCase().replace(/\s+/g, '-'),
        bio: formData.bio,
        website: formData.website,
        github: formData.github,
        twitter: formData.twitter,
        linkedin: formData.linkedin,
        avatar_id: avatarId,
      };
      
      if (profile) {
        // Update existing profile
        const response = await databases.updateDocument(
          'devlink',
          'users',
          profile.$id,
          profileData
        );
        setProfile(response);
      } else {
        // Create new profile
        const response = await databases.createDocument(
          'devlink',
          'users',
          ID.unique(),
          profileData
        );
        setProfile(response);
      }
      
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`p-6 rounded-lg shadow ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Your Profile</h1>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`px-3 py-1 rounded-md text-sm font-medium ${theme === 'dark' ? 'bg-primary-600 hover:bg-primary-700 text-white' : 'bg-primary-100 hover:bg-primary-200 text-primary-800'}`}
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>

          {isEditing ? (
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className="relative h-24 w-24 rounded-full overflow-hidden">
                      {previewImage ? (
                        <img
                          src={previewImage}
                          alt="Profile preview"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className={`h-full w-full flex items-center justify-center ${theme === 'dark' ? 'bg-gray-700 text-gray-400' : 'bg-gray-200 text-gray-500'}`}>
                          <svg
                            className="h-12 w-12"
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
                    </div>
                    <label
                      htmlFor="profile-image"
                      className={`mt-2 block text-center text-sm font-medium ${theme === 'dark' ? 'text-primary-400 hover:text-primary-300' : 'text-primary-600 hover:text-primary-500'} cursor-pointer`}
                    >
                      Change
                    </label>
                    <input
                      id="profile-image"
                      name="profile-image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="sr-only"
                    />
                  </div>
                  <div className="flex-grow">
                    <div>
                      <label
                        htmlFor="name"
                        className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`mt-1 block w-full rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="bio"
                    className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}
                  >
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    rows={3}
                    value={formData.bio}
                    onChange={handleInputChange}
                    className={`mt-1 block w-full rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`}
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="website"
                      className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}
                    >
                      Website
                    </label>
                    <input
                      type="url"
                      name="website"
                      id="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      className={`mt-1 block w-full rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="github"
                      className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}
                    >
                      GitHub
                    </label>
                    <input
                      type="url"
                      name="github"
                      id="github"
                      value={formData.github}
                      onChange={handleInputChange}
                      className={`mt-1 block w-full rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="twitter"
                      className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}
                    >
                      Twitter
                    </label>
                    <input
                      type="url"
                      name="twitter"
                      id="twitter"
                      value={formData.twitter}
                      onChange={handleInputChange}
                      className={`mt-1 block w-full rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="linkedin"
                      className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}
                    >
                      LinkedIn
                    </label>
                    <input
                      type="url"
                      name="linkedin"
                      id="linkedin"
                      value={formData.linkedin}
                      onChange={handleInputChange}
                      className={`mt-1 block w-full rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`}
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className={`px-4 py-2 border rounded-md shadow-sm text-sm font-medium ${theme === 'dark' ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ${theme === 'dark' ? 'focus:ring-offset-gray-800' : ''}`}
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                  <div className="relative h-24 w-24 rounded-full overflow-hidden">
                    {previewImage ? (
                      <img
                        src={previewImage}
                        alt="Profile"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className={`h-full w-full flex items-center justify-center ${theme === 'dark' ? 'bg-gray-700 text-gray-400' : 'bg-gray-200 text-gray-500'}`}>
                        <svg
                          className="h-12 w-12"
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
                  </div>
                </div>
                <div className="flex-grow">
                  <h2 className="text-xl font-bold">{profile?.name || user.name}</h2>
                  {profile?.bio && (
                    <p className={`mt-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                      {profile.bio}
                    </p>
                  )}
                </div>
              </div>

              {(profile?.website || profile?.github || profile?.twitter || profile?.linkedin) && (
                <div>
                  <h3 className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    Links
                  </h3>
                  <div className="mt-2 flex flex-wrap gap-3">
                    {profile.website && (
                      <a
                        href={profile.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${theme === 'dark' ? 'bg-gray-700 text-primary-400 hover:bg-gray-600' : 'bg-gray-100 text-primary-800 hover:bg-gray-200'}`}
                      >
                        Website
                      </a>
                    )}
                    {profile.github && (
                      <a
                        href={profile.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${theme === 'dark' ? 'bg-gray-700 text-primary-400 hover:bg-gray-600' : 'bg-gray-100 text-primary-800 hover:bg-gray-200'}`}
                      >
                        GitHub
                      </a>
                    )}
                    {profile.twitter && (
                      <a
                        href={profile.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${theme === 'dark' ? 'bg-gray-700 text-primary-400 hover:bg-gray-600' : 'bg-gray-100 text-primary-800 hover:bg-gray-200'}`}
                      >
                        Twitter
                      </a>
                    )}
                    {profile.linkedin && (
                      <a
                        href={profile.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${theme === 'dark' ? 'bg-gray-700 text-primary-400 hover:bg-gray-600' : 'bg-gray-100 text-primary-800 hover:bg-gray-200'}`}
                      >
                        LinkedIn
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;