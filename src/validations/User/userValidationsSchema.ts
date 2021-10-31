import * as Yup from 'yup'

import Lazy from 'yup/lib/Lazy'
import Reference from 'yup/lib/Reference'

enum UserValidationsSchemasKeys {
  create = 'create',
  delete = 'delete',
}

type UserValidationsSchemasType = {
  [key in UserValidationsSchemasKeys]: Yup.ObjectSchema<{
    [x: string]: Yup.AnySchema | Reference<unknown> | Lazy<any, any>
  }>
}

const userValidationsSchemas: UserValidationsSchemasType = {
  create: Yup.object().shape({
    name: Yup.string().required().min(2).trim(),
    email: Yup.string().required().email().trim(),
    password: Yup.string().required().min(8).max(16).trim(),
  }),

  delete: Yup.object().shape({
    password: Yup.string().required().min(8).max(16).trim(),
  }),
}

export { userValidationsSchemas }
