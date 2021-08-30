import { Request, Response } from 'express'

import RefreshTokenService from '../../services/sessions/RefreshTokenService'
import refreshTokenValidation from '../../validations/refreshToken.validation'

class RefreshTokenController {
  async handle(req: Request, res: Response) {
    const { refreshToken } = req.body

    await refreshTokenValidation(refreshToken)

    const newToken = await new RefreshTokenService().execute(refreshToken)

    return res.status(200).json(newToken)
  }
}

export default RefreshTokenController
