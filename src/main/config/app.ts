import express from 'express'

import setupMiddleware from './middlewares'
import seteupRoutes from './routes'

const app = express()

setupMiddleware(app)
seteupRoutes(app)

export { app }
