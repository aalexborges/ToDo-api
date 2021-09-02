# API - Simple ToDo

## Usuários

**Criar novo usuário**
----

Responsável por criar um novo usuário, retornando um JSON.

* **URL:**

  `/users`

* **Método:**

  `POST`

* **Dados do Body:**

  ```ts
  {
    name: { type: String, required: true, min: 2 },
    email: { type: String, required: true },
    password: { type: String, required: true, min: 8, max: 16 }
  }
  ```

* **Resposta de Sucesso:**

  * **Code:** 201 <br />
  * **Conteúdo:**

    ```json
    { "message": "User created successfully" }
    ```

* **Resposta de Error:**

  * **Code:** 400 BAD REQUEST <br />
  * **Conteúdo:**

    * **Resposta 1:**

      ```json
      {
        "error": "Validation fails",
        "keys": ["name", "email", "password"],
        "errors": {
          "name": ["name is a required field"],
          "email": ["email is a required field"],
          "password": ["password is a required field"]
        }
      }
      ```

    * **Resposta 2:**

      ```json
      {
        "error": "User already exists",
        "keys": ["email"]
      }
      ```

## Sessões

**Criar uma nova sessão - Login**
----

Retorna um JSON contendo o token da sessão e o refresh token.

* **URL:**

  `/sessions`

* **Método:**

  `POST`

* **Dados do Body:**

  ```ts
  {
    email: { type: String, required: true },
    password: { type: String, required: true, min: 8, max: 16 }
  }
  ```

* **Resposta de Sucesso:**

  * **Code:** 200 <br />
  * **Conteúdo:**

    ```json
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MzA1MjI3NTQsImV4cCI6MTYzMDUyMzY1NCwic3ViIjoiNTU2NjU5NzQtNmU0Ny00NzYyLWE2NzMtYWI4ZmI3ZTMyOWM4In0.0T1_T-jL_KSicTrX4ptV7u2TbrOgFcCqgBoNpGykLxc",
      "refreshToken": {
        "id": "87d81ff5-3016-4300-8a5c-d78f6eb58bbe",
        "expiresIn": 1630524158336
      }
    }
    ```

* **Resposta de Erro:**

  * **Code:** 400 BAD REQUEST <br />
  * **Conteúdo:**

    ```json
    {
      "error": "Validation fails",
      "keys": ["email", "password"],
      "errors": {
        "email": ["email is a required field"],
        "password": ["password is a required field"]
      }
    }
    ```

  * **Code:** 401 UNAUTHORIZED <br />
  * **Conteúdo:**

    ```json
    { "error": "Email or password invalid" }
    ```

**Refresh Token**
----

Retorna um JSON contendo o novo token.

* **URL:**

  `/sessions/refreshToken`

* **Método:**

  `POST`

* **Dados do Body:**

  ```ts
  {
    refreshToken: { type: String, required: true, uuid: true },
  }
  ```

* **Resposta de Sucesso:**

  * **Code:** 200 <br />
  * **Conteúdo:**

    * **Resposta 1:**

      ```json
      {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MzA1MjI3NTQsImV4cCI6MTYzMDUyMzY1NCwic3ViIjoiNTU2NjU5NzQtNmU0Ny00NzYyLWE2NzMtYWI4ZmI3ZTMyOWM4In0.0T1_T-jL_KSicTrX4ptV7u2TbrOgFcCqgBoNpGykLxc"
      }
      ```

    * **Resposta 2:**

      ```json
      {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MzA1MjI3NTQsImV4cCI6MTYzMDUyMzY1NCwic3ViIjoiNTU2NjU5NzQtNmU0Ny00NzYyLWE2NzMtYWI4ZmI3ZTMyOWM4In0.0T1_T-jL_KSicTrX4ptV7u2TbrOgFcCqgBoNpGykLxc",
        "refreshToken": {
          "id": "87d81ff5-3016-4300-8a5c-d78f6eb58bbe",
          "expiresIn": 1630524158336
        }
      }
      ```

* **Resposta de Erro:**

  * **Code:** 400 BAD REQUEST <br />
  * **Conteúdo:**

    ```json
    {
      "error": "Validation fails",
      "keys": ["refreshToken"],
      "errors": {
        "refreshToken": ["refreshToken is a required field"]
      }
    }
    ```

  * **Code:** 401 UNAUTHORIZED <br />
  * **Conteúdo:**

    ```json
    { "error": "Refresh token invalid" }
    ```

## ToDos

**Obter ToDos**
----

Retorna um JSON contendo todos os ToDos do usuário.

* **URL:**

  `/toDos`

* **Método:**

  `GET`

* **Parâmetros do HEADER:**

  **Required:**

  `Authorization` - Informa o tipo (Bearer) e o token

* **Resposta de Sucesso:**

  * **Code:** 200 <br />
  * **Conteúdo:**

    ```json
    [
      {
        "id": "4fe7afed-6d8a-44f8-a29a-124b9b7dd3cc",
        "task": "Minha tarefa",
        "completed": false,
        "createdAt": 1630519332386,
        "updatedAt": 1630519332386
      }
    ]
    ```

* **Resposta de Error:**

  * **Code:** 401 UNAUTHORIZED <br />
  * **Conteúdo:**

    * **Resposta 1:**

      ```json
      { "error": "Token not provider" }
      ```

    * **Resposta 2:**

      ```json
      { "error": "Malformed token" }
      ```

    * **Resposta 3:**

      ```json
      { "error": "Token error" }
      ```

**Criar um novo ToDo**
----

Retornar um JSON contendo os dados do ToDo criado.

* **URL:**

  `/toDos`

* **Método:**

  `POST`

* **Dados do Body:**

  ```ts
  { task: { type: String, required: true } }
  ```

* **Parâmetros do HEADER:**

  **Required:**

  `Authorization` - Informa o tipo (Bearer) e o token

* **Resposta de Sucesso:**

  * **Code:** 201 <br />
  * **Conteúdo:**

    ```json
    {
      "message": "ToDo created successfully",
      "data": {
        "id": "4fe7afed-6d8a-44f8-a29a-124b9b7dd3cc",
        "task": "Minha tarefa",
        "completed": false,
        "createdAt": 1630519332386
      }
    }
    ```

* **Resposta de Erro:**

  * **Code:** 400 BAD REQUEST <br />
  * **Conteúdo:**

    ```json
    {
      "error": "Validation fails",
      "keys": ["task"],
      "errors": {
        "task": ["task is a required field"]
      },
    }
    ```

  * **Code:** 401 UNAUTHORIZED <br />
  * **Conteúdo:**

    * **Resposta 1:**

      ```json
      { "error": "Token not provider" }
      ```

    * **Resposta 2:**

      ```json
      { "error": "Malformed token" }
      ```

    * **Resposta 3:**

      ```json
      { "error": "Token error" }
      ```

    * **Resposta 4:**

      ```json
      { "error": "User not found" }
      ```

**Atualizar um ToDo**
----

Responsável por atualizar as informação de um ToDo, retornando um JSON.

* **URL:**

  `/toDos`

* **Método:**

  `PUT`

* **Dados do Body:**

  ```ts
  {
    id: { type: String, required: true, uuid: true },
    task: { type: String, required: false },
    completed: { type: Boolean, required: false }
  }
  ```

* **Parâmetros do HEADER:**

  **Required:**

  `Authorization` - Informa o tipo (Bearer) e o token

* **Resposta de Sucesso:**

  * **Code:** 200 <br />
  * **Conteúdo:**

    ```json
    {
      "message": "ToDo updated successfully",
      "data": {
        "id": "4fe7afed-6d8a-44f8-a29a-124b9b7dd3cc",
        "task": "Minha tarefa",
        "completed": true,
        "createdAt": 1630519332386
      }
    }
    ```

* **Resposta de Erro:**

  * **Code:** 400 BAD REQUEST <br />
  * **Conteúdo:**

    ```json
    {
      "error": "Validation fails",
      "keys": ["id"],
      "errors": {
        "id": ["id is a required field"]
      },
    }
    ```

  * **Code:** 401 UNAUTHORIZED <br />
  * **Conteúdo:**

    * **Resposta 1:**

      ```json
      { "error": "Token not provider" }
      ```

    * **Resposta 2:**

      ```json
      { "error": "Malformed token" }
      ```

    * **Resposta 3:**

      ```json
      { "error": "Token error" }
      ```

  * **Code:** 404 NOT FOUND <br />
  * **Conteúdo:**

    ```json
    { "error": "ToDo not found" }
    ```

**Deletar um ToDo**
----

Responsável por deletar um ToDo, retornando um JSON com uma mensagem caso seja deletado com sucesso.

* **URL:**

  `/toDos/:id`

* **Método:**

  `DELETE`

* **Parâmetros de URL**

   ```ts
   { id: { type: String, required: true } }
   ```

* **Parâmetros do HEADER:**

  **Required:**

  `Authorization` - Informa o tipo (Bearer) e o token

* **Resposta de Sucesso:**

  * **Code:** 200 <br />
  * **Conteúdo:**

    ```json
    { "message": "ToDo has been deleted" }
    ```

* **Resposta de Erro:**

  * **Code:** 400 BAD REQUEST <br />
  * **Conteúdo:**

    ```json
    {
      "error": "Validation fails",
      "keys": ["id"],
      "errors": {
        "id": ["id must be a valid UUID"]
      },
    }
    ```

  * **Code:** 401 UNAUTHORIZED <br />
  * **Conteúdo:**

    * **Resposta 1:**

      ```json
      { "error": "Token not provider" }
      ```

    * **Resposta 2:**

      ```json
      { "error": "Malformed token" }
      ```

    * **Resposta 3:**

      ```json
      { "error": "Token error" }
      ```

  * **Code:** 404 NOT FOUND <br />
  * **Conteúdo:**

    ```json
    { "error": "ToDo not found" }
    ```
