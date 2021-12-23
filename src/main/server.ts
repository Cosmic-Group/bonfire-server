import 'reflect-metadata'

import * as dotenv from 'dotenv'
import { PgConnection } from '../infra/postgres/helpers'

dotenv.config()

PgConnection.getInstance().connect()
  .then(async () => {
    const { app } = await import('./config/app')
    app.listen(process.env.PORT || 5050, () => console.log(`Server running at ${process.env.APP_URL || 'http://localhost'}:${process.env.PORT || 5050}`))
  })
  .catch(console.error)
