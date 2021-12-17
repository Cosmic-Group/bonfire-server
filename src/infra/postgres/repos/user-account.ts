import { PgUser } from '../entities'
import { getRepository } from 'typeorm'
import { CreateAccountRepository } from '../../../data/protocols/create-account-repository'
import { AccountModel } from '../../../domain/model/account'
import { CreateAccountModel } from '../../../domain/useCases/create-account'

export class PgUserAccountRepository implements CreateAccountRepository {
  private readonly pgUserRepo = getRepository(PgUser)

  async create (accountData: CreateAccountModel): Promise<AccountModel> {
    const account = await this.pgUserRepo.save({
      email: accountData.email,
      name: accountData.name,
      password: accountData.password
    })

    return account[0]
  }
}
