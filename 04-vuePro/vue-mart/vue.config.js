module.exports = {
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': []
      }
    }
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
      //么有起作用
      before (app) {
        // 模拟的后台服务器,express
        app.get("/api/login", function (req, res) {
          console.log(req.query);

          const { username, passwd } = req.query
          console.log('====================================');
          console.log(username, passwd);
          console.log('====================================');
          if (username == 'qiuhang' && passwd == '123') {
            res.json({
              code: 0,
              token: 'token-' + (new Date().getTime() + 1000 * 60)
            })
          } else {
            res.json({
              code: 1,
              message: "用户名或者密码错误"
            })
          }
        });
        //保护接口的中间件
        function auth (req, res, next) {

          if (req.headers.token) {
            next()
          } else {
            res.sendStatus(401)
          }
        }
        // 访问这个接口之前,必须auth认证,后台接口级别的保护
        app.get("/api/userinfo", auth, function (req, res) {
          res.json({ code: 1, data: { name: "tom,age:20" } })
        })


      }
    }
  },

}
