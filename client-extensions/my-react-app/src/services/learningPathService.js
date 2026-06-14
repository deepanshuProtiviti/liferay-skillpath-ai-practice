import fetchLiferay from './liferayApi';

const BASE_URL = '/o/c/splearningpathsteps';

export const LearningPathService = {
  async getMySteps() {
    return await fetchLiferay(`${BASE_URL}?sort=priority:asc`);
  },

  async createStep(stepData) {
    return await fetchLiferay(BASE_URL, {
      method: 'POST',
      body: JSON.stringify(stepData),
    });
  },

  async updateStep(id, stepData) {
    return await fetchLiferay(`${BASE_URL}/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(stepData),
    });
  },

  async deleteStepsForUser() {
    // Logic to clear old roadmap steps before generating new ones
  }
};
