# Node.js app generator

This generator creates a project that has typescript and jest configured

## Usage

To use this generator you need to have [nvm](https://github.com/nvm-sh/nvm#installing-and-updating) and [node.js](https://nodejs.org) installed through nvm.

Then issue the following command:

```
$ npm init @padcom/ts-app
```

Which will create the following elements:

### `start.ts`
This is the main application entry point. It can be invoked either directly or by calling `npm start`

### `example.test.ts`
This is an example Jest test written in TypeScript

### `package.json`
Project configuration file.

### `.gitignore`
Default list of ignored files

### `.nvmrc`
Contains version of node used when initializing the project

### `tsconfig.json`
Default TypeScript documentation

## Default scripts

The following list describes the default NPM scripts that can be used with the project

### `start`

Starts the application by running

```
$ npm start
```

or

```
$ ./start.ts
```

or

```
$ npx ts-node start.ts
```


### `test`

Executes all tests in the project

### `test:watch`

Executes tests that have been changed since the last commit.

### `lint`

You can run linter on your project with the following command:

```
$ npm run lint
```

### `lint:fix`

You can fix all auto-fixable linter problems by issuing the following command:

```
$ npm run lint:fix
```

## TypeScript

All files in the project can use TypeScript (both logic and tests)

## Tests

Tests are executed using Jest runner
