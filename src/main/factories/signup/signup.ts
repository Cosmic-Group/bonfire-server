import { DBCreateAccount } from '../../../data/useCases/create-account/db-create-account'
import { BCrypterAdapter } from '../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { PgUserAccountRepository, PgLogErrorsRepository } from '../../../infra/postgres/repos'
import { SignUpController } from '../../../presentation/controllers/signup/signup'
import { Controller } from '../../../presentation/protocols'
import { LogControllerDecorator } from '../../decorators/log'
import { makeSignUpValidation } from './signup-validation'

export const makeSignUpController = (): Controller => {
  const salt = 12
  const bcryptAdapter = new BCrypterAdapter(salt)

  const pgUserAccountRepository = new PgUserAccountRepository()

  const createAccount = new DBCreateAccount(bcryptAdapter, pgUserAccountRepository, pgUserAccountRepository)

  const signUpController = new SignUpController(createAccount, makeSignUpValidation())

  const pgLogErrorsRepository = new PgLogErrorsRepository()
  return new LogControllerDecorator(signUpController, pgLogErrorsRepository)
}
