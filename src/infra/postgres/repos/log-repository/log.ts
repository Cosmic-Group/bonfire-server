import { PgLogErrors } from '../../../../infra/postgres/entities'
import { LogErrorRepository } from '../../../../data/protocols/postgres/log/log-error-repository'
import { PgRepository } from '../repository'

export class PgLogErrorsRepository extends PgRepository implements LogErrorRepository {
  async logError (stack: string): Promise<void> {
    const pgLogErrors = this.getRepository(PgLogErrors)
    await pgLogErrors.save({
      stack
    })
  }
}
