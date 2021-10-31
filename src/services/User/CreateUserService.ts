import { hash, genSaltSync } from 'bcryptjs'

import prismaClient from '../../prisma'

import { AlreadyExistError } from '../../errors/AlreadyExistError'

export type UserType = {
  name: string
  email: string
  password: string
}

class CreateUserService {
  async execute({ email, name, password }: UserType) {
    const userAlreadyExist = await prismaClient.user.findFirst({
      where: { email },
    })

    if (userAlreadyExist) {
      throw new AlreadyExistError({
        errorCode: 'user.already_exist',
        message: 'User already exist',
        identifier: 'email',
      })
    }

    const passwordHash = await hash(password, genSaltSync(10))

    const user = await prismaClient.user.create({
      data: { email, name, password: passwordHash },
    })

    return user
  }
}

export { CreateUserService }
