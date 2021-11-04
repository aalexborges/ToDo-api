import prismaClient from '../../prisma'

import { SessionError } from '../../errors/SessionError'

class GetUserService {
  async execute(id: string) {
    const user = await prismaClient.user.findFirst({
      where: { id },
      select: { name: true, email: true },
    })

    if (!user) {
      throw new SessionError({
        errorCode: 'token.invalid',
        description: 'Invalid token',
      })
    }

    return user
  }
}

export { GetUserService }
