import request from 'supertest'

import { internet, name } from 'faker'

import app from '../../../src/core/app'
import Token from '../../../src/utils/Token'
import prisma from '../../../src/prisma/prisma'
import clearDB from '../../utils/clearDB'

describe('Get ToDos', () => {
  afterAll(async () => await clearDB())

  it('should not return ToDos if token is invalid', async () => {
    const response = await request(app)
      .get('/toDos')
      .set('Authorization', 'Type token')

    expect(response.status).toBe(401)
    expect(response.body).toHaveProperty('error')
  })

  it('must get the ToDos if the token is valid', async () => {
    const data = {
      email: internet.email(),
      name: name.findName(),
      password: internet.password(10),
    }

    const user = await prisma.user.create({ data })
    const token = await new Token().session(user.id)

    const response = await request(app)
      .get('/toDos')
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(200)
    expect(Array.isArray(response.body)).toBe(true)
  })
})
