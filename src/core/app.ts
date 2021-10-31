import 'dotenv/config'
import 'express-async-errors'

import cors from 'cors'
import express from 'express'

import { router } from '../routes'
import { handleErrors } from '../middlewares/handleErrors'

const app = express()

app.use(cors())
app.use(express.json())
app.use(router)
app.use(handleErrors)

export { app }
