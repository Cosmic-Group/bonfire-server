import { PgUser } from '../entities'
import { CreateAccountRepository } from '../../../data/protocols/create-account-repository'
import { AccountModel } from '../../../domain/model/account'
import { CreateAccountModel } from '../../../domain/useCases/create-account'
import { PgRepository } from './repository'
import { LoadAccountByEmailRepository } from 'data/protocols/load-account-by-email-repository'

export class PgUserAccountRepository extends PgRepository implements CreateAccountRepository, LoadAccountByEmailRepository {
  async create (accountData: CreateAccountModel): Promise<Omit<AccountModel, 'password'>> {
    const pgUserRepo = this.getRepository(PgUser)
    const account = await pgUserRepo.save({
      email: accountData.email,
      name: accountData.name,
      password: accountData.password
    })

    const accountResponse: Omit<AccountModel, 'password'> = {
      id: account.id.toString(),
      email: account.email,
      name: account.name
    }

    return accountResponse
  }

  async loadByEmail (email: string): Promise<Omit<AccountModel, 'password'>> {
    const pgUserRepo = this.getRepository(PgUser)
    const account = await pgUserRepo.findOne({ email })

    if (account) {
      const accountResponse: Omit<AccountModel, 'password'> = {
        id: account.id.toString(),
        email: account.email,
        name: account.name
      }

      return accountResponse
    }

    return null
  }
}
