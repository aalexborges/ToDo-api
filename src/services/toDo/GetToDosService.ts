import prisma from '../../prisma/prisma'

class GetToDosService {
  async execute(userId: string) {
    const toDos = await prisma.toDo.findMany({
      where: { userId },
      select: {
        id: true,
        task: true,
        completed: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { createdAt: 'asc' },
    })

    return toDos
  }
}

export default GetToDosService
