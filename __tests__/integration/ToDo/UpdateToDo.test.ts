import request from 'supertest'

import { sign } from 'jsonwebtoken'
import { internet } from 'faker'

import prismaClient from '../../../src/prisma'

import { app } from '../../../src/core/app'

describe('Create ToDo', () => {
  let token: string
  let toDoId: string
  const user = {
    name: 'Test',
    email: internet.email('updateToDo'),
    password: '123456789',
  }

  beforeAll(async () => {
    const { id, ...rest } = await prismaClient.user.create({ data: user })
    const toDo = await prismaClient.toDo.create({
      data: { task: 'Test', userId: id },
    })

    toDoId = toDo.id

    token = sign({ id, ...rest }, process.env.JWT_SECRET, {
      subject: id,
      expiresIn: '5m',
    })
  })

  afterAll(async () => {
    await prismaClient.$disconnect()
  })

  it('should not update a ToDo if the token is invalid', async () => {
    const response = await request(app).patch(`/toDos/${toDoId}`)

    expect(response.statusCode).toBe(401)
    expect(response.body).not.toBeNull()
    expect(response.body).toMatchObject({ errorCode: 'token.invalid' })
  })

  it('should not update a ToDo if the id is invalid', async () => {
    const response = await request(app)
      .patch(`/toDos/id`)
      .set('authorization', `Bearer ${token}`)

    expect(response.statusCode).toBe(400)

    expect(response.body).not.toBeNull()
    expect(typeof response.body).toBe('object')

    expect(response.body).toHaveProperty('error')
    expect(response.body.error).toEqual('Validation fails')

    expect(response.body).toHaveProperty('errors')

    expect(response.body).toHaveProperty('code')
    expect(response.body.code).toEqual('data.invalid')
  })

  it("should not update a ToDo that doesn't exist", async () => {
    const response = await request(app)
      .patch('/toDos/386f6e0c-985c-4011-8f61-6edf5c46b8d4')
      .set('authorization', `Bearer ${token}`)

    expect(response.statusCode).toBe(404)

    expect(response.body).not.toBeNull()
    expect(response.body).toMatchObject({
      error: 'ToDo not found',
      errorCode: 'toDo.not_found',
    })
  })

  it('should update a ToDo', async () => {
    const data = { task: 'Update ToDo', completed: true }
    const response = await request(app)
      .patch(`/toDos/${toDoId}`)
      .set('authorization', `Bearer ${token}`)
      .send(data)

    expect(response.statusCode).toBe(200)

    expect(response.body).not.toBeNull()

    expect(response.body).toHaveProperty('message')
    expect(response.body.message).toEqual('ToDo updated successfully')

    expect(response.body).toHaveProperty('toDo')

    expect(response.body.toDo).toHaveProperty('task')
    expect(response.body.toDo.task).toEqual(data.task)

    expect(response.body.toDo).toHaveProperty('completed')
    expect(response.body.toDo.completed).toEqual(data.completed)
  })

  it('should not update a ToDo if the user does not exist', async () => {
    await expect(
      prismaClient.$transaction([
        prismaClient.toDo.deleteMany({
          where: { user: { email: user.email } },
        }),
        prismaClient.user.delete({ where: { email: user.email } }),
      ])
    ).resolves.toBeTruthy()

    const response = await request(app)
      .patch(`/toDos/${toDoId}`)
      .set('authorization', `Bearer ${token}`)

    expect(response.status).toBe(404)

    expect(response.body).not.toBeNull()
    expect(response.body).toMatchObject({
      error: 'ToDo not found',
      errorCode: 'toDo.not_found',
    })
  })
})
