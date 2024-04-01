import axios from 'axios';

const getContributors = async (page: number) => {
  try {
    const result = await axios.get(`https://api.github.com/repos/angular/angular/contributors?page=${page}&per_page=25`);
    return result.data;
  } catch (error) {
    console.error('Failed to fetch contributors:', error);
    return [];
  }
};

export { getContributors };