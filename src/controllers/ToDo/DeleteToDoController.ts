import { Request, Response } from 'express'

import { ToDoValidations } from '../../validations/ToDo/ToDoValidations'
import { DeleteToDoService } from '../../services/ToDo/DeleteToDoService'

class DeleteToDoController {
  async handle(req: Request, res: Response) {
    const { id } = req.params
    const { userId } = req

    await new ToDoValidations({ id }).delete()

    await new DeleteToDoService().execute(id, userId)

    return res.status(200).json({ message: 'ToDo deleted successfully' })
  }
}

export { DeleteToDoController }
