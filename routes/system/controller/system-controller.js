import koaRouter from 'koa-router'
const router = koaRouter()

router.post('/config', async function (ctx, next) {
  const data = ctx.request.body
  ctx.body = { code: 200, data }
})

export default router
