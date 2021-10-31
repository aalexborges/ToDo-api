import request from 'supertest'

import { internet } from 'faker'

import prismaClient from '../../../src/prisma'

import { app } from '../../../src/core/app'

const user = {
  name: 'Test',
  email: internet.email('createUser'),
  password: '123456789',
}

describe('Create User', () => {
  afterAll(async () => {
    await prismaClient.$disconnect()
  })

  it('should not create a user if the data is invalid.', async () => {
    const response = await request(app).post('/users').send({ name: 'Test' })

    expect(response.statusCode).toBe(400)

    expect(response.body).not.toBeNull()
    expect(typeof response.body).toBe('object')

    expect(response.body).toHaveProperty('error')
    expect(response.body.error).toEqual('Validation fails')

    expect(response.body).toHaveProperty('errors')

    expect(response.body).toHaveProperty('code')
    expect(response.body.code).toEqual('data.invalid')
  })

  it('should successfully create a new user', async () => {
    const response = await request(app).post('/users').send(user)

    expect(response.statusCode).toBe(201)

    expect(response.body).not.toBeNull()
    expect(response.body).toMatchObject({
      message: 'User created successfully',
    })
  })

  it('should not create a user with an email that is already being used by another user', async () => {
    const response = await request(app).post('/users').send(user)

    expect(response.statusCode).toBe(400)

    expect(response.body).not.toBeNull()
    expect(response.body).toMatchObject({
      error: 'User already exist',
      identifier: 'email',
      errorCode: 'user.already_exist',
    })
  })
})
