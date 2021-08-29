import { compare } from 'bcryptjs'

import prisma from '../../prisma/prisma'

import Token from '../../utils/Token'
import AuthenticateError from '../../errors/AuthenticateError'

interface SAuthenticateUserData {
  email: string
  password: string
}

class AuthenticateUserService {
  async execute({ email, password }: SAuthenticateUserData) {
    const userExists = await prisma.user.findFirst({ where: { email } })

    if (!userExists) throw new AuthenticateError()

    const passwordMatch = await compare(password, userExists.password)

    if (!passwordMatch) throw new AuthenticateError()

    await prisma.refreshToken.deleteMany({ where: { id: userExists.id } })

    const refreshToken = await new Token().refreshToken(userExists.id)
    const token = await new Token().session(userExists.id)

    return { token, refreshToken }
  }
}

export default AuthenticateUserService
