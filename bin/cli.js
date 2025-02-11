#!/usr/bin/env node
// console.log('Hello Cli!');

const { program } = require('commander')
const chalk = require('chalk')

program
  // .option('-d, --debug', 'output extra debugging')
  .command('create <projectName> [template]')
  .description('create a new project')
  .option('-f, --force', 'Overwrite target directory if it exists')
  .option('-d, --debug', 'output extra debugging')
  .action(async (projectName, template, options) => {
    console.log(
      'create project====>', chalk.green(projectName),
      'create template====>', chalk.green(template),
      'create options====>', options
    )

    // 准备创建项目
    require('../lib/create')(projectName, template, options)
  })



program.parse(process.argv)


