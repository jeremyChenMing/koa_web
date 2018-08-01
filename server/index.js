const fs = require('fs');

function addMapping(router, mapping) {
  for (var url in mapping) {
    if (url.startsWith('GET ')) {
      var path = url.substring(4);
      router.get(path, mapping[url]);
      // console.log(`register URL mapping: GET ${path}`);
    } else if (url.startsWith('OPTIONS ')) {
      var path = url.substring(8);
      router.get(path, mapping[url]);

    } else if (url.startsWith('POST ')) {
      var path = url.substring(5);
      router.post(path, mapping[url]);
      // console.log(`register URL mapping: POST ${path}`);
    } else if (url.startsWith('PUT ')) {
      var path = url.substring(4);
      router.put(path, mapping[url]);
      // console.log(`register URL mapping: PUT ${path}`);
    } else if (url.startsWith('DELETE ')) {
      var path = url.substring(7);
      router.del(path, mapping[url]);
      // console.log(`register URL mapping: DELETE ${path}`);
    } else {
      console.log(`invalid URL: ${url}`);
    }
  }
}

function addControllers(router, dir) {
  const files = fs.readdirSync(__dirname + '/' + dir).filter((f) => {
    return f !== 'index.js';
  })
  files.forEach((f) => {
    // console.log(`process controller: ${f}...`);
    let mapping = require(__dirname + '/' + f);
    addMapping(router, mapping);
  });
}

module.exports = function(dir) {
  let controllers_dir = dir || '/',
    router = require('koa-router')();
  addControllers(router, controllers_dir);
  return router.routes();
};