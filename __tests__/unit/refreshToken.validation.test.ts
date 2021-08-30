import { v4 as uuid } from 'uuid'
import { ValidationError } from 'yup'

import refreshTokenValidation from '../../src/validations/refreshToken.validation'

it('should return an error when the data is invalid', async () => {
  await expect(refreshTokenValidation()).rejects.toBeInstanceOf(ValidationError)
})

it('should return undefined when data is valid', async () => {
  await expect(refreshTokenValidation(uuid())).resolves.toBeUndefined()
})
