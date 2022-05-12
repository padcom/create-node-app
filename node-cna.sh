#!/bin/bash -e

npm init -y
cat << EOM > main.ts
#!/usr/bin/env -S npx ts-node

console.log('Hello!')
EOM
chmod +x main.ts

npm install --save-dev typescript @types/node ts-node
npx tsc --init
