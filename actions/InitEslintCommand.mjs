import { Action } from './Action.mjs'
import { print, println, execute, copyFile, withPackageJson } from '../utils.mjs'

export class InitEslintCommand extends Action {
  constructor() {
    super('run-tests-command')
  }

  async enabled(options) {
    return options.initEslint
  }

  async execute(options) {
    print('Initializing eslint...')
    await execute('npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin')
    await copyFile('.eslintrc.js')
    await withPackageJson(packageJson => {
      packageJson.scripts['lint'] = 'eslint **/*.ts'
      packageJson.scripts['lint:fix'] = 'eslint **/*.ts --fix'
    })
    println('ok')

    return { eslintInitialized: true }
  }
}
