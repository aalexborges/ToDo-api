import { Request, Response } from 'express'

import { RefreshTokenService } from '../../services/Session/RefreshTokenService'

class RefreshTokenController {
  async handle(req: Request, res: Response) {
    const { userId } = req

    const token = await new RefreshTokenService().execute(userId)

    return res
      .status(200)
      .json({ message: 'A new token was successfully generated', token })
  }
}

export { RefreshTokenController }
