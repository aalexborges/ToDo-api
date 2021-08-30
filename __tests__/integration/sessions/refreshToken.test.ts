import request from 'supertest'

import { v4 as uuid } from 'uuid'
import { internet, name } from 'faker'

import app from '../../../src/core/app'
import clearDB from '../../utils/clearDB'

describe('Refresh Token - Generate new token', () => {
  afterAll(async () => await clearDB())

  it('should not generate a new token if refresh token is invalid', async () => {
    const response = await request(app)
      .post('/sessions/refreshToken')
      .send({ refreshToken: uuid() })

    expect(response.status).toBe(401)
    expect(response.body).toHaveProperty('error')
  })

  it('must generate a new token if refresh token is valid', async () => {
    const userData = {
      email: internet.email(),
      name: name.findName(),
      password: internet.password(10),
    }

    const user = await request(app).post('/users').send(userData)
    expect(user.status).toBe(201)

    const session = await request(app).post('/sessions').send(userData)
    expect(session.status).toBe(200)
    expect(session.body).toHaveProperty('refreshToken')

    const refreshToken = session.body.refreshToken.id

    const response = await request(app)
      .post('/sessions/refreshToken')
      .send({ refreshToken })

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('token')
  })
})
