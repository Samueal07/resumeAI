// utils/fetchData.js
const axios = require("axios");

const fetchCodeChefData = async (username) => {
  const response = await axios.get(
    `https://www.codechef.com/users/${username}`
  );
  return response.data;
};

const fetchHackerRankData = async (username) => {
  const response = await axios.get(`https://www.hackerrank.com/${username}`);
  return response.data;
};

const fetchGitHubData = async (username) => {
  const response = await axios.get(`https://api.github.com/users/${username}`);
  return response.data;
};

const fetchLinkedInData = async (username) => {
  const response = await axios.get(`https://www.linkedin.com/in/${username}`);
  return response.data;
};

module.exports = {
  fetchCodeChefData,
  fetchHackerRankData,
  fetchGitHubData,
  fetchLinkedInData,
};
