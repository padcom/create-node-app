import { Action } from './Action.mjs'
import { print, println, copyFile, execute, mkdir } from '../utils.mjs'

export class OpenVSCodeCommand extends Action {
  constructor() {
    super('open-vscode-command')
  }

  async enabled(options) {
    return options.openVSCode
  }

  async execute(options) {
    print('Starting vscode...')
    await execute('code .')
    println('ok')

    return { vscodeStarted: true }
  }
}
