import { compareSync } from 'bcryptjs'

import prismaClient from '../../prisma'

import { SessionError } from '../../errors/SessionError'
import { UnauthorizedActionError } from '../../errors/UnauthorizedActionError'

class DeleteUserService {
  async execute(id: string, password: string) {
    const userExist = await prismaClient.user.findFirst({ where: { id } })

    if (!userExist) {
      throw new SessionError({
        errorCode: 'user.not_found',
        description: 'User not found',
      })
    }

    if (!compareSync(password, userExist.password)) {
      throw new UnauthorizedActionError({
        errorCode: 'user.delete_not_authorized',
        description: 'Invalid password',
      })
    }

    await prismaClient.$transaction([
      prismaClient.toDo.deleteMany({ where: { userId: id } }),
      prismaClient.user.delete({ where: { id } }),
    ])
  }
}

export { DeleteUserService }
