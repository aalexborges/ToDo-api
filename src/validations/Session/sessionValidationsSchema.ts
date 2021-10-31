import * as Yup from 'yup'

import Lazy from 'yup/lib/Lazy'
import Reference from 'yup/lib/Reference'

enum SessionValidationsSchemasKeys {
  signIn = 'signIn',
}

type SessionValidationsSchemasType = {
  [key in SessionValidationsSchemasKeys]: Yup.ObjectSchema<{
    [x: string]: Yup.AnySchema | Reference<unknown> | Lazy<any, any>
  }>
}

const sessionValidationsSchemas: SessionValidationsSchemasType = {
  signIn: Yup.object().shape({
    email: Yup.string().required().email().trim(),
    password: Yup.string().required().min(8).max(16).trim(),
  }),
}

export { sessionValidationsSchemas }
