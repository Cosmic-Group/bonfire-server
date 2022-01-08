import * as dotenv from 'dotenv'

import { PgUserAccountRepository } from '../../../../infra/postgres/repos'
import { BCrypterAdapter } from '../../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { CreateAccount } from '../../../../domain/useCases/create-account'
import { DBCreateAccount } from '../../../../data/useCases/create-account/db-create-account'

dotenv.config()

export const makeDbCreateAccount = (): CreateAccount => {
  const salt = 12
  const bcryptAdapter = new BCrypterAdapter(salt)

  const pgUserAccountRepository = new PgUserAccountRepository()
  return new DBCreateAccount(bcryptAdapter, pgUserAccountRepository, pgUserAccountRepository)
}
