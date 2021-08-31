import { Request, Response } from 'express'

import CreateToDoService from '../../services/toDo/CreateToDoService'
import ToDoValidations from '../../validations/ToDo.validations'

class CreateToDoController {
  async handle(req: Request, res: Response) {
    const { task } = req.body
    const { userId } = req

    await ToDoValidations.create({ task })

    const toDo = await new CreateToDoService().execute({ task, userId })

    return res
      .status(201)
      .json({ message: 'ToDo created successfully', data: toDo })
  }
}

export default CreateToDoController
