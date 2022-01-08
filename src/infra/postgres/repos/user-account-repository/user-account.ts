import { PgUser } from '../../entities'
import { CreateAccountRepository } from '../../../../data/protocols/postgres/account/create-account-repository'
import { AccountModel } from '../../../../domain/model/account'
import { CreateAccountModel } from '../../../../domain/useCases/create-account'
import { PgRepository } from '../repository'
import { LoadAccountByEmailRepository } from '../../../../data/protocols/postgres/account/load-account-by-email-repository'
import { UpdateAccessTokenRepository } from '../../../../data/protocols/postgres/account/update-access-token-repository'

export class PgUserAccountRepository extends PgRepository implements CreateAccountRepository, LoadAccountByEmailRepository, UpdateAccessTokenRepository {
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
      password: account.password,
      accessToken: account.accessToken
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

  async updateAccessToken (id: string, token: string): Promise<void> {
    const pgUserRepo = this.getRepository(PgUser)
    await pgUserRepo.update({
      id: parseInt(id)
    }, {
      accessToken: token
    })
  }
}
