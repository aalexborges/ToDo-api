import * as Yup from 'yup'

interface VCreateToDoDate {
  task?: string
}

class ToDoValidations {
  static async create({ task }: VCreateToDoDate) {
    const schema = Yup.object().shape({
      task: Yup.string().required().trim(),
    })

    await schema.validate({ task }, { abortEarly: false })
  }
}

export default ToDoValidations
