import { Question } from './Question.mjs'

export class ShouldCreateExampleTestsQuestion extends Question {
  async enabled(options) {
    return options.initTests
  }
}
