import { Router } from 'express'

// Controllers
import { AuthenticateUserController } from '../controllers/Session/AuthenticateUserController'
import { RefreshTokenController } from '../controllers/Session/RefreshTokenController'

// Middlewares
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

const sessionRoutes = Router()

sessionRoutes.post('/signIn', new AuthenticateUserController().handle)

sessionRoutes.post(
  '/token/refresh',
  ensureAuthenticated,
  new RefreshTokenController().handle
)

export { sessionRoutes }
