// 不需要check的接口
const apiList = [
  '/ate',
  '/system'
]

function checkApiList (url) {
  let bool = false
  apiList.some((item, index) => {
    if (url.includes(item)) {
      bool = true
      return true
    }
  })
  return bool
}

export default async function (ctx, next) {
  if (checkApiList(ctx.req.url)) {
    next()
  }
  // else if () {

  // } 
  else {
    ctx.body = { code: 404, message: '路径不存在' }
  }
}

