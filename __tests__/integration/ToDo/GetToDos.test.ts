import request from 'supertest'

import { sign } from 'jsonwebtoken'
import { internet } from 'faker'

import prismaClient from '../../../src/prisma'

import { app } from '../../../src/core/app'

describe('Create ToDo', () => {
  let token: string
  const user = {
    name: 'Test',
    email: internet.email('getToDos'),
    password: '123456789',
  }

  beforeAll(async () => {
    const { id, ...rest } = await prismaClient.user.create({ data: user })
    await prismaClient.toDo.create({ data: { task: 'Test', userId: id } })

    token = sign({ id, ...rest }, process.env.JWT_SECRET, {
      subject: id,
      expiresIn: '5m',
    })
  })

  afterAll(async () => {
    await prismaClient.$disconnect()
  })

  it('should not get ToDos if token is invalid', async () => {
    const response = await request(app).get('/toDos')

    expect(response.statusCode).toBe(401)
    expect(response.body).not.toBeNull()
    expect(response.body).toMatchObject({ errorCode: 'token.invalid' })
  })

  it('should get all user ToDos', async () => {
    const response = await request(app)
      .get('/toDos')
      .set('authorization', `Bearer ${token}`)

    expect(response.statusCode).toBe(200)
    expect(response.body).not.toBeNull()
    expect(Array.isArray(response.body)).toBe(true)
    expect(response.body).toHaveLength(1)
  })
})
