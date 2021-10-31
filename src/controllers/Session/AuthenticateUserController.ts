import { Request, Response } from 'express'

import { SessionValidations } from '../../validations/Session/SessionValidations'
import { AuthenticateUserService } from '../../services/Session/AuthenticateUserService'

class AuthenticateUserController {
  async handle(req: Request, res: Response) {
    const { email, password } = req.body

    await new SessionValidations({ email, password }).singIn()

    const { token, user } = await new AuthenticateUserService().execute({
      email,
      password,
    })

    return res
      .status(200)
      .json({ token, user: { name: user.name, email: user.email } })
  }
}

export { AuthenticateUserController }
