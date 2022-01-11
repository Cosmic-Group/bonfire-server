import { AccountModel } from '@/domain/model/account'

export type CreateAccountModel = {
  name: string
  email: string
  password: string
}
export interface CreateAccount {
  create: (account: CreateAccountModel) => Promise<Omit<AccountModel, 'password'>>
}
