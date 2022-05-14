import { Action } from './Action.mjs'
import chalk from 'chalk'

import { dirname, readFile } from '../utils.mjs'

export class WelcomeMessageCommand extends Action {
  constructor() {
    super('welcome-message-command')
  }

  async execute(options) {
    const packageJson = JSON.parse(readFile(`${dirname}./package.json`))
    console.log(packageJson.name, 'version', packageJson.version, 'by', packageJson.author, '\n')
    console.log('Hello! I am your friendly Node.js TypeScript project generator. I will ask you a few questions and create the project for you.\n')

    return { welcomeMessageDisplayed: true }
  }
}
