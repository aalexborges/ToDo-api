import { Request, Response } from 'express'

import { ToDoValidations } from '../../validations/ToDo/ToDoValidations'
import { UpdateToDoService } from '../../services/ToDo/UpdateToDoService'

class UpdateToDoController {
  async handle(req: Request, res: Response) {
    const { id } = req.params
    const { userId } = req
    const { task, completed } = req.body

    await new ToDoValidations({ id, task, completed }).update()

    const toDo = await new UpdateToDoService().execute({
      id,
      task,
      completed,
      userId,
    })

    return res.status(200).json({ message: 'ToDo updated successfully', toDo })
  }
}

export { UpdateToDoController }
