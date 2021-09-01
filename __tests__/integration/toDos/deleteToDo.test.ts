import request from 'supertest'

import { v4 as uuid } from 'uuid'
import { internet, name } from 'faker'

import app from '../../../src/core/app'
import Token from '../../../src/utils/Token'
import prisma from '../../../src/prisma/prisma'
import clearDB from '../../utils/clearDB'

describe('Delete ToDo', () => {
  afterAll(async () => await clearDB())

  it('must not delete a toDo if the token is invalid', async () => {
    const response = await request(app)
      .delete(`/toDos/${uuid()}`)
      .set('Authorization', 'Bearer token')

    expect(response.status).toBe(401)
    expect(response.body).toHaveProperty('error')
  })

  it("should not delete a todo that doesn't exist", async () => {
    const data = {
      email: internet.email(),
      name: name.findName(),
      password: internet.password(10),
    }

    const user = await prisma.user.create({ data })
    const token = await new Token().session(user.id)

    const response = await request(app)
      .delete(`/toDos/${uuid()}`)
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(404)
    expect(response.body).toMatchObject({ error: 'ToDo not found' })
  })

  it('must delete a toDo successfully when the data is valid', async () => {
    const data = {
      email: internet.email(),
      name: name.findName(),
      password: internet.password(10),
    }

    const user = await prisma.user.create({ data })
    const toDo = await prisma.toDo.create({
      data: { task: 'test', userId: user.id },
    })

    const token = await new Token().session(user.id)

    const response = await request(app)
      .delete(`/toDos/${toDo.id}`)
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(200)
    expect(response.body).toMatchObject({ message: 'ToDo has been deleted' })
  })
})
