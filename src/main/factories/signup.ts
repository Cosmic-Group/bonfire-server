import { DBCreateAccount } from '../../data/useCases/create-account/db-create-account'
import { BCrypterAdapter } from '../../infra/criptography/bcrypt-adapter'
import { PgUserAccountRepository, PgLogErrorsRepository } from '../../infra/postgres/repos'
import { EmailValidatorAdapter } from '../../presentation/utils/email-validator-adapter'
import { SignUpController } from '../../presentation/controllers/signup//signup'
import { Controller } from '../../presentation/protocols'
import { LogControllerDecorator } from '../decorators/log'

export const makeSignUpController = (): Controller => {
  const salt = 12
  const bcryptAdapter = new BCrypterAdapter(salt)

  const pgUserAccountRepository = new PgUserAccountRepository()

  const emailValidatorAdapter = new EmailValidatorAdapter()
  const createAccount = new DBCreateAccount(bcryptAdapter, pgUserAccountRepository, pgUserAccountRepository)
  const signUpController = new SignUpController(emailValidatorAdapter, createAccount)

  const pgLogErrorsRepository = new PgLogErrorsRepository()
  return new LogControllerDecorator(signUpController, pgLogErrorsRepository)
}
