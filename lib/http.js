const axios = require('axios')
const { USER_NAME, USER_URL } = require('./constant')

const getRepoList = async () => {
  // 发送 GET 请求
  const response = await axios.get(USER_URL);
  // 提取仓库名称
  const repoNames = response.data.map(repo => repo.name);
  return repoNames;
}

const getTagList = async (repo) => {
  const TAG_URL = `https://api.github.com/repos/${USER_NAME}/${repo}/tags`;
  const response = await axios.get(TAG_URL);
  return response.data.map(tag => tag.name);
}

module.exports = {
  getRepoList,
  getTagList
}
