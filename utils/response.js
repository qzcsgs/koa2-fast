import { response } from './config'

export default {
  success (data, message) {
    return {
      code: response.successCode,
      data,
      message: message || response.successMessage
    }
  },
  error (message) {
    return {
      code: response.errorCode,
      message: message || response.errorMessage
    }
  }
}
