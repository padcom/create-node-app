#!/bin/bash

cat << EOM > example.test.ts
describe('Example test suite', () => {
  it('works!', () => {
    expect(1).toBe(1)
  })
})
EOM

cat << EOM | node > package.json-1
const packageJson = require('./package.json')
packageJson.scripts['test'] = 'jest'
packageJson.scripts['test:watch'] = 'jest --watchAll'
console.log(JSON.stringify(packageJson, null, 2))
EOM
rm -f package.json
mv package.json-1 package.json

npm install --save-dev jest @types/jest ts-jest
npx ts-jest config:init
npm test
