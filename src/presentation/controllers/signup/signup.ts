import { httpRequest, httpResponse, Controller, EmailValidator, CreateAccount, Validation } from './signup-protocols'
import { EmailInUseError, InvalidParamError } from '../../errors'
import { badRequest, created, forbidden, serverError } from '../../helpers/http-helper'

export class SignUpController implements Controller {
  constructor (
    private readonly emailValidator: EmailValidator,
    private readonly createAccount: CreateAccount,
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: httpRequest): Promise<httpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }

      const { name, email, password } = httpRequest.body

      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }

      const account = await this.createAccount.create({
        name,
        email,
        password
      })

      if (!account) {
        return forbidden(new EmailInUseError())
      }

      return created(account)
    } catch (error) {
      return serverError(error)
    }
  }
}
