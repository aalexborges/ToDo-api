import prisma from '../../prisma/prisma'
import NotFound from '../../errors/NotFound'

interface SUpdateToDoData {
  id: string
  task?: string
  userId: string
  completed?: boolean
}

class UpdateToDoService {
  async execute({ id, completed, userId, task }: SUpdateToDoData) {
    const toDoExists = await prisma.toDo.findFirst({ where: { id, userId } })

    if (!toDoExists) throw new NotFound({ msg: 'ToDo not found' })

    const toDo = await prisma.toDo.update({
      where: { id },
      data: { completed, task },
      select: { id: true, task: true, completed: true, createdAt: true },
    })

    return toDo
  }
}

export default UpdateToDoService
