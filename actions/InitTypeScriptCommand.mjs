import { Action } from './Action.mjs'
import { print, println, execute } from '../utils.mjs'

export class InitTypeScriptCommand extends Action {
  constructor() {
    super('init-typescript-command')
  }

  async execute(options) {
    print('Initializing TypeScript...')
    await execute('npx tsc --init')
    println('ok')

    return { typeScriptInitialized: true }
  }
}
