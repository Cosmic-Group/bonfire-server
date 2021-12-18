import { IBackup } from 'pg-mem'
import request from 'supertest'

import { makeFakeDb } from '../../infra/postgres/helpers/mocks/connection'
import { PgUser } from '../../infra/postgres/entities'

import { app } from '../config/app'
import { PgConnection } from '../../infra/postgres/helpers'

describe('SignUp Middleware', () => {
  let backup: IBackup
  let connection: PgConnection

  beforeAll(async () => {
    connection = PgConnection.getInstance()
    const db = await makeFakeDb([PgUser])
    backup = db.backup()
  })

  afterAll(async () => {
    await connection.disconnect()
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
      .expect(201)
  })
})
