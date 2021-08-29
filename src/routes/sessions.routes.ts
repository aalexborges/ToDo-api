import { Router } from 'express'

import AuthenticateUserController from '../controllers/sessions/AuthenticateUserController'

const authenticateUser = new AuthenticateUserController()

const sessionsRoutes = Router()

sessionsRoutes.post('/', authenticateUser.handle)

export default sessionsRoutes
