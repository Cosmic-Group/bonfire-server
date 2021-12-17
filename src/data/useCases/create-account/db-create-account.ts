import { AccountModel, CreateAccount, CreateAccountModel, CreateAccountRepository, Encrypter } from './db-create-account-protocols'
export class DBCreateAccount implements CreateAccount {
  constructor (
    private readonly encrypter: Encrypter,
    private readonly createAccountRepository: CreateAccountRepository
  ) {}

  async create (accountData: CreateAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.encrypter.encrypt(accountData.password)
    await this.createAccountRepository.create(Object.assign({}, accountData, { password: hashedPassword }))
    return new Promise(resolve => resolve(null))
  }
}
