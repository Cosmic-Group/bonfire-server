import { SignUpController } from './signup-controller'
import { AccountModel, CreateAccount, CreateAccountModel, httpRequest, Validation } from './signup-controller-protocols'
import { EmailInUseError, MissingParamError, ServerError } from '../../errors'
import { forbidden, created, serverError, badRequest } from '../../helpers/http/http-helper'

const makeCreateAccount = (): CreateAccount => {
  class CreateAccountStub implements CreateAccount {
    async create (account: CreateAccountModel): Promise<AccountModel> {
      return new Promise(resolve => resolve(makeFakeAccount()))
    }
  }

  return new CreateAccountStub()
}

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }

  return new ValidationStub()
}

const makeFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'valid_password'
})

const makeFakeRequest = (): httpRequest => ({
  body: {
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password',
    passwordConfirmation: 'any_password'
  }
})
interface SutTypes {
  sut: SignUpController
  createAccountStub: CreateAccount
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const createAccountStub = makeCreateAccount()
  const validationStub = makeValidation()

  const sut = new SignUpController(createAccountStub, validationStub)

  return {
    sut,
    createAccountStub,
    validationStub
  }
}

describe('SignUp Controller', () => {
  test('Should call CreateAccount with correct values', async () => {
    const { sut, createAccountStub } = makeSut()
    const createSpy = jest.spyOn(createAccountStub, 'create')

    await sut.handle(makeFakeRequest())
    expect(createSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    })
  })

  test('Should return 500 if CreateAccount throws', async () => {
    const { sut, createAccountStub } = makeSut()
    jest.spyOn(createAccountStub, 'create').mockImplementationOnce(async () => {
      return new Promise((resolve, reject) => reject(new Error()))
    })

    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should return 201 if valid data is provided', async () => {
    const { sut } = makeSut()

    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(created(makeFakeAccount()))
  })

  test('Should return 413 if CreateAccount returns null', async () => {
    const { sut, createAccountStub } = makeSut()
    jest.spyOn(createAccountStub, 'create').mockReturnValueOnce(new Promise(resolve => resolve(null)))

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'anyd_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(forbidden(new EmailInUseError()))
  })

  test('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')

    const httpRequest = makeFakeRequest()

    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))

    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })
})