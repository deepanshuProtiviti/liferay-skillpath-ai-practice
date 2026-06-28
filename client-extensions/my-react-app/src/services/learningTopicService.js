import fetchLiferay from './liferayApi';

const BASE_URL = '/o/c/splearningtopics';

export const LearningTopicService = {
  /**
   * Get learning topics for a specific step
   * @param {string} stepId - The ID of the SPLearningPathStep
   */
  async getTopicsByStep(stepId) {
    // Filter by stepId if provided, otherwise fetch all
    const url = stepId 
      ? `${BASE_URL}?filter=stepId eq '${stepId}'&sort=order:asc`
      : `${BASE_URL}?sort=order:asc`;
    return await fetchLiferay(url);
  },

  async createTopic(topicData) {
    return await fetchLiferay(BASE_URL, {
      method: 'POST',
      body: JSON.stringify(topicData),
    });
  }
};
