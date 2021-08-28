import { verify } from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'

function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
  const authToken = req.headers.authorization

  if (!authToken) return res.status(401).json({ error: 'Token not provider' })

  const [schema, token] = authToken.split(' ')

  if (!/^Bearer$/i.test(schema))
    return res.status(401).json({ error: 'Malformed token' })

  try {
    const { sub } = verify(token, <string>process.env.JWT_SECRET_KEY)

    req.userId = sub as string

    return next()
  } catch (err) {
    return res.status(401).json({ error: 'Token error' })
  }
}

export default ensureAuthenticated
