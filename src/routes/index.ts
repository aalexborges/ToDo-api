import { Router } from 'express'

import { userRoutes } from './userRoutes'
import { toDoRoutes } from './toDoRoutes'
import { sessionRoutes } from './sessionRoutes'

const router = Router()

router.use('/users', userRoutes)
router.use('/toDos', toDoRoutes)
router.use('/session', sessionRoutes)

export { router }
