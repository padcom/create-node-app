import { Action } from './Action.mjs'
import chalk from 'chalk'

import { dirname, readdir, readFile } from '../utils.mjs'

export class WelcomeMessageCommand extends Action {
  constructor() {
    super('welcome-message-command')
  }

  async execute(options) {
    const packageJson = JSON.parse(readFile(`${dirname}./package.json`))
    console.log(packageJson.name, 'version', packageJson.version, 'by', packageJson.author, '\n')

    const files = readdir('.')
    if (files.length > 0) {
      console.log('I am sorry! This folder is not empty. I will not continue, because some files could get overrided. Run me in a clean folder, please.')
      process.exit(1)
    }

    console.log('Hello! I am your friendly Node.js TypeScript project generator. I will ask you a few questions and scaffold the project for you.\n')

    return { welcomeMessageDisplayed: true }
  }
}
