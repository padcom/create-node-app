import { Action } from './Action.mjs'
import { print, println, withPackageJson } from '../utils.mjs'

export class InitScriptsCommand extends Action {
  constructor() {
    super('init-scripts-command')
  }

  async execute(options) {
    print('Adding start and build scripts...')
    await withPackageJson(packageJson => {
      packageJson.version = '0.0.0'
      packageJson.main = 'start.ts'
      packageJson.scripts['start'] = 'ts-node start.ts'
    })
    println('ok')

    return { scriptsInitialized: true }
  }
}
