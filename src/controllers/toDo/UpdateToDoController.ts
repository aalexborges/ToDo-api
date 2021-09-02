import { Request, Response } from 'express'

import ToDoValidations from '../../validations/ToDo.validations'
import UpdateToDoService from '../../services/toDo/UpdateToDoService'

class UpdateToDoController {
  async handle(req: Request, res: Response) {
    const { userId } = req
    const { id, task, completed } = req.body

    await ToDoValidations.update({ id, completed, task })

    const toDo = await new UpdateToDoService().execute({
      id,
      userId,
      completed,
      task,
    })

    return res
      .status(200)
      .json({ message: 'ToDo updated successfully', data: toDo })
  }
}

export default UpdateToDoController
