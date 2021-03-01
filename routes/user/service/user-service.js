import userDb from '../db/user-db'
import { success, error } from '../../../utils/response'
import { AES256GCMEncode, md5 } from '../../../utils/utils'

export default {
  async userLogin ({ name, password }) {
    if (!name || !password) {
      return error()
    }
    password = md5(password)
    console.log(password)
    let user = await userDb.userLogin({ name, password })
    if (user) {
      user.password = undefined
      user.token = AES256GCMEncode({
        user_id: user.id,
        time: +new Date()
      })
      return success(user)
    } else {
      return error('用户名或密码错误')
    }
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
