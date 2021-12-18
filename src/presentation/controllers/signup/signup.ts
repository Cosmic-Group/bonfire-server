import { httpRequest, httpResponse, Controller, EmailValidator, CreateAccount } from './signup-protocols'
import { EmailInUseError, InvalidParamError, MissingParamError } from '../../errors'
import { badRequest, created, forbidden, serverError } from '../../helpers/http-helper'

export class SignUpController implements Controller {
  constructor (
    private readonly emailValidator: EmailValidator,
    private readonly createAccount: CreateAccount
  ) {}

  async handle (httpRequest: httpRequest): Promise<httpResponse> {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const { name, email, password, passwordConfirmation } = httpRequest.body

      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }

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
      return serverError()
    }
  }
}
