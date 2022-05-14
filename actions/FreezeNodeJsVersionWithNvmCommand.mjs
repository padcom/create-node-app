import { Action } from './Action.mjs'
import { print, println, writeFile, execute } from '../utils.mjs'

export class FreezeNodeJsVersionWithNvmCommand extends Action {
  constructor() {
    super('freeze-nodejs-version-with-nvm-command')
  }

  async enabled(options) {
    return options.freezeNodeJsWithNvm
  }

  async execute(options) {
    print('Freezing node.js version in .nvmrc...')
    await writeFile('.nvmrc', await execute('node --version'))
    println('ok')

    return { nodeJsVersionFroozen: true }
  }
}
