var  request = require('superagent');

const fs = require('fs');
let jsonData = {}
const current = process.cwd();
fs.readFile(`${current}/data/index.json`, function (err, data) {
        if (data) {
          jsonData = JSON.parse(data)
          // var t = JSON.stringify(json);
          // console.log(t)
          // fs.writeFileSync('index.json',t)
        }
});


const fn_usrs = async (ctx, next) => {
  let cb = ctx.request.query.callback;
  if (cb) { //ajax jsonp的请求方式
    ctx.response.body = cb + '(' + JSON.stringify(jsonData) + ')';
  }else{ //
    // ctx.set("Access-Control-Allow-Origin", "*") //ajax json的形式允许都跨域进入
    ctx.response.body = jsonData; //proxy 代理的方式
  }
  
}
const fn_usrs_new = async (ctx, next) => {
  const header = ctx.request.header;
  var res = await request
                    .get('http://fesco.d.upvi.com/api/auth/v1/closing-accounts')
                    .set('Accept', header['accept'])
                    .set('Content-Type', header['content-type'])
                    .set('Authorization', header['authorization'])
  console.log(res.body)
  
  ctx.response.body = res.body; //proxy 代理的方式

}

const add_usrs = async (ctx, next) => {
  const body = ctx.request.body
  jsonData.items.push(body)
  var t = JSON.stringify(jsonData);
  fs.writeFileSync(`${current}/data/index.json`,t)
  ctx.response.body = {}
}
const del_usrs = async (ctx, next) => {
  jsonData.items.map( (item, index) => {
    if (item.id == ctx.params.id) {
      jsonData.items.splice(index, 1)
    }
  })
  var t = JSON.stringify(jsonData);
  // fs.writeFileSync(`${current}/data/index.json`,t)
  // ctx.response.body = {}
  // await fs.writeFile(`${current}/data/index.json`,t, function (err,data) {
  //   console.log(data)
  //   console.log(err, 'err')
  //   ctx.response.body = {}
  // })
  await fs.writeFile(`${current}/data/index.json`,t, function (err) {
    console.log(err, '9-0')
    next()
    ctx.response.body = {}
  })
  
}


module.exports = {
  'GET /user_new': fn_usrs_new,
  'GET /users': fn_usrs,
  'POST /users': add_usrs,
  'DELETE /users/:id': del_usrs,
};


// ctx 所有的key
// - request
// - response
// - app
// - req
// - res
// - originalUrl
// - cookies
// - accept
// - state
// - matched
// - router
// - _matchedRoute
// - captures
// - params
// - routerName
// - inspect
// - toJSON
// - assert
// - throw
// - onerror
// - attachment
// - redirect
// - remove
// - vary
// - set
// - append
// - flushHeaders
// - status
// - message
// - body
// - length
// - type
// - lastModified
// - etag
// - headerSent
// - writable
// - acceptsLanguages
// - acceptsEncodings
// - acceptsCharsets
// - accepts
// - get
// - is
// - querystring
// - idempotent
// - socket
// - search
// - method
// - query
// - path
// - url
// - origin
// - href
// - subdomains
// - protocol
// - host
// - hostname
// - URL
// - header
// - headers
// - secure
// - stale
// - fresh
// - ips
// - ip