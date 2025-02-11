const { getRepoList, getTagList } = require('./http')
const { withWrapLoading } = require('./utils')
const inquirer = require('inquirer')
const { USER_NAME } = require('./constant')
const downloadGitRepo = require('download-git-repo')
const util = require('util')
const chalk = require('chalk')

class Generator {
  constructor(projectName, template, targetDir) {
    this.projectName = projectName;
    this.template = template;
    this.targetDir = targetDir;
    this.downloadGitRepo = util.promisify(downloadGitRepo);
  }

  async create() {
    console.log('creating...')
    const repo = await this.getRepo()

    const tag = await this.getTag(repo)

    await this.download(repo, tag)
  }

  async getRepo() {
    console.log('getRepo...')
    const repoList = await withWrapLoading(getRepoList, 'waiting fetch template...')
    // console.log('repoList====>', repoList)

    if (this.template) {
      if (repoList.includes(this.template)) {
        return this.template
      }
      console.log(chalk.red('template not found, please reSelect'))
    }

    if (!repoList || repoList.length === 0) {
      return
    }

    const { repo } = await inquirer.prompt([
      {
        name: 'repo',
        type: 'list',
        message: 'Please choose a template to create project',
        choices: repoList
      }
    ])

    console.log('repo====>', repo)

    return repo
  }

  async getTag(repo) {
    console.log('getTag...')
    const tagList = await withWrapLoading(getTagList, 'waiting fetch tag...', repo)
    // console.log('tagList====>', tagList)

    if (!tagList || tagList.length === 0) {
      return
    }

    console.log('tag====>', tagList[0])

    return tagList[0]
  }

  async download(repo, tag) {
    console.log('download...')

    const downloadUrl = `${USER_NAME}/${repo}${tag ? `#${tag}` : ''}`
    console.log('downloadUrl====>', downloadUrl)

    await withWrapLoading(
      this.downloadGitRepo,
      'waiting download template...',
      downloadUrl,
      this.targetDir
    )

    console.log(chalk.green('download success'))
  }
}


module.exports = Generator
