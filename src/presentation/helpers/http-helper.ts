import { ServerError, UnauthorizedError } from '../errors'
import { httpResponse } from '../protocols/http'

export const badRequest = (error: Error): httpResponse => ({
  statusCode: 400,
  body: error
})

export const unauthorized = (): httpResponse => ({
  statusCode: 401,
  body: new UnauthorizedError()
})

export const forbidden = (error: Error): httpResponse => ({
  statusCode: 403,
  body: error
})

export const serverError = (error: Error): httpResponse => ({
  statusCode: 500,
  body: new ServerError(error.stack)
})

export const created = (data: any): httpResponse => ({
  statusCode: 201,
  body: data
})
