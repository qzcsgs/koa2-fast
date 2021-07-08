import userDb from '../db/user-db'
import redis from '../../../utils/redis'
import popCore from '../../../utils/pop-core/pop-core'
import { success, error, auth } from '../../../utils/response'
import { AES256GCMEncode, md5, randomStrWithLength } from '../../../utils/utils'
import { userToken, userOldToken, userRefreshToken, userPhoneCode } from '../../../utils/redis-key'
import { tokenExpire, popCoreConfig } from '../../../utils/config'

/**
 * 生成token和refresh_token并存入redis
 * @param {number} user_id 用户id
 */
const generateToken = (user_id) => {
  const result = {  // 生成新的token
    token: AES256GCMEncode({
      user_id,
      time: +new Date()
    }),
    refresh_token: randomStrWithLength(16)
  }
  redis.set(userToken(user_id), result.token, tokenExpire)
  redis.set(userRefreshToken(user_id), result.refresh_token, tokenExpire)
  return result
}

export default {
  generateToken,
  async userLogin ({ name, password }) {
    if (!name || !password) { return error() }

    password = md5(password)
    const user = await userDb.userLogin({ name, password })
    if (user) {
      const { token, refresh_token } = generateToken(user.id)
      user.token = token
      user.refresh_token = refresh_token
      user.password = undefined
      return success(user)
    } else {
      return error('用户名或密码错误')
    }
  },
  /**
   * 刷新user token，旧token会继续保存5分钟用来过渡
   * @param {number} user_id 用户id
   * @param {string} refresh_token 刷新token凭据
   * @param {string} token 用户旧的token
   */
  async refreshToken ({ user_id, refresh_token, token }) {
    const serverRefreshToken = await redis.get(userRefreshToken(user_id))
    if (refresh_token != serverRefreshToken) {
      return auth('refresh_token已经失效，请重新登录')
    }

    const serverTokenTtl = await redis.ttl(userToken(user_id))
    if (serverTokenTtl > tokenExpire - 1800) { // 新token需要过30分钟后才可以刷新
      return success({ token, refresh_token })
    }

    redis.set(userOldToken(user_id), token, 300) // 旧token 设置5分钟过渡期
    const result = generateToken(user_id) // 生成新token
    return success(result)
  },

  // TODOS: 防刷
  async sendCode ({ phone, ip }) {
    if (phone.length < 11) { return error('手机号不正确') }

    const redisKey = userPhoneCode(phone)
    const oldPhoneCode = await redis.get(redisKey)
    if (oldPhoneCode) { // 失效之前重复发送的, 必须等待失效，不考虑接收不到短信的情况
      return error('操作频繁稍后再试')
    }

    const code = randomStrWithLength(6, '1234567890')
    const params = popCoreConfig.template.login(phone, code)

    return new Promise((resolve) => {
      popCore.request('SendSms', params, 'POST').then((result) => {
        redis.set(redisKey, code, params.codeExpire)
        resolve(success(null, '发送成功'))
      }, (ex) => {
        console.log(ex)
        resolve(error('发送失败请重试'))
      })
    })
  },

  async selectUser ({ page, page_size }) {
    const users = await userDb.selectUser({ page, page_size })
    return users ? success(users) : error()
  },

  async insertUser ({ name, password, create_time, update_time }) {
    const result = await userDb.insertUser({ name, password, create_time, update_time })
    return result ? success() : error()
  },

  async updateUser ({ user_id, name, password, create_time, update_time }) {
    const result = await userDb.updateUserById({ id: user_id, name, password, create_time, update_time })
    return result ? success() : error()
  }
}
