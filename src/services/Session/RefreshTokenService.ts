import { sign } from 'jsonwebtoken'

import prismaClient from '../../prisma'

import { SessionError } from '../../errors/SessionError'

class RefreshTokenService {
  async execute(userId: string) {
    const user = await prismaClient.user.findFirst({ where: { id: userId } })

    if (!user) throw new SessionError({ errorCode: 'token.invalid' })

    const newToken = sign(
      { user: { name: user.name, email: user.email } },
      process.env.JWT_SECRET,
      { subject: user.id, expiresIn: '1d' }
    )

    return newToken
  }
}

export { RefreshTokenService }
