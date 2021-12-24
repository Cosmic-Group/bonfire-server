import { ServerError } from '../errors/server-error'
import { httpResponse } from '../protocols/http'

export const badRequest = (error: Error): httpResponse => ({
  statusCode: 400,
  body: error
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
