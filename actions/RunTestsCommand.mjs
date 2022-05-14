import { Action } from './Action.mjs'
import { print, println, execute } from '../utils.mjs'

export class RunTestsCommand extends Action {
  constructor() {
    super('run-tests-command')
  }

  async enabled(options) {
    return options.exampleTestsCreated
  }

  async execute(options) {
    print('Running tests...')
    await execute('npm test')
    println('ok')

    return { testsExecuted: true }
  }
}
