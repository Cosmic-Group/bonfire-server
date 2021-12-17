import { CreateAccountModel } from '../../domain/useCases/create-account'
import { AccountModel } from '../../domain/entities/account'

export interface CreateAccountRepository {
  create: (accountData: CreateAccountModel) => Promise<AccountModel>
}
