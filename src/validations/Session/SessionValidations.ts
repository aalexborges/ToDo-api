import { sessionValidationsSchemas } from './sessionValidationsSchema'

class SessionValidations {
  constructor(private readonly data: { [key: string]: any }) {}

  async singIn() {
    await sessionValidationsSchemas.signIn.validate(this.data, {
      abortEarly: false,
    })
  }
}

export { SessionValidations }
