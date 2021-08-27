import request from 'supertest'

import { internet, name } from 'faker'

import app from '../../../src/core/app'
import clearDB from '../../utils/clearDB'

describe('Create User', () => {
  afterAll(async () => await clearDB())

  it('should successfully create a user when the data is valid', async () => {
    const data = {
      name: name.findName(),
      email: internet.email(),
      password: internet.password(9),
    }

    const response = await request(app).post('/users').send(data)

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('message')
  })

  it('should not create a user with an email used by another user', async () => {
    const data = {
      name: name.findName(),
      email: internet.email(),
      password: internet.password(9),
    }

    const userOne = await request(app).post('/users').send(data)

    expect(userOne.status).toBe(201)
    expect(userOne.body).toHaveProperty('message')

    const userTwo = await request(app).post('/users').send(data)

    console.log(userTwo.body)

    expect(userTwo.status).toBe(400)
    expect(userTwo.body).toHaveProperty('error')
    expect(userTwo.body).toHaveProperty('keys')
  })
})
