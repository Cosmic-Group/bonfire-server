import { Controller, httpRequest, httpResponse } from 'presentation/protocols'
import { LogControllerDecorator } from './log'

describe('LogController Decorator', () => {
  it('Should call controller handle', async () => {
    class ControllerStub implements Controller {
      async handle (httpRequest: httpRequest): Promise<httpResponse> {
        const httpResponse: httpResponse = {
          statusCode: 201,
          body: {
            name: 'Valid name'
          }
        }
        return new Promise(resolve => resolve(httpResponse))
      }
    }

    const controllerStub = new ControllerStub()
    const handleSpy = jest.spyOn(controllerStub, 'handle')

    const sut = new LogControllerDecorator(controllerStub)
    const httpRequest = {
      body: {
        email: 'any_mail@mail.com',
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }

    await sut.handle(httpRequest)
    expect(handleSpy).toHaveBeenCalledWith(httpRequest)
  })
})
