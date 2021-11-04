import { Router } from 'express'

// Controllers
import { CreateUserController } from '../controllers/User/CreateUserController'
import { DeleteUserController } from '../controllers/User/DeleteUserController'
import { GetUserController } from '../controllers/User/GetUserController'

// Middlewares
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

const userRoutes = Router()

userRoutes.get('/', ensureAuthenticated, new GetUserController().handle)
userRoutes.post('/', new CreateUserController().handle)

userRoutes.post(
  '/delete',
  ensureAuthenticated,
  new DeleteUserController().handle
)

export { userRoutes }
