import { Encrypter } from '../../protocols/encrypter'
import { DBCreateAccount } from './db-create-account'

const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt (value: string): Promise<string> {
      return new Promise(resolve => resolve('hashed_password'))
    }
  }

  return new EncrypterStub()
}

interface SutTypes {
  sut: DBCreateAccount
  encrypterStub: Encrypter
}

const makeSut = (): SutTypes => {
  const encrypterStub = makeEncrypter()
  const sut = new DBCreateAccount(encrypterStub)

  return {
    sut,
    encrypterStub
  }
}

describe('DBCreateAccount UseCase', () => {
  test('Should call Encrypter with correct password', async () => {
    const { sut, encrypterStub } = makeSut()
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
    const accountData = {
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'valid_password'
    }
    await sut.create(accountData)
    expect(encryptSpy).toHaveBeenCalledWith('valid_password')
  })
})
