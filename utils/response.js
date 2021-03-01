import { response } from './config'

export const success = (data, message) => {
  return {
    code: response.successCode,
    data,
    message: message || response.successMessage
  }
}

export const error = (message) => {
  return {
    code: response.errorCode,
    message: message || response.errorMessage
  }
}

export const auth = (message) => {
  return {
    code: response.authCode,
    message: message || response.authMessage
  }
}
