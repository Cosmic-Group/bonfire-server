import { PgUser } from '../entities'
import { CreateAccountRepository } from '../../../data/protocols/postgres/create-account-repository'
import { AccountModel } from '../../../domain/model/account'
import { CreateAccountModel } from '../../../domain/useCases/create-account'
import { PgRepository } from './repository'
import { LoadAccountByEmailRepository } from '../../../data/protocols/postgres/load-account-by-email-repository'

export class PgUserAccountRepository extends PgRepository implements CreateAccountRepository, LoadAccountByEmailRepository {
  async create (accountData: CreateAccountModel): Promise<AccountModel> {
    const pgUserRepo = this.getRepository(PgUser)
    const account = await pgUserRepo.save({
      email: accountData.email,
      name: accountData.name,
      password: accountData.password
    })

    const accountResponse: AccountModel = {
      id: account.id.toString(),
      email: account.email,
      name: account.name,
      password: account.password
    }

    return accountResponse
  }

  async loadByEmail (email: string): Promise<AccountModel> {
    const pgUserRepo = this.getRepository(PgUser)
    const account = await pgUserRepo.findOne({ email })

    if (account) {
      const accountResponse: AccountModel = {
        id: account.id.toString(),
        email: account.email,
        name: account.name,
        password: account.password
      }

      return accountResponse
    }

    return null
  }
}
