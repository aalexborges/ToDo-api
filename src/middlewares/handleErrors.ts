import { ValidationError } from 'yup'
import { ErrorRequestHandler } from 'express'

import AlreadyExist from '../errors/AlreadyExists'
import AuthenticateError from '../errors/AuthenticateError'
import RefreshTokenError from '../errors/RefreshTokenError'

interface ValidationErrors {
  [key: string]: string[]
}

const handleErrors: ErrorRequestHandler = (error, req, res, next) => {
  if (error instanceof ValidationError) {
    const errors: ValidationErrors = {}

    error.inner.forEach(err => {
      err.path && (errors[err.path] = err.errors)
    })

    return res.status(400).json({
      error: 'Validation fails',
      keys: error.inner.map(err => err.path),
      errors,
    })
  }

  if (error instanceof AlreadyExist) {
    return res
      .status(error.status)
      .json({ error: error.message, keys: error.keys })
  }

  if (error instanceof AuthenticateError) {
    return res.status(401).json({ error: error.message })
  }

  if (error instanceof RefreshTokenError)
    return res.status(401).json({ error: error.message })

  console.log(error)
  return res.status(500).json({ error: 'Internal server error' })
}

export default handleErrors
