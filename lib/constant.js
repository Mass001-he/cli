// GitHub 用户名
const USER_NAME = 'wwog'
// GitHub 组织名称
const ORG_NAME = 'organization-name';

// GitHub API URL
const USER_URL = `https://api.github.com/users/${USER_NAME}/repos`;
const ORG_URL = `https://api.github.com/orgs/${ORG_NAME}/repos`;

module.exports = {
  USER_NAME,
  ORG_NAME,
  ORG_URL,
  USER_URL
}
