import { badRequest, serverError, notFound } from './components'
import { signupPath } from './paths'
import { accountSchema, errorSchema, signupParamsSchema } from './schemas'

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
    '/signup': signupPath
  },
  schemas: {
    account: accountSchema,
    signupParams: signupParamsSchema,
    error: errorSchema
  },
  components: {
    badRequest,
    serverError,
    notFound
  }
}
