import { Request, Response } from 'express'

import { UserValidations } from '../../validations/User/UserValidations'
import { CreateUserService } from '../../services/User/CreateUserService'

class CreateUserController {
  async handle(req: Request, res: Response) {
    const { email, name, password } = req.body

    await new UserValidations({ email, name, password }).create()
    await new CreateUserService().execute({ email, name, password })

    return res.status(201).json({ message: 'User created successfully' })
  }
}

export { CreateUserController }
