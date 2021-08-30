import dayjs from 'dayjs'

import prisma from '../../prisma/prisma'

import Token from '../../utils/Token'
import RefreshTokenError from '../../errors/RefreshTokenError'

class RefreshTokenService {
  async execute(id: string) {
    const refreshToken = await prisma.refreshToken.findFirst({
      where: { id },
    })

    if (!refreshToken) throw new RefreshTokenError('Refresh token invalid')

    const refreshTokenExpired = dayjs().isAfter(
      dayjs.unix(refreshToken.expiresIn)
    )

    const token = await new Token().session(refreshToken.userId)

    if (!refreshTokenExpired) return { token }

    await prisma.refreshToken.deleteMany({
      where: { userId: refreshToken.userId },
    })

    const newRefreshToken = await new Token().refreshToken(refreshToken.userId)

    return { token, refreshToken: newRefreshToken }
  }
}

export default RefreshTokenService
