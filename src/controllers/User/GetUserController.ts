import { Request, Response } from 'express'

import { GetUserService } from '../../services/User/GetUserService'

class GetUserController {
  async handle(req: Request, res: Response) {
    const { userId } = req

    const user = await new GetUserService().execute(userId)

    return res.status(200).json(user)
  }
}

export { GetUserController }
