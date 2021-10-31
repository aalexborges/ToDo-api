import { toDoValidationsSchemas } from './toDoValidationsSchema'

class ToDoValidations {
  constructor(private readonly data: { [key: string]: any }) {}

  async create() {
    await toDoValidationsSchemas.create.validate(this.data, {
      abortEarly: false,
    })
  }

  async update() {
    await toDoValidationsSchemas.update.validate(this.data, {
      abortEarly: false,
    })
  }

  async delete() {
    await toDoValidationsSchemas.delete.validate(this.data, {
      abortEarly: false,
    })
  }
}

export { ToDoValidations }
