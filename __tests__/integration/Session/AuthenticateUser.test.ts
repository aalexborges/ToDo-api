import request from 'supertest'

import { internet } from 'faker'
import { genSaltSync, hashSync } from 'bcryptjs'

import prismaClient from '../../../src/prisma'

import { app } from '../../../src/core/app'

describe('Authenticate user', () => {
  const user = {
    name: 'Test',
    email: internet.email('authenticateUser'),
    password: '123456789',
  }

  beforeAll(async () => {
    await prismaClient.user.create({
      data: { ...user, password: hashSync(user.password, genSaltSync(10)) },
    })
  })

  it('should not authenticate a user that does not exist', async () => {
    const response = await request(app)
      .post('/session/signIn')
      .send({ email: 'test@test.com', password: '123456789' })

    expect(response.status).toBe(401)

    expect(response.body).not.toBeNull()
    expect(response.body).toMatchObject({
      error: 'Session Error',
      description: 'Invalid email or password',
      errorCode: 'session.signIn',
    })
  })

  it('should not authenticate a user if the password is invalid', async () => {
    const response = await request(app)
      .post('/session/signIn')
      .send({ email: user.email, password: '987654321' })

    expect(response.status).toBe(401)

    expect(response.body).not.toBeNull()
    expect(response.body).toMatchObject({
      error: 'Session Error',
      description: 'Invalid email or password',
      errorCode: 'session.signIn',
    })
  })

  it('should authenticate a user successfully', async () => {
    const response = await request(app).post('/session/signIn').send(user)

    expect(response.status).toBe(200)

    expect(response.body).not.toBeNull()
    expect(response.body).toHaveProperty('token')
    expect(typeof response.body.token).toBe('string')

    expect(response.body).toHaveProperty('user')
    expect(typeof response.body.user).toBe('object')
    expect(response.body.user).toHaveProperty('name')
    expect(response.body.user).toHaveProperty('email')
  })
})
