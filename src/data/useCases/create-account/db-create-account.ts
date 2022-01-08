import { AccountModel, CreateAccount, CreateAccountModel, CreateAccountRepository, Hasher, LoadAccountByEmailRepository } from './db-create-account-protocols'
export class DBCreateAccount implements CreateAccount {
  constructor (
    private readonly hasher: Hasher,
    private readonly createAccountRepository: CreateAccountRepository,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) {}

  async create (accountData: CreateAccountModel): Promise<Omit<AccountModel, 'password'>> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(accountData.email)
    if (!account) {
      const hashedPassword = await this.hasher.hash(accountData.password)
      const newAccount = await this.createAccountRepository.create(Object.assign({}, accountData, { password: hashedPassword }))
      return newAccount
    }

    return null
  }
}
