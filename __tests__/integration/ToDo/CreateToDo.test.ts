import request from 'supertest'

import { sign } from 'jsonwebtoken'
import { internet } from 'faker'

import prismaClient from '../../../src/prisma'

import { app } from '../../../src/core/app'

describe('Create ToDo', () => {
  let token: string
  const user = {
    name: 'Test',
    email: internet.email('createToDo'),
    password: '123456789',
  }

  beforeAll(async () => {
    const { id, ...rest } = await prismaClient.user.create({ data: user })

    token = sign({ id, ...rest }, process.env.JWT_SECRET, {
      subject: id,
      expiresIn: '5m',
    })
  })

  afterAll(async () => {
    await prismaClient.$disconnect()
  })

  it('should not create a new ToDo if the token is invalid', async () => {
    const response = await request(app).post('/toDos')

    expect(response.statusCode).toBe(401)
    expect(response.body).not.toBeNull()
    expect(response.body).toMatchObject({ errorCode: 'token.invalid' })
  })

  it('should not create a new ToDo if the data is invalid', async () => {
    const response = await request(app)
      .post('/toDos')
      .set('authorization', `Bearer ${token}`)
      .send({ task: '' })

    expect(response.statusCode).toBe(400)
    expect(response.body).not.toBeNull()
    expect(typeof response.body).toBe('object')

    expect(response.body).toHaveProperty('error')
    expect(response.body.error).toEqual('Validation fails')

    expect(response.body).toHaveProperty('errors')

    expect(response.body).toHaveProperty('code')
    expect(response.body.code).toEqual('data.invalid')
  })

  it('should create a new ToDo', async () => {
    const response = await request(app)
      .post('/toDos')
      .set('authorization', `Bearer ${token}`)
      .send({ task: 'Test the API' })

    expect(response.statusCode).toBe(201)
    expect(response.body).not.toBeNull()

    expect(response.body).toHaveProperty('message')
    expect(response.body.message).toEqual('ToDo created successfully')

    expect(response.body).toHaveProperty('toDo')
    expect(typeof response.body.toDo).toBe('object')
    expect(typeof response.body.toDo).toBeTruthy()
  })

  it('should not create a ToDo if the user does not exist', async () => {
    await expect(
      prismaClient.$transaction([
        prismaClient.toDo.deleteMany({
          where: { user: { email: user.email } },
        }),
        prismaClient.user.delete({ where: { email: user.email } }),
      ])
    ).resolves.toBeTruthy()

    const response = await request(app)
      .post('/toDos')
      .set('authorization', `Bearer ${token}`)
      .send({ task: 'Test' })

    expect(response.status).toBe(401)

    expect(response.body).not.toBeNull()
    expect(response.body).toMatchObject({
      error: 'Session Error',
      errorCode: 'token.invalid',
      description: 'Invalid token',
    })
  })
})
