import { Router } from 'express'

// Controllers
import CreateUserController from '../controllers/users/CreateUserController'

const createUser = new CreateUserController()

const usersRoutes = Router()

usersRoutes.post('/', createUser.handle)

export default usersRoutes
