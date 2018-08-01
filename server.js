const Koa = require('koa');
const app = new Koa();
const path = require('path');
const static = require('koa-static');
const bodyParser = require('koa-bodyparser');
const router = require('koa-router')();
const controller = require('./server/index.js');


// 部署静态资源
const staticPath = './static';
app.use(static(
  path.join( __dirname,  staticPath)
))

// ejs 模版引擎
const views = require('koa-views')
app.use(views(path.join(__dirname, './view'), {
  extension: 'ejs'
}))




// 集中处理错误
const handler = async (ctx, next) => {
  // log request URL:
  ctx.set("Access-Control-Allow-Origin", "*");
  ctx.set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
  ctx.set("Access-Control-Max-Age", "3600");
  ctx.set("Access-Control-Allow-Headers", "x-requested-with,Authorization,Content-Type,Accept");
  ctx.set("Access-Control-Allow-Credentials", "true");
  if (ctx.request.method == "OPTIONS") {
    ctx.response.status = 200
  }
  console.log(`Process ${ctx.request.method} ${ctx.request.url}`);
  try {
    await next();
    console.log('handler通过')
  } catch (err) {
    console.log('handler处理错误')
    ctx.response.status = err.statusCode || err.status || 500;
    ctx.response.body = {
      message: err.message
    };
  }
};
// 如果错误被catch. 就不会出发onerror时间，需要调用 ctx.app.emit('error', err, ctx);
// app.on('error', function(err) {
//   console.log('logging error ', err.message);
// });
app.use(handler)


app.use(bodyParser()); //合适的位置 解析post请求的
app.use(controller()) // 服务的位置

app.listen(3000, () => {
  console.log('app started at port 3000...');
});
