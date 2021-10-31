type Props = {
  errorCode: string
  description?: string
  message?: string
}

class NotFoundError extends Error {
  readonly errorCode: Props['errorCode']
  readonly description: Props['description']

  constructor({ errorCode, description, message }: Props) {
    super(message || 'Not found')

    this.errorCode = errorCode
    this.description = description

    Object.setPrototypeOf(this, NotFoundError.prototype)
  }
}

export { NotFoundError }
