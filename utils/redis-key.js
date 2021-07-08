import { redis } from './config'
const prefixKey = redis.prefixKey

export default {
  userToken (user_id) {
    return `${prefixKey}${user_id}_token`
  },
  userOldToken (user_id) {
    return `${prefixKey}${user_id}_old_token`
  },
  userRefreshToken (user_id) {
    return `${prefixKey}${user_id}_refresh_token`
  },
  /**
   * 短信验证码
   */
  userPhoneCode (phone) {
    return `${prefixKey}${phone}_code`
  }
}
