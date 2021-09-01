import * as Yup from 'yup'

interface VCreateToDoDate {
  task?: string
}

interface VDeleteToDoDate {
  id?: string
  userId?: string
}

class ToDoValidations {
  static async create({ task }: VCreateToDoDate) {
    const schema = Yup.object().shape({
      task: Yup.string().required().trim(),
    })

    await schema.validate({ task }, { abortEarly: false })
  }

  static async delete({ id, userId }: VDeleteToDoDate) {
    const schema = Yup.object().shape({
      id: Yup.string().required().uuid().trim(),
      userId: Yup.string().required().uuid().trim(),
    })

    await schema.validate({ id, userId }, { abortEarly: false })
  }
}

export default ToDoValidations
