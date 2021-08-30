import { Router } from 'express'

import AuthenticateUserController from '../controllers/sessions/AuthenticateUserController'
import RefreshTokenController from '../controllers/sessions/RefreshTokenController'

const authenticateUser = new AuthenticateUserController()
const refreshToken = new RefreshTokenController()

const sessionsRoutes = Router()

sessionsRoutes.post('/', authenticateUser.handle)
sessionsRoutes.post('/refreshToken', refreshToken.handle)

export default sessionsRoutes
