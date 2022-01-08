import * as dotenv from 'dotenv'

import { LogControllerDecorator } from '../../decorators/log-controller-decorator'
import { makeLoginValidation } from './login-validation-factory'
import { Controller } from '../../../presentation/protocols'
import { DbAuthentication } from '../../../data/useCases/authentication/db-authentication'
import { LoginController } from '../../../presentation/controllers/login/login-controller'
import { PgUserAccountRepository, PgLogErrorsRepository } from '../../../infra/postgres/repos'
import { BCrypterAdapter } from '../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { JwtAdapter } from '../../../infra/criptography/jwt-adapter/jwt-adapter'

dotenv.config()

export const makeLoginController = (): Controller => {
  const salt = 12
  const bcryptAdapter = new BCrypterAdapter(salt)

  const jwtAdapter = new JwtAdapter(process.env.JWT_SECRET)

  const pgUserAccountRepository = new PgUserAccountRepository()
  const authentication = new DbAuthentication(pgUserAccountRepository, bcryptAdapter, jwtAdapter, pgUserAccountRepository)

  const loginControler = new LoginController(authentication, makeLoginValidation())

  const pgLogErrorsRepository = new PgLogErrorsRepository()
  return new LogControllerDecorator(loginControler, pgLogErrorsRepository)
}
