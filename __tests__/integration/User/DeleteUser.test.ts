import request from 'supertest'

import { sign } from 'jsonwebtoken'
import { internet } from 'faker'
import { genSaltSync, hashSync } from 'bcryptjs'

import prismaClient from '../../../src/prisma'

import { app } from '../../../src/core/app'

describe('Delete User', () => {
  let token: string
  const user = {
    name: 'Test',
    email: internet.email('deleteUser'),
    password: '123456789',
  }

  beforeAll(async () => {
    const { id, ...rest } = await prismaClient.user.create({
      data: { ...user, password: hashSync(user.password, genSaltSync(10)) },
    })

    token = sign({ id, ...rest }, process.env.JWT_SECRET, {
      subject: id,
      expiresIn: '5m',
    })
  })

  afterAll(async () => {
    await prismaClient.$disconnect()
  })

  it('should not delete a user if the token is invalid', async () => {
    const response = await request(app).post('/users/delete')

    expect(response.statusCode).toBe(401)

    expect(response.body).not.toBeNull()
    expect(response.body).toMatchObject({ errorCode: 'token.invalid' })
  })

  it('should not delete a user if the password is invalid', async () => {
    const response = await request(app)
      .post('/users/delete')
      .set('authorization', `Bearer ${token}`)
      .send({ password: '987654321' })

    expect(response.statusCode).toBe(401)

    expect(response.body).not.toBeNull()
    expect(response.body).toMatchObject({
      error: 'Unauthorized action',
      description: 'Invalid password',
      errorCode: 'user.delete_not_authorized',
    })
  })

  it('should delete a user successfully', async () => {
    const response = await request(app)
      .post('/users/delete')
      .set('authorization', `Bearer ${token}`)
      .send({ password: user.password })

    expect(response.statusCode).toBe(200)

    expect(response.body).not.toBeNull()
    expect(response.body).toMatchObject({
      message: 'User deleted successfully',
    })
  })

  it("shouldn't delete a user that doesn't exist", async () => {
    const response = await request(app)
      .post('/users/delete')
      .set('authorization', `Bearer ${token}`)
      .send({ password: user.password })

    expect(response.statusCode).toBe(401)

    expect(response.body).not.toBeNull()
    expect(response.body).toMatchObject({
      error: 'Session Error',
      description: 'User not found',
      errorCode: 'user.not_found',
    })
  })
})
