import { badRequest, serverError, notFound, unauthorized } from './components'
import { signupPath, loginPath } from './paths'
import { accountSchema, errorSchema, loginParamsSchema, signupParamsSchema } from './schemas'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Bonfire API',
    description: 'Bonfire is a communication application, with voice spaces, chat channels and screen sharing.',
    version: '1.0.0',
    license: {
      name: 'GPL-3.0-or-later',
      url: 'https://spdx.org/licenses/GPL-3.0-or-later.html'
    }
  },
  servers: [{
    url: 'https://bonfire-dev-api.herokuapp.com/api',
    description: 'Dev environment'
  }],
  tags: [{
    name: 'Authentication'
  }],
  paths: {
    '/signup': signupPath,
    '/login': loginPath
  },
  schemas: {
    account: accountSchema,
    signupParams: signupParamsSchema,
    loginParams: loginParamsSchema,
    error: errorSchema
  },
  components: {
    badRequest,
    serverError,
    notFound,
    unauthorized
  }
}
