import { Router } from 'express'

// Controllers
import CreateUserController from '../controllers/users/CreateUserController'

const createUser = new CreateUserController()

const userRoutes = Router()

userRoutes.post('/', createUser.handle)

export default userRoutes
