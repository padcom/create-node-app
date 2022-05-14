#!/usr/bin/env node

const { exec } = require('child_process')
const { mkdirSync, readFileSync, writeFileSync } = require('fs')

function execute(command) {
  return new Promise((resolve, reject) => {
    exec(command, function(error, stdout, stderr) {
      if (error) reject(error)
      else resolve(stdout)
    })
  })
}

async function withPackageJson(callback) {
  const packageJson = JSON.parse(readFileSync('./package.json'))
  await callback(packageJson)
  writeFileSync('package.json', JSON.stringify(packageJson, null, 2))
}

async function copyFile(filename, destination = filename) {
  writeFileSync(`./${destination}`, readFileSync(`${__dirname}/templates/${filename}`))
}

async function copyTemplateFile(filename, context = {}, destination = filename) {
  let source = readFileSync(`${__dirname}/templates/${filename}`).toString()
  for (const [ name, value ] of Object.entries(context)) {
    source = source.replaceAll(`{{${name}}}`, value)
  }
  writeFileSync(`./${destination}`, source)
}

async function initGitRepository() {
  console.log('Initializing git repository...')
  await execute('git init .')
  await copyFile('gitignore', '.gitignore')
}

async function freezeNodeVersionUsingNvm() {
  console.log('Freezing node.js version with nvm...')
  writeFileSync('.nvmrc', await execute('node --version'))
}

async function createApplicationFiles(useLibFolder = true) {
  console.log('Creating main.ts...')
  if (useLibFolder) {
    mkdirSync('lib')
    await copyFile('start-with-lib.ts', 'start.ts')
    await copyFile('main.ts', `${useLibFolder ? 'lib/' : ''}main.ts`)
  } else {
    await copyFile('start-without-lib.ts', 'start.ts')
  }
  await execute('chmod +x start.ts')
}

async function initNpmProject() {
  console.log('Initializing project...')
  await execute('npm init -y')
}

async function installDependencies(tests = true) {
  console.log('Installing dependencies...')
  await execute('npm install --save typescript ts-node')
  await execute('npm install --save-dev @types/node')

  if (tests) {
    console.log('Installing test dependencies...')
    await execute('npm install --save-dev jest @types/jest ts-jest')
  }
}

async function initTypeScript() {
  console.log('Initializing TypeScript configuration')
  await execute('npx tsc --init')
}

async function initJest() {
  console.log('Initializint test subsystem (Jest)...')
  await execute('npx ts-jest config:init')
}

async function createTestFiles(useLibFolder = true) {
  console.log('Creating example test...')
  await copyFile('example.test.ts', `${useLibFolder ? 'lib/' : ''}example.test.ts`)
}

async function runTests() {
  console.log('Running tests...')
  await execute('npm test')
}

async function createScripts(tests = true) {
  console.log('Adding start and build scripts')
  await withPackageJson(packageJson => {
    packageJson.version = '0.0.0'
    packageJson.main = 'start.ts'
    packageJson.scripts['start'] = 'ts-node start.ts'
    if (tests) {
      packageJson.scripts['test'] = 'jest'
      packageJson.scripts['test:watch'] = 'jest --watch'
    }
  })
}

async function createReadme() {
  console.log('Creating README.md')
  await withPackageJson(async (packageJson) => {
    await copyTemplateFile('README.md', { name: packageJson.name })
  })
}

async function main(options = {
  tests: true,
  exampleTests: true,
  freezeNodeVersion: true,
  useLibFolder: true,
}) {
  try {
    await initGitRepository()
    if (options.freezeNodeVersion)
      await freezeNodeVersionUsingNvm()
    await createApplicationFiles(options.useLibFolder)
    await initNpmProject()
    await createScripts(options.tests)
    await installDependencies(options.tests)
    await initTypeScript()
    if (options.tests) {
      await initJest()
      if (options.exampleTests) {
        await createTestFiles(options.useLibFolder)
        await runTests()
      }
    }
    await createReadme()
    console.log('All done.')
  } catch (e) {
    console.error('Error:', e)
    process.exit(1)
  }
}

module.exports = main
