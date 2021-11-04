import request from 'supertest'

import { sign } from 'jsonwebtoken'
import { internet } from 'faker'

import prismaClient from '../../../src/prisma'

import { app } from '../../../src/core/app'

describe('Get User', () => {
  let token: string
  const user = {
    name: 'Test',
    email: internet.email('getUser'),
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

  it("should not get a user's data if the token is invalid", async () => {
    const response = await request(app).get('/users')

    expect(response.statusCode).toBe(401)
    expect(response.body).not.toBeNull()
    expect(response.body).toMatchObject({ errorCode: 'token.invalid' })
  })

  it('should get the data from a user', async () => {
    const response = await request(app)
      .get('/users')
      .set('authorization', `Bearer ${token}`)

    expect(response.statusCode).toBe(200)
    expect(response.body).not.toBeNull()
    expect(response.body).toMatchObject({ name: user.name, email: user.email })
  })

  it("should not get data from a user that doesn't exist", async () => {
    await expect(
      prismaClient.user.delete({ where: { email: user.email } })
    ).resolves.toBeTruthy()

    const response = await request(app)
      .get('/users')
      .set('authorization', `Bearer ${token}`)

    expect(response.status).toBe(401)

    expect(response.body).not.toBeNull()
    expect(response.body).toMatchObject({
      error: 'Session Error',
      errorCode: 'token.invalid',
      description: 'Invalid token',
    })
  })
})
