import { Router } from 'express'

// Controllers
import CreateToDoController from '../controllers/toDo/CreateToDoController'
import GetToDosController from '../controllers/toDo/GetToDosController'
import UpdateToDoController from '../controllers/toDo/UpdateToDoController'
import DeleteToDoController from '../controllers/toDo/DeleteToDoController'

// Middlewares
import ensureAuthenticated from '../middlewares/ensureAuthenticated'

const createToDo = new CreateToDoController()
const getToDos = new GetToDosController()
const updateToDos = new UpdateToDoController()
const deleteToDos = new DeleteToDoController()

const toDosRoutes = Router()

toDosRoutes.get('/', ensureAuthenticated, getToDos.handle)
toDosRoutes.post('/', ensureAuthenticated, createToDo.handle)
toDosRoutes.put('/', ensureAuthenticated, updateToDos.handle)
toDosRoutes.delete('/:id', ensureAuthenticated, deleteToDos.handle)

export default toDosRoutes
