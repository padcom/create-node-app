import { Action } from './Action.mjs'
import { print, println, copyFile, execute } from '../utils.mjs'

export class InitGitRepositoryCommand extends Action {
  constructor() {
    super('init-git-repository-command')
  }

  async enabled(options) {
    return options.initGitRepo
  }

  async execute(options) {
    print('Initializing git repository...')
    await execute('git init .')
    await copyFile('gitignore', '.gitignore')
    println('ok')

    return { gitRepoInitialized: true }
  }
}
