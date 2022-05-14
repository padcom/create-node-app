import { Action } from './Action.mjs'
import { print, println, withPackageJson, copyTemplateFile } from '../utils.mjs'

export class CreateReadmeCommand extends Action {
  constructor() {
    super('create-readme-command')
  }

  async enabled(options) {
    return options.createReadme
  }

  async execute(options) {
    print('Creating README.md...')
    await withPackageJson(async (packageJson) => {
      await copyTemplateFile('README.md', { name: packageJson.name })
    })
    println('ok')

    return { readmeCreated: true }
  }
}
