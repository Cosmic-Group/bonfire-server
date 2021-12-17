import { PgUser } from '../entities'
import { CreateAccountRepository } from '../../../data/protocols/create-account-repository'
import { AccountModel } from '../../../domain/model/account'
import { CreateAccountModel } from '../../../domain/useCases/create-account'
import { PgRepository } from './repository'

export class PgUserAccountRepository extends PgRepository implements CreateAccountRepository {
  async create (accountData: CreateAccountModel): Promise<AccountModel> {
    const pgUserRepo = this.getRepository(PgUser)
    const account = await pgUserRepo.save({
      email: accountData.email,
      name: accountData.name,
      password: accountData.password
    })

    return account[0]
  }
}
