import request from 'supertest'
import app from '../config/app'

describe('SignUp Middleware', () => {
  test('Should return an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Test',
        email: 'test@mail.com',
        password: '123',
        passwordConfirmation: '123'
      })
      .expect(200)
  })
})
