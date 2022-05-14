import { Action } from './Action.mjs'
import { print, println, withPackageJson, execute } from '../utils.mjs'

export class InitTestsCommand extends Action {
  constructor() {
    super('init-tests-command')
  }

  async enabled(options) {
    return options.initTests
  }

  async execute(options) {
    print('Installing test dependencies...')
    await execute('npm install --save-dev jest @types/jest ts-jest')
    println('ok')

    print('Initializint test subsystem (Jest)...')
    await execute('npx ts-jest config:init')
    await withPackageJson(packageJson => {
      packageJson.scripts['test'] = 'jest --coverage'
      packageJson.scripts['test:watch'] = 'jest --watch --coverage'
    })
    println('ok')

    return { testsInitialized: true }
  }
}
