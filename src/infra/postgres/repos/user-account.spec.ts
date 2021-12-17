import { IBackup, IMemoryDb, newDb } from 'pg-mem'
import { getConnection, getRepository, Repository } from 'typeorm'
import { PgUserAccountRepository } from '.'
import { PgUser } from '../entities'

const makeFakeDb = async (entities?: any[]): Promise<IMemoryDb> => {
  const db = newDb()
  const connection = await db.adapters.createTypeormConnection({
    type: 'postgres',
    entities: entities ?? ['src/infra/postgres/entities/index.ts']
  })

  await connection.synchronize()
  return db
}

describe('PgUserAccountRepository', () => {
  let sut: PgUserAccountRepository
  let pgUserRepo: Repository<PgUser>
  let backup: IBackup

  beforeAll(async () => {
    const db = await makeFakeDb([PgUser])
    backup = db.backup()
    pgUserRepo = getRepository(PgUser)
  })

  afterAll(async () => {
    await getConnection().close()
  })

  beforeEach(() => {
    backup.restore()
    sut = new PgUserAccountRepository()
  })

  describe('create', () => {
    test('should create an account', async () => {
      await sut.create({
        email: 'any_email@mail.com',
        name: 'any_name',
        password: 'any_password'
      })

      const account = await pgUserRepo.findOne({ email: 'any_email@mail.com' })

      expect(account.id).toBe(1)
      expect(account.email).toBe('any_email@mail.com')
    })
  })
})
