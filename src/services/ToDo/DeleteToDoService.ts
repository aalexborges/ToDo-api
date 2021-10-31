import prismaClient from '../../prisma'

import { NotFoundError } from '../../errors/NotFoundError'

class DeleteToDoService {
  async execute(id: string, userId: string) {
    const toDo = await prismaClient.toDo.findFirst({ where: { id, userId } })

    if (!toDo) {
      throw new NotFoundError({
        message: 'ToDo not found',
        errorCode: 'toDo.not_found',
      })
    }

    await prismaClient.toDo.delete({ where: { id } })
  }
}

export { DeleteToDoService }
