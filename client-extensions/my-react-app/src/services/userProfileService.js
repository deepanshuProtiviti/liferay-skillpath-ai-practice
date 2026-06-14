import fetchLiferay from './liferayApi';

const BASE_URL = '/o/c/spuserprofiles';

export const UserProfileService = {
  /**
   * Get the profile for the current logged-in user
   */
  async getMyProfile() {
    // In a real Liferay environment, we'd filter by user ID
    // For now, we fetch all and find the one matching the current user context
    const data = await fetchLiferay(BASE_URL);
    return data.items[0]; // Simplified for now
  },

  /**
   * Create or update the user profile
   */
  async updateProfile(id, profileData) {
    if (id) {
      return await fetchLiferay(`${BASE_URL}/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(profileData),
      });
    }
    return await fetchLiferay(BASE_URL, {
      method: 'POST',
      body: JSON.stringify(profileData),
    });
  }
};
