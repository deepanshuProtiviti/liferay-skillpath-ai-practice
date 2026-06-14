/**
 * Base utility for Liferay Headless API calls
 */
const LiferayParams = {
  authToken: window.Liferay?.authToken || '',
  groupId: window.Liferay?.ThemeDisplay?.getScopeGroupId() || '',
};

const fetchLiferay = async (url, options = {}) => {
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': LiferayParams.authToken,
    },
    ...options,
  };

  try {
    const response = await fetch(url, defaultOptions);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Liferay API error: ${response.status}`);
    }
    if (response.status === 204) return null;
    return await response.json();
  } catch (error) {
    console.error('Liferay API Fetch Error:', error);
    throw error;
  }
};

export default fetchLiferay;
export { LiferayParams };
