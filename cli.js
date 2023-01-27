#!/usr/bin/env node

import { WelcomeMessageCommand } from './actions/WelcomeMessageCommand.mjs'
import { Question } from './actions/Question.mjs'
import { InitGitRepositoryCommand } from './actions/InitGitRepositoryCommand.mjs'
import { InitNpmProjectCommand } from './actions/InitNpmProjectCommand.mjs'
import { InitScriptsCommand } from './actions/InitScriptsCommand.mjs'
import { InstallProjectDependenciesCommand } from './actions/InstallProjectDependenciesCommand.mjs'
import { InitTypeScriptCommand } from './actions/InitTypeScriptCommand.mjs'
import { CreateApplicationFilesCommand } from './actions/CreateApplicationFilesCommand.mjs'
import { CreateVSCodeFilesCommand } from './actions/CreateVSCodeFilesCommand.mjs'
import { InitEslintCommand } from './actions/InitEslintCommand.mjs'
import { InitTestsCommand } from './actions/InitTestsCommand.mjs'
import { ShouldCreateExampleTestsQuestion } from './actions/ShouldCreateExampleTestsQuestion.mjs'
import { CreateExampleTestFilesCommand } from './actions/CreateExampleTestFilesCommand.mjs'
import { RunTestsCommand } from './actions/RunTestsCommand.mjs'
import { FreezeNodeJsVersionWithNvmCommand } from './actions/FreezeNodeJsVersionWithNvmCommand.mjs'
import { CreateReadmeCommand } from './actions/CreateReadmeCommand.mjs'
import { SummaryCommand } from './actions/SummaryCommand.mjs'
import { OpenVSCodeCommand } from './actions/OpenVSCodeCommand.mjs'

import { error, flushStdin } from './utils.mjs'
import chalk from 'chalk'

const actions = [
  new WelcomeMessageCommand(),
  new Question('initGitRepo', `Would you like to initialize ${chalk.yellow('git')} repository in current folder?`),
  new InitGitRepositoryCommand(),
  new Question('useLibFolder', `Would you like to use ${chalk.yellow('lib')} folder for sources?`),
  new InitNpmProjectCommand(),
  new InitScriptsCommand(),
  new InstallProjectDependenciesCommand(),
  new InitTypeScriptCommand(),
  new CreateApplicationFilesCommand(),
  new CreateVSCodeFilesCommand(),
  new Question('initEslint', `Would you like to install linting support using ${chalk.yellow('eslint')}?`),
  new InitEslintCommand(),
  new Question('initTests', `Would you like to install testing support using ${chalk.yellow('jest')}?`),
  new InitTestsCommand(),
  new ShouldCreateExampleTestsQuestion('createExampleTest', 'Would you like me to create an example test for you?'),
  new CreateExampleTestFilesCommand(),
  new RunTestsCommand(),
  new Question('freezeNodeJsWithNvm', `Would you like to store current node.js version in ${chalk.yellow('.nvmrc')}?`),
  new FreezeNodeJsVersionWithNvmCommand(),
  new Question('createReadme', `How about a ${chalk.yellow('README.md')}?`),
  new CreateReadmeCommand(),
  new SummaryCommand(),
  new Question('openVSCode', `Would you like to open ${chalk.yellow('vscode')} in this folder now?`),
  new OpenVSCodeCommand(),
]

async function main() {
  let options = {}
  try {
    for (const action of actions)
      if (await action.enabled(options)) {
        await flushStdin()
        const result = await action.execute(options)
        options = { ...options, ...result }
      }
  } catch (e) {
    error(e)
  }
}

main()
