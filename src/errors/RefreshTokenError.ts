class RefreshTokenError extends Error {
  constructor(msg: string) {
    super(msg)

    Object.setPrototypeOf(this, RefreshTokenError.prototype)
  }
}

export default RefreshTokenError
