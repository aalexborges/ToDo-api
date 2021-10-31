import { Router } from 'express'

// Controllers
import { GetToDosController } from '../controllers/ToDo/GetToDosController'
import { CreateToDoController } from '../controllers/ToDo/CreateToDoController'
import { DeleteToDoController } from '../controllers/ToDo/DeleteToDoController'
import { UpdateToDoController } from '../controllers/ToDo/UpdateToDoController'

// Middlewares
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

const toDoRoutes = Router()

toDoRoutes.get('/', ensureAuthenticated, new GetToDosController().handle)
toDoRoutes.post('/', ensureAuthenticated, new CreateToDoController().handle)
toDoRoutes.patch('/:id', ensureAuthenticated, new UpdateToDoController().handle)

toDoRoutes.delete(
  '/:id',
  ensureAuthenticated,
  new DeleteToDoController().handle
)

export { toDoRoutes }
