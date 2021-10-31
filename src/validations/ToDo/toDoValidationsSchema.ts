import * as Yup from 'yup'

import Lazy from 'yup/lib/Lazy'
import Reference from 'yup/lib/Reference'

enum ToDoValidationsSchemasKeys {
  create = 'create',
  update = 'update',
  delete = 'delete',
}

type ToDoValidationsSchemasType = {
  [key in ToDoValidationsSchemasKeys]: Yup.ObjectSchema<{
    [x: string]: Yup.AnySchema | Reference<unknown> | Lazy<any, any>
  }>
}

const toDoValidationsSchemas: ToDoValidationsSchemasType = {
  create: Yup.object().shape({
    task: Yup.string().required().min(2).trim(),
  }),

  update: Yup.object().shape({
    id: Yup.string().required().uuid().trim(),
    task: Yup.string().notRequired().min(2).trim(),
    completed: Yup.boolean().notRequired(),
  }),

  delete: Yup.object().shape({
    id: Yup.string().required().uuid().trim(),
  }),
}

export { toDoValidationsSchemas }
