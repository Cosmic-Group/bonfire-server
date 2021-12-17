import { AccountModel } from '../entities/account'

export interface CreateAccountModel {
  name: string
  email: string
  password: string
  avatar?: string
}

export interface CreateAccount {
  create: (account: CreateAccountModel) => Promise<AccountModel>
}
