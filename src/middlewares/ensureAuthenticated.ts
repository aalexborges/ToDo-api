import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

interface IPayload {
  sub: string
}

function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
  const authToken = req.headers.authorization

  if (!authToken) return res.status(401).json({ errorCode: 'token.invalid' })

  const [, token] = authToken.split(' ')

  try {
    const { sub } = verify(token, process.env.JWT_SECRET) as IPayload

    req.userId = sub

    return next()
  } catch (err) {
    return res.status(401).json({ errorCode: 'token.expired' })
  }
}

export { ensureAuthenticated }
