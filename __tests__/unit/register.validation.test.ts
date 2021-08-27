import { internet, name } from 'faker'
import { ValidationError } from 'yup'

import registerValidation from '../../src/validations/register.validation'

it('should return an error when the data is invalid', async () => {
  const data = { email: internet.email(), password: internet.password(6) }

  await expect(registerValidation(data)).rejects.toBeInstanceOf(ValidationError)
})

it('should return undefined when data is valid', async () => {
  const data = {
    name: name.findName(),
    email: internet.email(),
    password: internet.password(9),
  }

  await expect(registerValidation(data)).resolves.toBeUndefined()
})
