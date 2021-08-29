import request from 'supertest'

import { internet, name } from 'faker'

import app from '../../../src/core/app'
import clearDB from '../../utils/clearDB'

describe('Authenticate user', () => {
  afterAll(async () => await clearDB())

  it('should not authenticate if the user does not exist', async () => {
    const data = { email: internet.email(), password: internet.password(10) }

    const response = await request(app).post('/sessions').send(data)

    expect(response.status).toBe(401)
    expect(response.body).toMatchObject({ error: 'Email or password invalid' })
  })

  it('must authenticate when credentials are valid', async () => {
    const data = { email: internet.email(), password: internet.password(10) }

    const user = await request(app)
      .post('/users')
      .send({ ...data, name: name.findName() })

    expect(user.status).toBe(201)

    const response = await request(app).post('/sessions').send(data)

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('token')
    expect(response.body).toHaveProperty('refreshToken')
  })
})
