#!/usr/bin/env node

import { Question } from './actions/Question.mjs'
import { FreezeNodeJsVersionWithNvmCommand } from './actions/FreezeNodeJsVersionWithNvmCommand.mjs'
import { InitGitRepositoryCommand } from './actions/InitGitRepositoryCommand.mjs'
import { InitNpmProjectCommand } from './actions/InitNpmProjectCommand.mjs'
import { InitScriptsCommand } from './actions/InitScriptsCommand.mjs'
import { InstallProjectDependenciesCommand } from './actions/InstallProjectDependenciesCommand.mjs'
import { InitTypeScriptCommand } from './actions/InitTypeScriptCommand.mjs'
import { CreateApplicationFilesCommand } from './actions/CreateApplicationFilesCommand.mjs'
import { InitTestsCommand } from './actions/InitTestsCommand.mjs'
import { ShouldCreateExampleTestsQuestion } from './actions/ShouldCreateExampleTestsQuestion.mjs'
import { CreateExampleTestFilesCommand } from './actions/CreateExampleTestFilesCommand.mjs'
import { RunTestsCommand } from './actions/RunTestsCommand.mjs'
import { CreateReadmeCommand } from './actions/CreateReadmeCommand.mjs'
import { SummaryCommand } from './actions/SummaryCommand.mjs'

import { error } from './utils.mjs'

const actions = [
  new Question('freezeNodeJsWithNvm', 'Freeze node.js version in .nvmrc?'),
  new FreezeNodeJsVersionWithNvmCommand(),
  new Question('initGitRepo', 'Initialize Git repository?'),
  new InitGitRepositoryCommand(),
  new Question('useLibFolder', 'Use "lib" folder for sources?'),
  new InitNpmProjectCommand(),
  new InitScriptsCommand(),
  new InstallProjectDependenciesCommand(),
  new InitTypeScriptCommand(),
  new CreateApplicationFilesCommand(),
  new Question('initTests', 'Install Jest support?'),
  new InitTestsCommand(),
  new ShouldCreateExampleTestsQuestion('createExampleTest', 'Create example test?'),
  new CreateExampleTestFilesCommand(),
  new RunTestsCommand(),
  new Question('createReadme', 'Create README.md?'),
  new CreateReadmeCommand(),
  new SummaryCommand(),
]

async function main() {
  let options = {}
  try {
    for (const action of actions)
      if (await action.enabled(options)) {
        const result = await action.execute(options)
        options = { ...options, ...result }
      }
  } catch (e) {
    error(e)
  }
}

main()
