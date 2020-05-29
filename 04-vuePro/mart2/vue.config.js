const path = require('path');
function resolve (dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? './'
    : '/',
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': []
      }
    }
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('./src'))
      .set('@/assets', resolve('./src/assets'))
  },
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: false
    }
  },
  lintOnSave: false,
  configureWebpack: {
    devServer: {
      port: 8888,
      open: true,
      overlay: {
        warning: false,
        errors: false
      },
      before (app) {
        function auth (req, res, next) {
          if (req.headers.token) {
            next()
          } else {
            res.sendStatus(401)
          }
        }
        // 访问这个接口之前,必须auth认证,后台接口级别的保护
        // app.get("/api/userinfo", auth, function (req, res) {
        //   res.json({ code: 1, data: { name: "tom,age:20" } })
        // })
      }
    }
  },

}
