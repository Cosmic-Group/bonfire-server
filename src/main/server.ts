import 'reflect-metadata'

import * as dotenv from 'dotenv'
import { PgConnection } from '../infra/postgres/helpers'

dotenv.config()

PgConnection.getInstance().connect()
  .then(async () => {
    const { app } = await import('./config/app')
    app.listen(process.env.PORT_APP, () => console.log(`Server running at http://localhost:${process.env.PORT_APP}`))
  })
  .catch(console.error)
