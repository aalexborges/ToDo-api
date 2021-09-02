import * as Yup from 'yup'

interface VCreateToDoData {
  task?: string
}

interface VUpdateToDoData {
  task?: string
  completed?: boolean
}

interface VDeleteToDoData {
  id?: string
  userId?: string
}

class ToDoValidations {
  static async create({ task }: VCreateToDoData) {
    const schema = Yup.object().shape({
      task: Yup.string().required().trim(),
    })

    await schema.validate({ task }, { abortEarly: false })
  }

  static async update({ completed, task }: VUpdateToDoData) {
    const schema = Yup.object().shape({
      task: Yup.string().notRequired().trim(),
      completed: Yup.boolean().notRequired(),
    })

    await schema.validate({ completed, task }, { abortEarly: false })
  }

  static async delete({ id, userId }: VDeleteToDoData) {
    const schema = Yup.object().shape({
      id: Yup.string().required().uuid().trim(),
      userId: Yup.string().required().uuid().trim(),
    })

    await schema.validate({ id, userId }, { abortEarly: false })
  }
}

export default ToDoValidations
