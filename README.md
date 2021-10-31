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

* **USER**
  * [Create a new user](#create-a-new-user)
  * [Delete a user](#delete-a-user)

* **SESSION**
  * [Authenticate user](#authenticate-user)
  * [Refresh Token](#refresh-token)

* **ToDos**
  * [Get all user ToDos](#get-all-user-todos)
  * [Create a new ToDo](#create-a-new-todo)
  * [Update a ToDo](#update-a-todo)
  * [Delete a ToDo](#delete-a-todo)

### Create a new user

* **URL:** `/users`

* **Method:** `POST`

* **Body data:** <br />

  ```ts
  {
    name: { type: String, required: true, min: 2, trim: true },
    email: { type: String, required: true, email: true, trim: true },
    password: { type: String, required: true, min: 8, max: 16, trim: true },
  }
  ```

* **Success Response:** <br />

  * **Code:** `201 CREATED`
  * **Content:** <br />

    ```json
    { "message": "User created successfully" }
    ```

* **Error Response:** <br />

  * **Code:** `400 BAD REQUEST`
  * **Content:** <br />

    ```json
    {
      "error": "Validation fails",
      "errors": {
        "name": ["name is required", "..."],
        "email": ["email is required", "..."],
        "password": ["password is required", "..."]
      },
      "errorCode": "data.invalid"
    }
    ```

  OR

  * **Code:** `400 BAD REQUEST`
  * **Content:** <br />

    ```json
    {
      "error": "User already exist",
      "identifier": "email",
      "errorCode": "user.already_exist"
    }
    ```

### Delete a User

* **URL:** `/users/delete`

* **Method:** `POST`

* **Headers:** <br />

  ```json
  { "Authorization": "Bearer <Your token>" }
  ```

* **Body data:** <br />

  ```ts
  { password: { type: String, required: true, min: 8, max: 16, trim: true } }
  ```

* **Success Response:** <br />

  * **Code:** `200 OK`
  * **Content:** <br />

    ```json
    { "message": "User deleted successfully" }
    ```

* **Error Response:** <br />

  * **Code:** `400 BAD REQUEST`
  * **Content:** <br />

    ```json
    {
      "error": "Validation fails",
      "errors": { "password": ["password is required", "..."] },
      "errorCode": "data.invalid"
    }
    ```

  * **Code:** `401 UNAUTHORIZED`
  * **Content:** <br />

    ```json
    {
      "error": "Unauthorized action",
      "description": "Invalid password",
      "errorCode": "user.delete_not_authorized"
    }
    ```

  OR

  * **Code:** `401 UNAUTHORIZED`
  * **Content:** <br />

    ```json
    {
      "error": "Session Error",
      "description": "User not found",
      "errorCode": "user.not_found",
    }
    ```

### Authenticate User

* **URL:** `/session/signIn`

* **Method:** `POST`

* **Body data:** <br />

  ```ts
  {
    email: { type: String, required: true, email: true, trim: true },
    password: { type: String, required: true, email: true, trim: true }
  }
  ```

* **Success Response:** <br />

  * **Code:** `200 OK`
  * **Content:** <br />

    ```json
    {
      "token": "<Your token>",
      "user": {
        "name": "Example User",
        "email": "user@email.com"
      }
    }
    ```

* **Error Response:** <br />

  * **Code:** `400 BAD REQUEST`
  * **Content:** <br />

    ```json
    {
      "error": "Validation fails",
      "errors": {
        "email": ["email is required", "..."],
        "password": ["password is required", "..."]
      },
      "errorCode": "data.invalid"
    }
    ```

  OR

  * **Code:** `401 UNAUTHORIZED`
  * **Content:** <br />

    ```json
    {
      "error": "Session Error",
      "description": "Invalid email or password",
      "errorCode": "session.signIn"
    }
    ```

### Refresh Token

* **URL:** `/session/token/refresh`

* **Method:** `POST`

* **Headers:** <br />

  ```json
  { "Authorization": "Bearer <Your token>" }
  ```

* **Success Response:** <br />

  * **Code:** `200 OK`
  * **Content:** <br />

    ```json
    {
      "message": "A new token was successfully generated",
      "token": "<Your new token>"
    }
    ```

* **Error Response:** <br />

  * **Code:** `401 UNAUTHORIZED`
  * **Content:** <br />

    ```json
    {
      "error": "Session Error",
      "errorCode": "token.invalid"
    }
    ```

  OR

  * **Code:** `401 UNAUTHORIZED`
  * **Content:** <br />

    ```json
    {
      "error": "Session Error",
      "errorCode": "token.expired"
    }
    ```

### Get all user ToDos

* **URL:** `/toDos`

* **Method:** `GET`

* **Headers:** <br />

  ```json
  { "Authorization": "Bearer <Your token>" }
  ```

* **Success Response:** <br />

  * **Code:** `200 OK`
  * **COntent:** <br />

  ```json
  [
    {
      "id": "a767d63a-f411-49d5-b4bc-91652c114ce7",
      "task": "Document the API",
      "completed": false,
      "completedAt": null,
      "createdAt": "2021-10-29T19:51:53.534Z"
    }
  ]
  ```

* **Error Response <br />

  * **Code:** `401 UNAUTHORIZED`
  * **Content:** <br />

    ```json
    { "errorCode": "token.invalid" }
    ```

### Create a new ToDo

* **URL:** `/toDos`

* **Method:** `POST`

* **Headers:** <br />

  ```json
  { "Authorization": "Bearer <Your token>" }
  ```

* **Body Data:** <br />

  ```ts
  { task: { type: String, required: true, min: 2, trim: true } }
  ```

* **Success Response:** <br />

  * **Code:** `200 OK`
  * **Content:** <br />

    ```json
    {
      "message": "ToDo created successfully",
      "toDo": {
        "id": "a767d63a-f411-49d5-b4bc-91652c114ce7",
        "task": "Document the API",
        "completed": false,
        "completedAt": null,
        "createdAt": "2021-10-29T19:51:53.534Z"
      }
    }
    ```

* **Error Response:** <br />

  * **Code:** `400 BAD REQUEST`
  * **Content:** <br />

    ```json
    {
      "error": "Validation fails",
      "errors": { "task": ["task is required", "..."] },
      "errorCode": "data.invalid"
    }
    ```

  OR

  * **Code:** `401 UNAUTHORIZED`
  * **Content:** <br />

    ```json
    {
      "error": "Session Error",
      "description": "Invalid token",
      "errorCode": "token.invalid"
    }
    ```

### Update a ToDo

* **URL:** `/toDos/:id`

* **Method:** `PATCH`

* **Headers:** <br />

  ```json
  { "Authorization": "Bearer <Your token>" }
  ```

* **Params Data:** <br />

  ```ts
  { id: { type: String, required: true, uuid: true } }
  ```

* **Body Data:** <br />

  ```ts
  {
    task: { type: String, required: false, min: 2, trim: true },
    completed: { type: Boolean, required: false }
  }
  ```

* **Success Response:**

  * **Code:** `200 OK`
  * **Content:**

    ```json
    {
      "message": "ToDo updated successfully",
      "toDO": {
        "id": "a767d63a-f411-49d5-b4bc-91652c114ce7",
        "task": "Updated Task",
        "completed": false,
        "completedAt": null,
        "createdAt": "2021-10-29T19:51:53.534Z"
      }
    }
    ```

* **Error Response:**

  * **Code:** `400 BAD REQUEST`
  * **Content:** <br />

    ```json
    {
      "error": "Validation fails",
      "errors": { "id": ["id is required", "..."] },
      "errorCode": "data.invalid"
    }
    ```

  OR

  * **Code:** `404 NOT FOUND`
  * **Content:** <br />

    ```json
    {
      "error": "ToDo not found",
      "errorCode": "toDo.not_found"
    }
    ```

  OR

  * **Code:** `401 UNAUTHORIZED`
  * **Content:** <br />

    ```json
    { "errorCode": "token.invalid" }
    ```

### Delete a ToDo

* **URL:** `/toDos/:id`

* **Method:** `DELETE`

* **Headers:** <br />

  ```json
  { "Authorization": "Bearer <Your token>" }
  ```

* **Params Data:** <br />

  ```ts
  { id: { type: String, required: true, uuid: true } }
  ```

* **Success Response:** <br />

  * **Code:** `200 OK`
  * **Content:**

    ```json
    { "message": "ToDo deleted successfully" }
    ```

* **Error Response:** <br />

  * **Code:** `400 BAD REQUEST`
  * **Content:** <br />

    ```json
    {
      "error": "Validation fails",
      "errors": { "id": ["id is required", "..."] },
      "errorCode": "data.invalid"
    }
    ```

  OR

  * **Code:** `404 NOT FOUND`
  * **Content:** <br />

    ```json
    {
      "error": "ToDo not found",
      "errorCode": "toDo.not_found"
    }
    ```

  OR

  * **Code:** `401 UNAUTHORIZED`
  * **Content:** <br />

    ```json
    { "errorCode": "token.invalid" }
    ```
