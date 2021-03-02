import redis from '../utils/redis'
import { AES256GCMDecode } from '../utils/utils'
import { auth } from '../utils/response'
import { tokenExpire } from '../utils/config'
import { userToken, userOldToken } from '../utils/redis-key'

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

const checkToken = async (ctx) => {
  const token = ctx.request.headers['x-token']
  if (!token) {
    ctx.body = auth()
    return false
  }

  const body = ctx.request.body
  if (!body.user_id) {
    ctx.body = auth('缺少参数: user_id')
    return false
  }

  // 校验token白名单
  const whiteList = await Promise.all([
    redis.get(userToken(body.user_id)),
    redis.get(userOldToken(body.user_id))
  ])
  if (!whiteList.includes(token)) {
    ctx.body = auth('token已经失效，请重新登录')
    return false
  }

  const user = AES256GCMDecode(token)
  if (user.user_id != body.user_id) {
    ctx.body = auth()
    return false
  }

  if (+new Date() - user.time >= tokenExpire * 1000) {
    ctx.body = auth('token已经失效，请重新登录')
    return false
  }
  
  ctx.request.body.token = token
  return true
}

export default async function (ctx, next) {
  const filter = checkApiList(ctx.req.url)
  const validity = await checkToken(ctx)
  if (filter || validity) {
    await next()
  }
}
