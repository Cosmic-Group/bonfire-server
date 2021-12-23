import { signupPath } from './paths/signup-path'
import { accountSchema } from './schemas/account-schema'
import { signupParamsSchema } from './schemas/signup-params-schema'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Bonfire API',
    description: 'Bonfire is a communication application, with voice spaces, chat channels and screen sharing.',
    version: '1.0.0'
  },
  servers: [{
    url: 'https://bonfire-dev-api.herokuapp.com/api',
    description: 'Dev environment'
  }],
  tags: [{
    name: 'Authentication'
  }],
  paths: {
    '/signup': signupPath
  },
  schemas: {
    account: accountSchema,
    signupParams: signupParamsSchema
  }
}
