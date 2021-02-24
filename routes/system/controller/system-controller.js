import koaRouter from 'koa-router'
import systemService from '../service/system-service'
const router = koaRouter()

router.post('/list', async (ctx, next) => {
  const data = ctx.request.body
  ctx.body = await systemService.selectSystem(data)
})

router.post('/add', async (ctx, next) => {
  const data = ctx.request.body
  ctx.body = await systemService.insertSystem(data)
})

router.post('/edit', async (ctx, next) => {
  const data = ctx.request.body
  ctx.body = await systemService.updateSystem(data)
})

export default router
