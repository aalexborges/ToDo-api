import { Router } from 'express'

// Controllers
import { CreateUserController } from '../controllers/User/CreateUserController'
import { DeleteUserController } from '../controllers/User/DeleteUserController'

// Middlewares
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

const userRoutes = Router()

userRoutes.post('/', new CreateUserController().handle)

userRoutes.post(
  '/delete',
  ensureAuthenticated,
  new DeleteUserController().handle
)

export { userRoutes }
