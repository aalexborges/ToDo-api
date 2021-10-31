import prismaClient from '../../src/prisma'

async function clearDB() {
  console.log('👾  Cleaning database')

  await prismaClient.$transaction([
    prismaClient.toDo.deleteMany(),
    prismaClient.user.deleteMany(),
  ])

  console.log('✔ Database has been cleaned')

  await prismaClient.$disconnect()
  console.log('✔ Database has been disconnected')
}

clearDB()
