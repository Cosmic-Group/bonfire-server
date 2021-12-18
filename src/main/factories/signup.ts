import { DBCreateAccount } from '../../data/useCases/create-account/db-create-account'
import { BCrypterAdapter } from '../../infra/criptography/bcrypt-adapter'
import { PgUserAccountRepository } from '../../infra/postgres/repos'
import { EmailValidatorAdapter } from '../../presentation/utils/email-validator-adapter'
import { SignUpController } from '../../presentation/controllers/signup//signup'

export const makeSignUpController = (): SignUpController => {
  const salt = 12
  const bcryptAdapter = new BCrypterAdapter(salt)

  const pgUserAccountRepository = new PgUserAccountRepository()

  const emailValidatorAdapter = new EmailValidatorAdapter()
  const createAccount = new DBCreateAccount(bcryptAdapter, pgUserAccountRepository, pgUserAccountRepository)
  return new SignUpController(emailValidatorAdapter, createAccount)
}
