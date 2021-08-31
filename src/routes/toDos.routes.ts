import { Router } from 'express'

// Controllers
import CreateToDoController from '../controllers/toDo/CreateToDoController'

// Middlewares
import ensureAuthenticated from '../middlewares/ensureAuthenticated'

const createToDo = new CreateToDoController()

const toDosRoutes = Router()

toDosRoutes.post('/', ensureAuthenticated, createToDo.handle)

export default toDosRoutes
