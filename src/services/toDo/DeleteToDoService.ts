import prisma from '../../prisma/prisma'
import NotFound from '../../errors/NotFound'

interface SDeleteToDo {
  id: string
  userId: string
}

class DeleteToDoService {
  async execute({ id, userId }: SDeleteToDo) {
    const toDoExists = await prisma.toDo.findFirst({ where: { id, userId } })

    if (!toDoExists) throw new NotFound({ msg: 'ToDo not found', status: 404 })

    await prisma.toDo.delete({ where: { id: toDoExists.id } })
  }
}

export default DeleteToDoService
