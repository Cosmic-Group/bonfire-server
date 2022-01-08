import * as dotenv from 'dotenv'

import { DbAuthentication } from '../../../../data/useCases/authentication/db-authentication'
import { PgUserAccountRepository } from '../../../../infra/postgres/repos'
import { BCrypterAdapter } from '../../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { JwtAdapter } from '../../../../infra/criptography/jwt-adapter/jwt-adapter'
import { Authentication } from '../../../../domain/useCases/authentication'

dotenv.config()

export const makeDbAuthentication = (): Authentication => {
  const salt = 12
  const bcryptAdapter = new BCrypterAdapter(salt)

  const jwtAdapter = new JwtAdapter(process.env.JWT_SECRET || '@VoPzRFrMJdxjVvLW8xnyHHLfeF7hzDi*rwcQsTs')

  const pgUserAccountRepository = new PgUserAccountRepository()
  return new DbAuthentication(pgUserAccountRepository, bcryptAdapter, jwtAdapter, pgUserAccountRepository)
}
