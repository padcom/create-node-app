import { Action } from './Action.mjs'
import { print, println, execute } from '../utils.mjs'

export class InitNpmProjectCommand extends Action {
  constructor() {
    super('init-npm-project-command')
  }

  async execute(options) {
    print('Initializing project...')
    await execute('npm init -y')
    println('ok')

    return { npmProjectInitialized: true }
  }
}
