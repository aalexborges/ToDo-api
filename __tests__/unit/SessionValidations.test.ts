import { ValidationError } from 'yup'

import { SessionValidations } from '../../src/validations/Session/SessionValidations'

describe('Test the singIn validation', () => {
  it('should return a void if the data is valid.', async () => {
    await expect(
      new SessionValidations({
        email: 'test@test.com',
        password: '123456789',
      }).singIn()
    ).resolves.toBeUndefined()
  })

  it('should return an error if the data is invalid.', async () => {
    await expect(
      new SessionValidations({ email: 'test@', password: '1234' }).singIn()
    ).rejects.toBeInstanceOf(ValidationError)
  })
})
