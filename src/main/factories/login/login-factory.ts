import { LogControllerDecorator } from '../../decorators/log-controller-decorator'
import { makeLoginValidation } from './login-validation-factory'
import { Controller } from '../../../presentation/protocols'
import { DbAuthentication } from '../../../data/useCases/authentication/db-authentication'
import { LoginController } from '../../../presentation/controllers/login/login-controller'
import { PgLogErrorsRepository } from '../../../infra/postgres/repos'
import { PgUserAccountRepository } from '../../../infra/postgres/repos/user-account-repository/user-account'
import { BCrypterAdapter } from '../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { JwtAdapter } from '../../../infra/criptography/jwt-adapter/jwt-adapter'

export const makeLoginController = (): Controller => {
  const salt = 12
  const bCrypterAdapter = new BCrypterAdapter(salt)

  const jwtAdapter = new JwtAdapter(process.env.JWT_SECRET)

  const pgUserAccountRepository = new PgUserAccountRepository()
  const dbAuthentication = new DbAuthentication(pgUserAccountRepository, bCrypterAdapter, jwtAdapter, pgUserAccountRepository)

  const loginControler = new LoginController(dbAuthentication, makeLoginValidation())

  const pgLogErrorsRepository = new PgLogErrorsRepository()
  return new LogControllerDecorator(loginControler, pgLogErrorsRepository)
}
