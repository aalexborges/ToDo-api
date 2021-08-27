interface IOptions {
  msg: string
  keys?: string[]
  status?: number
}

class AlreadyExist extends Error {
  public readonly keys?: string[]
  public readonly status: number

  constructor(options: IOptions) {
    super(options.msg)

    this.keys = options.keys
    this.status = options.status || 400

    Object.setPrototypeOf(this, AlreadyExist.prototype)
  }
}

export default AlreadyExist
