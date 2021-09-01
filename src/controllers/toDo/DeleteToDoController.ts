import { Request, Response } from 'express'

import DeleteToDoService from '../../services/toDo/DeleteToDoService'
import ToDoValidations from '../../validations/ToDo.validations'

class DeleteToDoController {
  async handle(req: Request, res: Response) {
    const { id } = req.params
    const { userId } = req

    await ToDoValidations.delete({ id, userId })

    await new DeleteToDoService().execute({ id, userId })

    return res.status(200).json({ message: 'ToDo has been deleted' })
  }
}

export default DeleteToDoController
