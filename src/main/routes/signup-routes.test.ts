import { IBackup, IMemoryDb, newDb } from 'pg-mem'
import request from 'supertest'
import { getConnection } from 'typeorm'
import { PgUser } from '../../infra/postgres/entities'

import app from '../config/app'

const makeFakeDb = async (entities?: any[]): Promise<IMemoryDb> => {
  const db = newDb()
  const connection = await db.adapters.createTypeormConnection({
    type: 'postgres',
    entities: entities ?? ['src/infra/postgres/entities/index.ts']
  })

  await connection.synchronize()
  return db
}

describe('SignUp Middleware', () => {
  let backup: IBackup

  beforeAll(async () => {
    const db = await makeFakeDb([PgUser])
    backup = db.backup()
  })

  afterAll(async () => {
    await getConnection().close()
  })

  beforeEach(() => {
    backup.restore()
  })

  test('Should return an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Test',
        email: 'test@mail.com',
        password: '123',
        passwordConfirmation: '123'
      })
      .expect(200)
  })
})
