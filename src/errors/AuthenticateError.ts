class AuthenticateError extends Error {
  constructor() {
    super('Email or password invalid')

    Object.setPrototypeOf(this, AuthenticateError.prototype)
  }
}

export default AuthenticateError
