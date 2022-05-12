#!/bin/bash -e

npm init -y

cat << EOM > main.ts
#!/usr/bin/env -S npx ts-node

console.log('Hello!')
EOM
chmod +x main.ts

cat << EOM | node > package.json-1
const packageJson = require('./package.json')
packageJson.main = 'main.ts'
packageJson.scripts['start'] = 'ts-node main.ts'
console.log(JSON.stringify(packageJson, null, 2))
EOM
rm -f package.json
mv package.json-1 package.json

npm install --save-dev typescript @types/node ts-node
npx tsc --init
