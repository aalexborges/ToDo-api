import { ValidationError } from 'yup'
import { ErrorRequestHandler } from 'express'

// Custom errors
import { AlreadyExistError } from '../errors/AlreadyExistError'
import { NotFoundError } from '../errors/NotFoundError'
import { SessionError } from '../errors/SessionError'
import { UnauthorizedActionError } from '../errors/UnauthorizedActionError'

// The next parameter must be declared even if it is not being used
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const handleErrors: ErrorRequestHandler = (error, _req, res, _next) => {
  if (error instanceof ValidationError) {
    const errors: { [key: string]: string[] } = {}

    error.inner.forEach(err => err.path && (errors[err.path] = err.errors))

    return res
      .status(400)
      .json({ error: 'Validation fails', errors, code: 'data.invalid' })
  }

  if (error instanceof AlreadyExistError) {
    const { errorCode, identifier, message } = error as AlreadyExistError

    return res.status(400).json({ error: message, identifier, errorCode })
  }

  if (error instanceof NotFoundError) {
    const { description, errorCode, message } = error as NotFoundError

    return res.status(404).json({ error: message, description, errorCode })
  }

  if (error instanceof SessionError) {
    const { description, errorCode, message } = error as SessionError

    return res.status(401).json({ error: message, description, errorCode })
  }

  if (error instanceof UnauthorizedActionError) {
    const { description, errorCode, message } = error as UnauthorizedActionError

    return res.status(401).json({ error: message, description, errorCode })
  }

  console.log(error)
  return res.status(500).json({ error: 'Internal server error' })
}

export { handleErrors }
