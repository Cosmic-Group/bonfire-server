import { CreateAccountModel } from '../../../../domain/useCases/create-account'
import { AccountModel } from '../../../../domain/model/account'

export interface CreateAccountRepository {
  create: (accountData: CreateAccountModel) => Promise<Omit<AccountModel, 'password'>>
}
