import { IBackup } from 'pg-mem'
import { Repository } from 'typeorm'
import { PgUserAccountRepository } from '.'
import { PgUser } from '../entities'
import { PgConnection } from '../helpers'
import { makeFakeDb } from '../helpers/mocks/connection'
import { PgRepository } from './repository'

describe('PgUserAccountRepository', () => {
  let sut: PgUserAccountRepository
  let connection: PgConnection
  let pgUserRepo: Repository<PgUser>
  let backup: IBackup

  beforeAll(async () => {
    connection = PgConnection.getInstance()
    const db = await makeFakeDb([PgUser])
    backup = db.backup()
    pgUserRepo = connection.getRepository(PgUser)
  })

  afterAll(async () => {
    await connection.disconnect()
  })

  beforeEach(() => {
    backup.restore()
    sut = new PgUserAccountRepository()
  })

  it('should extend PgRepository', async () => {
    expect(sut).toBeInstanceOf(PgRepository)
  })

  describe('create', () => {
    test('Should return an account on success', async () => {
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

  describe('loadByEmail', () => {
    test('Should return an account on success', async () => {
      await sut.create({
        email: 'any_email@mail.com',
        name: 'any_name',
        password: 'any_password'
      })

      const account = await sut.loadByEmail('any_email@mail.com')

      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe('any_name')
      expect(account.email).toBe('any_email@mail.com')
    })

    test('Should return null if loadByEmail fails', async () => {
      const account = await sut.loadByEmail('any_email@mail.com')
      expect(account).toBeFalsy()
    })
  })
})
