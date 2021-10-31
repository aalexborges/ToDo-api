type Props = {
  errorCode: string
  message?: string
  description?: string
}

class SessionError extends Error {
  readonly errorCode: Props['errorCode']
  readonly description: Props['description']

  constructor({ errorCode, description, message }: Props) {
    super(message || 'Session Error')

    this.errorCode = errorCode
    this.description = description

    Object.setPrototypeOf(this, SessionError.prototype)
  }
}

export { SessionError }
