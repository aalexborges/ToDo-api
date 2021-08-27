import prisma from '../../src/prisma/prisma'

async function clearDB(notDisconnect?: boolean) {
  const deleteUsers = prisma.user.deleteMany()

  await prisma.$transaction([deleteUsers])

  if (!notDisconnect) await prisma.$disconnect()
}

export default clearDB
