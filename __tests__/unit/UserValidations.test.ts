import { ValidationError } from 'yup'

import { UserValidations } from '../../src/validations/User/UserValidations'

describe('Test the create validation', () => {
  it('should return a void if the data is valid.', async () => {
    await expect(
      new UserValidations({
        name: 'Test',
        email: 'test@teste.com',
        password: '123456789',
      }).create()
    ).resolves.toBeUndefined()
  })

  it('should return an error if the data is invalid.', async () => {
    await expect(
      new UserValidations({
        name: 'Test',
        email: 'test',
        password: '1234',
      }).create()
    ).rejects.toBeInstanceOf(ValidationError)
  })
})

describe('Test the delete validation', () => {
  it('should return a void if the data is valid.', async () => {
    await expect(
      new UserValidations({ password: '123456789' }).delete()
    ).resolves.toBeUndefined()
  })

  it('should return an error if the data is invalid.', async () => {
    await expect(
      new UserValidations({ password: '1234' }).delete()
    ).rejects.toBeInstanceOf(ValidationError)
  })
})
