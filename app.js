import Koa from 'koa'
import koaRouter from 'koa-router'
import views from 'koa-views'
import convert from 'koa-convert'
import json from 'koa-json'
import bodyparser from 'koa-bodyparser'
import logger from 'koa-logger'
import cors from 'koa2-cors'
import koaStatic from 'koa-static'
import permission from './middlewares/permission'
import schedule from './schedule'

// Api
import system from './routes/system/controller/system-controller'

schedule() // 计划任务
const app = new Koa()
const router = koaRouter()

// middlewares
app.use(convert(bodyparser()))
app.use(convert(cors()))
app.use(convert(json()))
app.use(convert(logger()))
app.use(convert(koaStatic(__dirname + '/public')))
app.use(views(__dirname + '/views', { extension: 'jade' }))
app.use(permission) // 权限

router.use('/system', system.routes(), system.allowedMethods())
app.use(router.routes(), router.allowedMethods())

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${new Date().toLocaleString()}: ${ctx.method} ${ctx.url} - ${ms}ms`)
})

app.on('error', function (err, ctx) {
  console.log('server error', err)
})

export default app
