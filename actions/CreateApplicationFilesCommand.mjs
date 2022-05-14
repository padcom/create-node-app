import { Action } from './Action.mjs'
import { print, println, copyFile, execute, mkdir } from '../utils.mjs'

export class CreateApplicationFilesCommand extends Action {
  constructor() {
    super('create-application-files-command')
  }

  async execute(options) {
    print('Creating main.ts...')
    if (options.useLibFolder) {
      await mkdir('lib')
      await copyFile('start-with-lib.ts', 'start.ts')
      await copyFile('main.ts', `${options.useLibFolder ? 'lib/' : ''}main.ts`)
    } else {
      await copyFile('start-without-lib.ts', 'start.ts')
    }
    await execute('chmod +x start.ts')
    println('ok')

    return { applicationFilesInitialized: true }
  }
}
