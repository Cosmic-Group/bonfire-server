import express from 'express'

import setupSwagger from './config-swagger'
import setupMiddleware from './middlewares'
import seteupRoutes from './routes'

const app = express()

setupSwagger(app)
setupMiddleware(app)
seteupRoutes(app)

export { app }
