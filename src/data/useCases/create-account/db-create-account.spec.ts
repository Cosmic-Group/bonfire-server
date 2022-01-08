import { AccountModel, CreateAccountModel, Hasher, CreateAccountRepository, LoadAccountByEmailRepository } from './db-create-account-protocols'
import { DBCreateAccount } from './db-create-account'

const makeFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'hashed_password'
})

const makeFakeAccountData = (): CreateAccountModel => ({
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'valid_password'
})

const makeHasher = (): Hasher => {
  class HasherStub implements Hasher {
    async hash (value: string): Promise<string> {
      return new Promise(resolve => resolve('hashed_password'))
    }
  }

  return new HasherStub()
}

const makeCreateAccountRepository = (): CreateAccountRepository => {
  class CreateAccountRepositoryStub implements CreateAccountRepository {
    async create (accountData: CreateAccountModel): Promise<AccountModel> {
      return new Promise(resolve => resolve(makeFakeAccount()))
    }
  }

  return new CreateAccountRepositoryStub()
}

const makeLoadAccountByEmailRepository = (): LoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
    async loadByEmail (email: string): Promise<AccountModel> {
      return new Promise(resolve => resolve(null))
    }
  }

  return new LoadAccountByEmailRepositoryStub()
}

interface SutTypes {
  sut: DBCreateAccount
  hasherStub: Hasher
  createAccountRepositoryStub: CreateAccountRepository
  loadAccountByEmailRepository: LoadAccountByEmailRepository
}

const makeSut = (): SutTypes => {
  const hasherStub = makeHasher()
  const createAccountRepositoryStub = makeCreateAccountRepository()
  const loadAccountByEmailRepository = makeLoadAccountByEmailRepository()
  const sut = new DBCreateAccount(hasherStub, createAccountRepositoryStub, loadAccountByEmailRepository)

  return {
    sut,
    hasherStub,
    createAccountRepositoryStub,
    loadAccountByEmailRepository
  }
}

describe('DBCreateAccount UseCase', () => {
  test('Should call Hasher with correct password', async () => {
    const { sut, hasherStub } = makeSut()
    const encryptSpy = jest.spyOn(hasherStub, 'hash')

    await sut.create(makeFakeAccountData())
    expect(encryptSpy).toHaveBeenCalledWith('valid_password')
  })

  test('Should throw if Hasher throws', async () => {
    const { sut, hasherStub } = makeSut()
    jest.spyOn(hasherStub, 'hash').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))

    const promise = sut.create(makeFakeAccount())
    await expect(promise).rejects.toThrow()
  })

  test('Should call CreateAccountRepository with correct values', async () => {
    const { sut, createAccountRepositoryStub } = makeSut()
    const createtSpy = jest.spyOn(createAccountRepositoryStub, 'create')

    await sut.create(makeFakeAccountData())
    expect(createtSpy).toHaveBeenCalledWith({
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'hashed_password'
    })
  })

  test('Should throw if CreateAccountRepository throws', async () => {
    const { sut, createAccountRepositoryStub } = makeSut()
    jest.spyOn(createAccountRepositoryStub, 'create').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))

    const promise = sut.create(makeFakeAccountData())
    await expect(promise).rejects.toThrow()
  })

  test('Should return an account on success', async () => {
    const { sut } = makeSut()
    const account = await sut.create(makeFakeAccountData())
    expect(account).toEqual(makeFakeAccount())
  })

  test('Should return null if LoadAccountByEmailRepository not return null', async () => {
    const { sut, loadAccountByEmailRepository } = makeSut()
    jest.spyOn(loadAccountByEmailRepository, 'loadByEmail').mockReturnValueOnce(new Promise(resolve => resolve(makeFakeAccount())))

    const account = await sut.create(makeFakeAccountData())
    expect(account).toBeNull()
  })

  test('Should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepository } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByEmailRepository, 'loadByEmail')

    await sut.create(makeFakeAccountData())
    expect(loadSpy).toHaveBeenCalledWith('valid_email@mail.com')
  })
})
