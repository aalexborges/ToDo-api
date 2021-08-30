interface IOptions {
  msg?: string
  status?: number
}

class NotFound extends Error {
  public readonly status: number

  constructor(options: IOptions) {
    super(options.msg || 'Not found')

    this.status = options.status || 404

    Object.setPrototypeOf(this, NotFound.prototype)
  }
}

export default NotFound
