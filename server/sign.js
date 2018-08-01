const path = require('path')
const { uploadFile } = require('../utils/upload')

const fn_index = async (ctx, next) => {
  ctx.response.body = `<h1>Index</h1>
        <form action="/signin" method="post">
            <p>Name: <input name="name" value="koa"></p>
            <p>Password: <input name="password" type="password"></p>
            <p><input type="submit" value="Submit"></p>
        </form>`;
};

const fn_signin = async (ctx, next) => {
  const name = ctx.request.body.name || '',
    password = ctx.request.body.password || '';
  if (name === 'koa' && password === '12345') {
    ctx.response.body = {
      code: 200,
      msg: 'success'
    };
  } else {
    ctx.response.body = {
      code: 400,
      msg: 'fail'
    }
  }
};

const fn_ejs = async (ctx, next) => {
  let title = 'hello koa2';
  let name = 'hello jeremy';

  await ctx.render('index', {
    title,name
  })
}


const fn_file = async (ctx, next) => {
    let html = `
      <h1>koa2 upload demo</h1>
      <form method="POST" action="/upload" enctype="multipart/form-data">
        <p>file upload</p>
        <span>picName:</span><input name="picName" type="text" /><br/>
        <input name="file" type="file" /><br/><br/>
        <button type="submit">submit</button>
      </form>
    `;
    ctx.response.body = html
}
const fn_upload = async (ctx, next) => {
    // 上传文件请求处理
    let result = { success: false }
    let serverFilePath = path.join( __dirname, '../static/upload-files' )

    // 上传文件事件
    result = await uploadFile( ctx, {
      fileType: 'album', // common or album
      path: serverFilePath
    })
    ctx.body = result
}


module.exports = {
  'GET /ejs': fn_ejs,
  'GET /file': fn_file,
  'POST /upload': fn_upload,
};