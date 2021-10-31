import request from 'supertest'

import { sign } from 'jsonwebtoken'
import { internet } from 'faker'

import prismaClient from '../../../src/prisma'

import { app } from '../../../src/core/app'

describe('Refresh token', () => {
  let token: string
  const user = {
    name: 'Test',
    email: internet.email('refreshToken'),
    password: '123456789',
  }

  beforeAll(async () => {
    const { id, ...rest } = await prismaClient.user.create({ data: user })

    token = sign({ id, ...rest }, process.env.JWT_SECRET, {
      subject: id,
      expiresIn: '5m',
    })
  })

  it('should not return a new token if the current token has expired', async () => {
    const expiredToken = sign({}, process.env.JWT_SECRET, { expiresIn: '1ms' })

    const response = await request(app)
      .post('/session/token/refresh')
      .set('authorization', `Bearer ${expiredToken}`)

    expect(response.statusCode).toBe(401)

    expect(response.body).not.toBeNull()
    expect(response.body).toMatchObject({ errorCode: 'token.expired' })
  })

  it('should return a new token', async () => {
    const response = await request(app)
      .post('/session/token/refresh')
      .set('authorization', `Bearer ${token}`)

    expect(response.status).toBe(200)
    expect(response.body).not.toBeNull()

    expect(response.body).toHaveProperty('message')
    expect(response.body.message).toEqual(
      'A new token was successfully generated'
    )

    expect(response.body).toHaveProperty('token')
    expect(typeof response.body.token).toBe('string')
  })

  it('should not return a new token if the user does not exist', async () => {
    await expect(
      prismaClient.user.delete({ where: { email: user.email } })
    ).resolves.toBeTruthy()

    const response = await request(app)
      .post('/session/token/refresh')
      .set('authorization', `Bearer ${token}`)

    expect(response.status).toBe(401)

    expect(response.body).not.toBeNull()
    expect(response.body).toMatchObject({
      error: 'Session Error',
      errorCode: 'token.invalid',
    })
  })
})
