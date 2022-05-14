import { Action } from './Action.mjs'
import inquirer from 'inquirer'

export class Question extends Action {
  #optionName = null
  #question = null
  #defaultValue = null

  constructor(optionName, question, defaultValue = true) {
    super('question')
    this.#optionName = optionName
    this.#question = question
    this.#defaultValue = defaultValue
  }

  async execute(options) {
    const result = await inquirer.prompt([{
      type: 'confirm',
      name: this.#optionName,
      default: this.#defaultValue,
      message: this.#question,
    }])

    return result
  }
}
