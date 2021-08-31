import { Router } from 'express'

import usersRoutes from './users.routes'
import sessionsRoutes from './sessions.routes'
import toDosRoutes from './toDos.routes'

const routes = Router()

routes.use('/users', usersRoutes)
routes.use('/sessions', sessionsRoutes)
routes.use('/toDos', toDosRoutes)

export default routes
