const chalk = require('chalk')
const fs = require('fs')
const path = require('path')
const inquirer = require('inquirer')

module.exports = async function createProject(projectName, template, options) {
  const cwd = process.cwd()
  const targetDir = path.join(cwd, projectName)
  console.log('targetDir====>', targetDir)

  if (fs.existsSync(targetDir)) {
    if (options.force) {
      fs.rmSync(targetDir, { recursive: true, force: true })
    } else {
      // 询问是否覆盖
      const answers = await inquirer.prompt([
        {
          name: 'overwrite',
          type: 'confirm',
          message: `Target directory ${targetDir} already exists. Remove it?`
        }
      ])

      // console.log('answers====>', answers)
      if (!answers.overwrite) {
        return
      }

      console.log(`Removing ${targetDir}...`)
      fs.rmSync(targetDir, { recursive: true, force: true })
    }
  }

  // 下载模板
  console.log(`Creating project in ${targetDir}...`)
  const Generator = require('../lib/generator')
  const generator = new Generator(projectName, template, targetDir)

  generator.create()
}
