import chalk from 'chalk'
import { exec } from 'child_process'
import { writeFileSync, readFileSync } from 'fs'
import { fileURLToPath } from 'url'

export { mkdirSync as mkdir, writeFileSync as writeFile, readFileSync as readFile, readdirSync as readdir } from 'fs'

export function execute(command) {
  return new Promise((resolve, reject) => {
    exec(command, function(error, stdout, stderr) {
      if (error) reject(error)
      else resolve(stdout)
    })
  })
}

export async function setNpmRc(option, value) {
  return execute(`npm config set "${option}"="${value}" --userconfig .npmrc`)
}

export async function withPackageJson(callback) {
  const packageJson = JSON.parse(readFileSync('./package.json'))
  await callback(packageJson)
  writeFileSync('package.json', JSON.stringify(packageJson, null, 2))
}

export async function copyFile(filename, destination = filename) {
  writeFileSync(`./${destination}`, readFileSync(`${dirname}/templates/${filename}`))
}

export async function copyTemplateFile(filename, context = {}, destination = filename) {
  let source = readFileSync(`${dirname}/templates/${filename}`).toString()
  for (const [ name, value ] of Object.entries(context)) {
    source = source.replaceAll(`{{${name}}}`, value)
  }
  writeFileSync(`./${destination}`, source)
}

export function print(msg) {
  process.stdout.write(chalk.magenta('> ') + chalk.gray(msg))
}

export function println(msg) {
  process.stdout.write(chalk.bold.green(msg + '\n'))
}

export function error(msg) {
  process.stdout.write(chalk.bold.red('ERROR') + '\n\n' + chalk.bold(msg) + '\n')
}

export const dirname = fileURLToPath(new URL('.', import.meta.url))

export function flushStdin() {
  for (let i = 0; i < 3; i++) while (process.stdin.read() !== null);
}
