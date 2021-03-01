import { AES256GCMDecode } from '../utils/utils'
import { auth } from '../utils/response'
import { tokenExpire } from '../utils/config'

// 不需要check token的接口
const apiList = [
  '/user/login',
  '/system'
]

const checkApiList = (url) => {
  let bool = false
  apiList.some((item, index) => {
    if (url.includes(item)) {
      bool = true
      return true
    }
  })
  return bool
}

const checkToken = (ctx) => {
  const token = ctx.request.headers['x-token']
  if (!token) { return false }

  const body = ctx.request.body
  if (!body.user_id) {
    ctx.body = auth('缺少参数: user_id')
    return false
  }

  const user = AES256GCMDecode(token)
  if (user.user_id != body.user_id) {
    ctx.body = auth()
    return false
  }

  if (+new Date() - user.time >= tokenExpire) {
    ctx.body = auth('token已经失效，请重新登录')
    return false
  }

  return true
}

export default async function (ctx, next) {
  if (checkApiList(ctx.req.url) || checkToken(ctx)) {
    await next()
  }
}
