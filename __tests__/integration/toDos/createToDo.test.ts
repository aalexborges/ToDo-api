import request from 'supertest'

import { v4 as uuid } from 'uuid'
import { internet, name } from 'faker'

import app from '../../../src/core/app'
import Token from '../../../src/utils/Token'
import prisma from '../../../src/prisma/prisma'
import clearDB from '../../utils/clearDB'

describe('Create toDo', () => {
  afterAll(async () => await clearDB())

  it('must not create a new toDo if the token is invalid', async () => {
    const response = await request(app)
      .post('/toDos')
      .set('Authorization', 'Bearer invalidToken')
      .send({ task: 'Test' })

    expect(response.status).toBe(401)
    expect(response.body).toHaveProperty('error')
  })

  it('must create a new toDo if token and data are valid', async () => {
    const data = {
      email: internet.email(),
      name: name.findName(),
      password: internet.password(10),
    }

    const user = await prisma.user.create({ data })
    const token = await new Token().session(user.id)

    const response = await request(app)
      .post('/toDos')
      .set('Authorization', `Bearer ${token}`)
      .send({ task: 'Crete tests' })

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('message')
    expect(response.body).toHaveProperty('data')
  })

  it('should not create a new toDo if the user does not exist', async () => {
    const token = await new Token().session(uuid())

    const response = await request(app)
      .post('/toDos')
      .set('Authorization', `Bearer ${token}`)
      .send({ task: 'Create tests' })

    expect(response.status).toBe(401)
    expect(response.body).toHaveProperty('error')
  })
})
