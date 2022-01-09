import { AccountModel } from '@/domain/model/account'
export interface CreateAccountModel {
  name: string
  email: string
  password: string
}
export interface CreateAccount {
  create: (account: CreateAccountModel) => Promise<Omit<AccountModel, 'password'>>
}
