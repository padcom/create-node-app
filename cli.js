#!/usr/bin/env node

const inquirer = require('inquirer')
const generator = require('./generator')

async function main() {
  const options = await inquirer.prompt([
    {
      type: 'confirm',
      message: 'Freeze node.js version in .nvmrc?',
      name: 'freezeNodeVersion',
      default: true,
    },
    {
      type: 'confirm',
      message: 'Use lib folder for storing sources?',
      name: 'useLibFolder',
      default: false,
    },
    {
      type: 'confirm',
      message: 'Add tests?',
      name: 'tests',
      default: true,
    },
    {
      type: 'confirm',
      message: 'Add example test?',
      name: 'exampleTests',
      default: false,
      when: answers => answers.tests,
    },
    {
      type: 'confirm',
      message: 'Create readme file?',
      name: 'readme',
      default: true,
    },
  ])

  await generator(options)
}

main()
