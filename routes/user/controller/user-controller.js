import koaRouter from 'koa-router'
import userService from '../service/user-service'
const router = koaRouter()

router.post('/login', async (ctx, next) => {
  const data = ctx.request.body
  ctx.body = await userService.userLogin(data)
})

router.post('/refresh/token', async (ctx, next) => {
  const data = ctx.request.body
  ctx.body = await userService.refreshToken(data)
})

router.post('/list', async (ctx, next) => {
  const data = ctx.request.body
  ctx.body = await userService.selectUser(data)
})

router.post('/add', async (ctx, next) => {
  const data = ctx.request.body
  ctx.body = await userService.insertUser(data)
})

router.post('/edit', async (ctx, next) => {
  const data = ctx.request.body
  ctx.body = await userService.updateUser(data)
})

export default router
