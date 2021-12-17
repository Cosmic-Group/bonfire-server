import { AccountModel, CreateAccount, CreateAccountModel, Encrypter } from './db-create-account-protocols'
export class DBCreateAccount implements CreateAccount {
  constructor (private readonly encrypter: Encrypter) {}

  async create (account: CreateAccountModel): Promise<AccountModel> {
    await this.encrypter.encrypt(account.password)
    return new Promise(resolve => resolve(null))
  }
}
