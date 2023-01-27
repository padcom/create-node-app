import { Action } from './Action.mjs'
import { print, println, copyFile, execute, mkdir } from '../utils.mjs'

export class CreateVSCodeFilesCommand extends Action {
  constructor() {
    super('create-application-files-command')
  }

  async execute(options) {
    print('Creating .vscode/extensions.json...')
    await mkdir('.vscode')
    await copyFile('extensions.json', '.vscode/extensions.json')
    println('ok')

    return { vscodeFilesInitialized: true }
  }
}
