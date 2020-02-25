// server.js
const Koa = require('koa')
const Router = require('koa-router')
const app = new Koa()
const router = new Router()
router.get('/test', ctx => {
  console.log('test/in....')
  ctx.body = { aa: 123 }
})
app.use(router.routes()); /*启动路路由*/
app.use(router.allowedMethods());
app.listen(3000);