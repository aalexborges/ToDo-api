import dayjs from 'dayjs'

import { sign } from 'jsonwebtoken'

import prisma from '../prisma/prisma'

class Token {
  async session(userId: string, expiresIn?: string | number) {
    const token = sign({}, <string>process.env.JWT_SECRET_KEY, {
      subject: userId,
      expiresIn: expiresIn || '15m',
    })

    return token
  }

  async refreshToken(userId: string) {
    const expiresIn = dayjs().add(1, 'day').unix()

    const generateRefreshToken = await prisma.refreshToken.create({
      data: { userId, expiresIn },
      select: { id: true, expiresIn: true },
    })

    return generateRefreshToken
  }
}

export default Token
