import { userValidationsSchemas } from './userValidationsSchema'

class UserValidations {
  constructor(private readonly data: { [key: string]: any }) {}

  async create() {
    await userValidationsSchemas.create.validate(this.data, {
      abortEarly: false,
    })
  }

  async delete() {
    await userValidationsSchemas.delete.validate(this.data, {
      abortEarly: false,
    })
  }
}

export { UserValidations }
