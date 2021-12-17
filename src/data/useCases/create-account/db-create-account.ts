import { AccountModel } from '../../../domain/entities/account'
import { CreateAccount, CreateAccountModel } from '../../../domain/useCases/create-account'
import { Encrypter } from '../../protocols/encrypter'

export class DBCreateAccount implements CreateAccount {
  constructor (private readonly encrypter: Encrypter) {}

  async create (account: CreateAccountModel): Promise<AccountModel> {
    await this.encrypter.encrypt(account.password)
    return new Promise(resolve => resolve(null))
  }
}
