import { IBackup } from 'pg-mem'
import { Repository } from 'typeorm'
import { PgLogErrors } from '../../entities'
import { PgConnection } from '../../helpers'
import { makeFakeDb } from '../../helpers/mocks/connection'
import { PgLogErrorsRepository } from './log'

describe('Log Postgres Repository', () => {
  let sut: PgLogErrorsRepository
  let connection: PgConnection
  let pgLogErrorsRepo: Repository<PgLogErrors>
  let backup: IBackup

  beforeAll(async () => {
    connection = PgConnection.getInstance()
    const db = await makeFakeDb([PgLogErrors])
    backup = db.backup()
    pgLogErrorsRepo = connection.getRepository(PgLogErrors)
  })

  afterAll(async () => {
    await connection.disconnect()
  })

  beforeEach(() => {
    backup.restore()
    sut = new PgLogErrorsRepository()
  })

  it('Should create an error log on success', async () => {
    await sut.logError('any_error')
    const count = await pgLogErrorsRepo.count()
    expect(count).toBe(1)
  })
})
