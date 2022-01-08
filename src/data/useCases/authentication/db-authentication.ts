import { HashComparer } from '../../../data/protocols/criptography/hash-comparer'
import { Authentication, AuthenticationModel } from '../../../domain/useCases/authentication'
import { LoadAccountByEmailRepository } from '../../protocols/postgres/load-account-by-email-repository'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer
  ) {}

  async auth (authentication: AuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(authentication.email)

    if (account) {
      await this.hashComparer.compare(authentication.password, account.password)
    }

    return null
  }
}
