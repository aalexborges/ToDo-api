import { compareSync } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

import prismaClient from '../../prisma'

import { SessionError } from '../../errors/SessionError'

export type SignIn = {
  email: string
  password: string
}

class AuthenticateUserService {
  async execute({ email, password }: SignIn) {
    const userExist = await prismaClient.user.findFirst({ where: { email } })

    if (!userExist || !compareSync(password, userExist.password)) {
      throw new SessionError({
        errorCode: 'session.signIn',
        description: 'Invalid email or password',
      })
    }

    const token = sign(
      {
        user: { name: userExist.name, email: userExist.email },
      },
      process.env.JWT_SECRET,
      { subject: userExist.id, expiresIn: '1d' }
    )

    return { token, user: userExist }
  }
}

export { AuthenticateUserService }
