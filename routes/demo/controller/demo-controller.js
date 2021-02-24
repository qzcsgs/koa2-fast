import koaRouter from 'koa-router'
import demoService from '../service/demo-service'
const router = koaRouter()

router.post('/list', async (ctx, next) => {
  const data = ctx.request.body
  ctx.body = await demoService.selectDemo(data)
})

router.post('/add', async (ctx, next) => {
  const data = ctx.request.body
  ctx.body = await demoService.insertDemo(data)
})

router.post('/edit', async (ctx, next) => {
  const data = ctx.request.body
  ctx.body = await demoService.updateDemo(data)
})

export default router
