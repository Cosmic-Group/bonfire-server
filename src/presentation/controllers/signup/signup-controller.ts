import { httpRequest, httpResponse, Controller, CreateAccount, Validation, Authentication } from './signup-controller-protocols'
import { EmailInUseError } from '@/presentation/errors'
import { badRequest, created, forbidden, serverError } from '@/presentation/helpers/http/http-helper'

export class SignUpController implements Controller {
  constructor (
    private readonly createAccount: CreateAccount,
    private readonly validation: Validation,
    private readonly authentication: Authentication
  ) {}

  async handle (httpRequest: httpRequest): Promise<httpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }

      const { name, email, password } = httpRequest.body

      const account = await this.createAccount.create({
        name,
        email,
        password
      })

      if (!account) {
        return forbidden(new EmailInUseError())
      }

      const accessToken = await this.authentication.auth({
        email,
        password
      })

      return created({ accessToken })
    } catch (error) {
      return serverError(error)
    }
  }
}
