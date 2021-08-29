import { Request, Response } from 'express'

import loginValidation from '../../validations/login.validation'
import AuthenticateUserService from '../../services/sessions/AuthenticateUserService'

class AuthenticateUserController {
  async handle(req: Request, res: Response) {
    const { email, password } = req.body

    await loginValidation({ email, password })

    const { token, refreshToken } = await new AuthenticateUserService().execute(
      {
        email,
        password,
      }
    )

    return res.status(200).json({ token, refreshToken })
  }
}

export default AuthenticateUserController
