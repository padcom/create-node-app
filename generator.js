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

async function createApplicationFiles() {
  console.log('Creating main.ts...')
  mkdirSync('lib')
  await copyFile('start.ts')
  await copyFile('main.ts', 'lib/main.ts')
  await execute('chmod +x start.ts')
}

async function initNpmProject() {
  console.log('Initializing project...')
  await execute('npm init -y')
}

async function installDependencies() {
  console.log('Installing dependencies...')
  await execute('npm install --save typescript ts-node')
  await execute('npm install --save-dev @types/node')
  console.log('Installing test dependencies...')
  await execute('npm install --save-dev jest @types/jest ts-jest')
}

async function initTypeScript() {
  console.log('Initializing TypeScript configuration')
  await execute('npx tsc --init')
}

async function initJest() {
  console.log('Initializint test subsystem (Jest)...')
  await execute('npx ts-jest config:init')
}

async function createTestFiles() {
  console.log('Creating example test...')
  await copyFile('example.test.ts', 'lib/example.test.ts')
}

async function runTests() {
  console.log('Running tests...')
  await execute('npm test')
}

async function createScripts() {
  console.log('Adding start and build scripts')
  await withPackageJson(packageJson => {
    packageJson.version = '0.0.0'
    packageJson.main = 'start.ts'
    packageJson.scripts['start'] = 'ts-node start.ts'
    packageJson.scripts['test'] = 'jest'
    packageJson.scripts['test:watch'] = 'jest --watch'
  })
}

async function createReadme() {
  console.log('Creating README.md')
  await withPackageJson(async (packageJson) => {
    await copyTemplateFile('README.md', { name: packageJson.name })
  })
}

async function main() {
  try {
    await initGitRepository()
    await freezeNodeVersionUsingNvm()
    await createApplicationFiles()
    await initNpmProject()
    await installDependencies()
    await initTypeScript()
    await initJest()
    await createScripts()
    await createTestFiles()
    await runTests()
    await createReadme()
    console.log('All done.')
  } catch (e) {
    console.error('Error:', e)
    process.exit(1)
  }
}

main()
