import { AccountModel, CreateAccount, CreateAccountModel, CreateAccountRepository, Encrypter, LoadAccountByEmailRepository } from './db-create-account-protocols'
export class DBCreateAccount implements CreateAccount {
  constructor (
    private readonly encrypter: Encrypter,
    private readonly createAccountRepository: CreateAccountRepository,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) {}

  async create (accountData: CreateAccountModel): Promise<AccountModel> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(accountData.email)
    if (!account) {
      const hashedPassword = await this.encrypter.encrypt(accountData.password)
      const newAccount = await this.createAccountRepository.create(Object.assign({}, accountData, { password: hashedPassword }))
      return newAccount
    }

    return null
  }
}
