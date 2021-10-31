import prismaClient from '../../prisma'

import { NotFoundError } from '../../errors/NotFoundError'

type Props = {
  id: string
  userId: string
  task?: string
  completed?: boolean
}

class UpdateToDoService {
  async execute({ id, completed, task, userId }: Props) {
    const toDoExist = await prismaClient.toDo.findFirst({
      where: { id, userId },
    })

    if (!toDoExist) {
      throw new NotFoundError({
        message: 'ToDo not found',
        errorCode: 'toDo.not_found',
      })
    }

    const updatedToDo = await prismaClient.toDo.update({
      where: { id },
      data: {
        task,
        completed,
        completedAt: completed ? new Date() : undefined,
      },
    })

    return updatedToDo
  }
}

export { UpdateToDoService }
