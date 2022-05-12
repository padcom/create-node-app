#!/bin/bash

cat << EOM > example.test.ts
describe('Example test suite', () => {
  it('works!', () => {
    expect(1).toBe(1)
  })
})
EOM

npm install --save-dev jest @types/jest ts-jest
npx ts-jest config:init
npx jest
