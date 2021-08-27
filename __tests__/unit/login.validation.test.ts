import { internet } from 'faker'
import { ValidationError } from 'yup'

import loginValidation from '../../src/validations/login.validation'

it('should return an error when the data is invalid', async () => {
  const data = { email: internet.email(), password: internet.password(6) }

  await expect(loginValidation(data)).rejects.toBeInstanceOf(ValidationError)
})

it('should return undefined when data is valid', async () => {
  const data = { email: internet.email(), password: internet.password(9) }

  await expect(loginValidation(data)).resolves.toBeUndefined()
})
