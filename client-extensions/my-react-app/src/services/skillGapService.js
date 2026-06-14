import fetchLiferay from './liferayApi';

const BASE_URL = '/o/c/spskills';

export const SkillGapService = {
  async getMySkills() {
    return await fetchLiferay(BASE_URL);
  },

  async updateSkillLevel(id, proficiency) {
    const status = proficiency > 70 ? 'strong' : proficiency > 40 ? 'medium' : 'low';
    return await fetchLiferay(`${BASE_URL}/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ currentLevel: proficiency, status }),
    });
  }
};
