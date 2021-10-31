type Props = {
  errorCode: string
  message?: string
  identifier: string
}

class AlreadyExistError extends Error {
  readonly errorCode: Props['errorCode']
  readonly identifier: Props['identifier']

  constructor({ errorCode, identifier, message }: Props) {
    super(message || 'Already Exist')

    this.errorCode = errorCode
    this.identifier = identifier

    Object.setPrototypeOf(this, AlreadyExistError.prototype)
  }
}

export { AlreadyExistError }
