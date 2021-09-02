import request from 'supertest'

import { v4 as uuid } from 'uuid'
import { internet, name } from 'faker'

import app from '../../../src/core/app'
import Token from '../../../src/utils/Token'
import prisma from '../../../src/prisma/prisma'
import clearDB from '../../utils/clearDB'

describe('Updated ToDo', () => {
  afterAll(async () => await clearDB())

  it('should not update toDo if token is invalid', async () => {
    const response = await request(app)
      .put('/toDos')
      .set('Authorization', 'token')

    expect(response.status).toBe(401)
    expect(response.body).toHaveProperty('error')
  })

  it("should not update a toDo that doesn't exist", async () => {
    const userData = {
      name: name.findName(),
      email: internet.email(),
      password: internet.password(9),
    }

    const user = await prisma.user.create({ data: userData })

    const token = await new Token().session(user.id)

    const response = await request(app)
      .put('/toDos')
      .set('Authorization', `Bearer ${token}`)
      .send({ id: uuid(), completed: true })

    expect(response.status).toBe(404)
    expect(response.body).toMatchObject({ error: 'ToDo not found' })
  })

  it('should not update a ToDo from another user', async () => {
    const usersData = [
      {
        name: name.findName(),
        email: internet.email(),
        password: internet.password(9),
      },
      {
        name: name.findName(),
        email: internet.email(),
        password: internet.password(9),
      },
    ]

    const user1 = await prisma.user.create({ data: usersData[0] })
    const user2 = await prisma.user.create({ data: usersData[1] })

    const toDo = await prisma.toDo.create({
      data: { task: 'test', userId: user1.id },
    })

    const token = await new Token().session(user2.id)

    const response = await request(app)
      .put('/toDos')
      .set('Authorization', `Bearer ${token}`)
      .send({ id: toDo.id, completed: true })

    expect(response.status).toBe(404)
    expect(response.body).toMatchObject({ error: 'ToDo not found' })
  })

  it('should update ToDo when all data is valid', async () => {
    const userData = {
      name: name.findName(),
      email: internet.email(),
      password: internet.password(9),
    }

    const user = await prisma.user.create({ data: userData })
    const toDo = await prisma.toDo.create({
      data: { task: 'test', userId: user.id },
    })

    const token = await new Token().session(user.id)

    const response = await request(app)
      .put('/toDos')
      .set('Authorization', `Bearer ${token}`)
      .send({ id: toDo.id, completed: true })

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('message')
    expect(response.body).toHaveProperty('data')
  })
})
