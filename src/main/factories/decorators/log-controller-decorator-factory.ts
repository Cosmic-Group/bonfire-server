import * as dotenv from 'dotenv'

import { LogControllerDecorator } from '@/main/decorators/log-controller-decorator'
import { Controller } from '@/presentation/protocols'
import { PgLogErrorsRepository } from '@/infra/postgres/repos'

dotenv.config()

export const makeLogControllerDecorator = (controller: Controller): Controller => {
  const pgLogErrorsRepository = new PgLogErrorsRepository()
  return new LogControllerDecorator(controller, pgLogErrorsRepository)
}
