import { Request, Response } from 'express'

import { UserValidations } from '../../validations/User/UserValidations'
import { DeleteUserService } from '../../services/User/DeleteUserService'

class DeleteUserController {
  async handle(req: Request, res: Response) {
    const { userId } = req
    const { password } = req.body

    await new UserValidations({ password }).delete()

    await new DeleteUserService().execute(userId, password)

    res.status(200).json({ message: 'User deleted successfully' })
  }
}

export { DeleteUserController }
