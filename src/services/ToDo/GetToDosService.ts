import prismaClient from '../../prisma'

class GetToDosService {
  async execute(userId: string) {
    const toDos = await prismaClient.toDo.findMany({
      where: { userId },
      select: {
        id: true,
        task: true,
        completed: true,
        completedAt: true,
        createdAt: true,
      },
    })

    return toDos
  }
}

export { GetToDosService }
