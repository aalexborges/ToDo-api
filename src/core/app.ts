import 'express-async-errors'

import cors from 'cors'
import express from 'express'

import { config } from 'dotenv'

import routes from '../routes'
import handleErrors from '../middlewares/handleErrors'

config({ path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env' })

const app = express()

app.use(cors())
app.use(express.json())

app.use(routes)
app.use(handleErrors)

export default app
