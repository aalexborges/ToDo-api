import { Router } from 'express'

// Controllers
import CreateToDoController from '../controllers/toDo/CreateToDoController'
import GetToDosController from '../controllers/toDo/GetToDosController'

// Middlewares
import ensureAuthenticated from '../middlewares/ensureAuthenticated'

const createToDo = new CreateToDoController()
const getToDos = new GetToDosController()

const toDosRoutes = Router()

toDosRoutes.get('/', ensureAuthenticated, getToDos.handle)
toDosRoutes.post('/', ensureAuthenticated, createToDo.handle)

export default toDosRoutes
