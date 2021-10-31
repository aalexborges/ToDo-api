import { Request, Response } from 'express'

import { ToDoValidations } from '../../validations/ToDo/ToDoValidations'
import { CreateToDoService } from '../../services/ToDo/CreateToDoService'

class CreateToDoController {
  async handle(req: Request, res: Response) {
    const { userId } = req
    const { task } = req.body

    await new ToDoValidations({ task }).create()

    const toDo = await new CreateToDoService().execute(task, userId)

    return res.status(201).json({ message: 'ToDo created successfully', toDo })
  }
}

export { CreateToDoController }
