import fetchLiferay from './liferayApi';

const BASE_URL = '/o/c/spmocktests';

export const MockTestService = {
  async getTestHistory() {
    return await fetchLiferay(`${BASE_URL}?sort=dateCreated:desc`);
  },

  async recordTestResult(testData) {
    return await fetchLiferay(BASE_URL, {
      method: 'POST',
      body: JSON.stringify(testData),
    });
  }
};
