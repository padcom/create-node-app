export class Action {
  constructor(type) {
    this.type = type
  }

  async enabled(options) {
    return true
  }

  async execute() {
    throw new Error('Not implemented')
  }
}
