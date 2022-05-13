#!/usr/bin/env node

const { exec } = require('child_process')
const { readFileSync, writeFileSync } = require('fs')

function execute(command) {
  return new Promise((resolve, reject) => {
    exec(command, function(error, stdout, stderr) {
      if (error) reject(error)
      else resolve(stdout)
    })
  })
}

function withPackageJson(callback) {
  const packageJson = JSON.parse(readFileSync('./package.json'))
  callback(packageJson)
  writeFileSync('package.json', JSON.stringify(packageJson, null, 2))
}

async function main() {
  try {
    console.log('Initializing git repository...')
    await execute('git init .')
    writeFileSync('.gitignore', ['node_modules', 'dist', 'coverage' ].join('\n') + '\n')
    console.log('Freezing node.js version with nvm...')
    writeFileSync('.nvmrc', await execute('node --version'))
    console.log('Creating main.ts...')
    writeFileSync('./main.ts', `#!/usr/bin/env -S npx ts-node -T

console.log('Hello!')
`)
    await execute('chmod +x main.ts')
    console.log('Initializing project...')
    await execute('npm init -y')
    console.log('Installing dependencies...')
    await execute('npm install --save-dev typescript @types/node ts-node')
    console.log('Initializing TypeScript configuration')
    await execute('npx tsc --init')
    console.log('Adding start and build scripts')
    withPackageJson(packageJson => {
      packageJson.version = '0.0.0'
      packageJson.main = 'main.ts'
      packageJson.scripts['start'] = 'ts-node main.ts'
      packageJson.scripts['build'] = 'tsc main.ts'
    })
    console.log('Installing test dependencies...')
    await execute('npm install --save-dev jest @types/jest ts-jest')
    console.log('Initializint test subsystem (Jest)...')
    await execute('npx ts-jest config:init')
    console.log('Creating example test...')
    writeFileSync('./example.test.ts', `describe('Example test suite', () => {
  it('works!', () => {
    expect(1).toBe(1)
  })
})
    `)
    console.log('Creating README.md')
    withPackageJson(packageJson => {
      writeFileSync('./README.md', `# ${packageJson.name} project

## Starting the project

To start the project issue the following command:
\`\`\`
$ nvm use && npm install && npm start
\`\`\`
`)
    })
    console.log('Adding test scripts to package.json...')
    withPackageJson(packageJson => {
      packageJson.scripts['test'] = 'jest'
      packageJson.scripts['test:watch'] = 'jest --watch'
    })
    console.log('Running tests...')
    await execute('npm test')
    console.log('All done.')
  } catch (e) {
    console.error('Error:', e)
    process.exit(1)
  }
}

main()
