import prisma from '../../prisma/prisma'

import NotFound from '../../errors/NotFound'

interface SCreateToDoData {
  task: string
  userId: string
}

class CreateToDoService {
  async execute({ task, userId }: SCreateToDoData) {
    const userExists = await prisma.user.findFirst({ where: { id: userId } })

    if (!userExists) throw new NotFound({ msg: 'User not found', status: 401 })

    const toDo = await prisma.toDo.create({
      data: { task, userId },
      select: { id: true, task: true, completed: true, createdAt: true },
    })

    return toDo
  }
}

export default CreateToDoService
