import { IBackup } from 'pg-mem'
import { Repository } from 'typeorm'
import request from 'supertest'

import { makeFakeDb } from '../../infra/postgres/helpers/mocks/connection'
import { PgUser } from '../../infra/postgres/entities'
import { app } from '../config/app'
import { PgConnection } from '../../infra/postgres/helpers'
import { hash } from 'bcrypt'

describe('Authentication Routes', () => {
  let backup: IBackup
  let connection: PgConnection
  let pgUserRepo: Repository<PgUser>

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
  })

  describe('POST /signup', () => {
    test('Should return 201 on signup', async () => {
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

  describe('POST /login', () => {
    test('Should return 200 on login', async () => {
      const password = await hash('any_password', 12)
      await pgUserRepo.save({
        name: 'any_name',
        email: 'any_email@mail.com',
        password
      })

      await request(app)
        .post('/api/login')
        .send({
          email: 'any_email@mail.com',
          password: 'any_password'
        })
        .expect(200)
    })
  })
})
