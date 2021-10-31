type Props = {
  errorCode: string
  description: string
  message?: string
}

class UnauthorizedActionError extends Error {
  readonly errorCode: Props['errorCode']
  readonly description: Props['description']

  constructor({ errorCode, description, message }: Props) {
    super(message || 'Unauthorized action')

    this.errorCode = errorCode
    this.description = description

    Object.setPrototypeOf(this, UnauthorizedActionError.prototype)
  }
}

export { UnauthorizedActionError }
