import { hash } from 'bcryptjs'

import prisma from '../../prisma/prisma'

import AlreadyExist from '../../errors/AlreadyExists'

interface SCreateUserDate {
  name: string
  email: string
  password: string
}

class CreateUserService {
  async execute({ email, name, password }: SCreateUserDate) {
    const userAlreadyExist = await prisma.user.findFirst({ where: { email } })

    if (userAlreadyExist) {
      throw new AlreadyExist({ msg: 'User already exists', keys: ['email'] })
    }

    const passwordHash = await hash(password, 10)

    const user = await prisma.user.create({
      data: { email, name, password: passwordHash },
    })

    return user
  }
}

export default CreateUserService
