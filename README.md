<p align="center">
  <img src="./.github/logo.svg" alt="ToDo - API" style="width: 362px;"  />
</p>

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/AlexBorgesDev/toDo-api.svg" />
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/AlexBorgesDev/toDo-api.svg" />
  <img alt="Package License" src="https://img.shields.io/github/license/alexborgesdev/toDo-api.svg" />
  <img alt="Coverage" src="https://img.shields.io/coveralls/github/alexborgesdev/toDo-api.svg" />
</p>

## Description

A RestFull API, made with Express.js and Typescript. In it you can create a user and create, update, delete and get your own ToDos, having everything stored in an SQL database.

## Installation

```bash
$ npm install
```

## Running the app

First, create a *`.env`* file at the root of the project, containing the same properties as the *`.env.example`* file, changing only their values.

After creating the *`.env`* file, run the migration to create the database, for that, run the command:

```bash
$ npx prisma migrate deploy
```

Now you can run the app with the command:

```bash
# development
$ npm run dev
```

## Test

```bash
$ npx run test

# test coverage
$ npx run test --coverage
```

## REST API

All API routes:

### Create new user

* **URL:** <br />
  `/users`
