# API - Simple ToDo

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
