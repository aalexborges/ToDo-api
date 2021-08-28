import prisma from '../../src/prisma/prisma'

async function clearDB(notDisconnect?: boolean) {
  const deleteToDos = prisma.toDo.deleteMany()
  const deleteUsers = prisma.user.deleteMany()

  await prisma.$transaction([deleteToDos, deleteUsers])

  if (!notDisconnect) await prisma.$disconnect()
}

export default clearDB
