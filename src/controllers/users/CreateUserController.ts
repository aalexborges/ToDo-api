import { Request, Response } from 'express'

import CreateUserService from '../../services/users/CreateUserService'
import registerValidation from '../../validations/register.validation'

class CreateUserController {
  async handle(req: Request, res: Response) {
    const { name, email, password } = req.body

    await registerValidation({ name, email, password })

    await new CreateUserService().execute({ name, email, password })

    return res.status(201).json({ message: 'User created successfully' })
  }
}

export default CreateUserController
