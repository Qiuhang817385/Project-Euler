const path = require('path');
function resolve (dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? './'
    : '/',
  // proxy: {
  //   "/": {
  //     target: ""
  //   }
  // },
  // devServer: {
  //   proxy: {
  //     "/": {
  //       target: "http://www.qiuhang.club:7300/mock/5e5a17e700fbdf09dcf21f8e/mart",
  //       ws: true,
  //       changeOrigin: true
  //     }
  //   }
  // },
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
      //么有起作用
      before (app) {
        // 模拟的后台服务器,express
        // app.get("/api/login", function (req, res) {
        //   console.log(req.query);
        //   const { username, passwd } = req.query
        //   console.log('====================================');
        //   console.log(username, passwd);
        //   console.log('====================================');
        //   if (username == 'qiuhang' && passwd == '123') {
        //     res.json({
        //       code: 0,
        //       token: 'token-' + (new Date().getTime() + 1000 * 60)
        //     })
        //   } else {
        //     res.json({
        //       code: 1,
        //       message: "用户名或者密码错误"
        //     })
        //   }
        // });
        //保护接口的中间件
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

        app.get("/api/goods", function (req, res) {
          res.json({
            code: 1,
            slider: [
              {
                id: 21,
                img: "/img/01.jpg"
              },
              {
                id: 22,
                img: "/img/02.jpg"
              },
              {
                id: 23,
                img: "/img/03.jpg"
              },
              {
                id: 24,
                img: "/img/04.jpg"
              }
            ],
            data: {
              fe: [
                {
                  id: 1,
                  title: "Vue2.x实战",
                  price: "100",
                  img: "/img/01.jpg",
                  count: 231
                },
                {
                  id: 2,
                  title: "React16.x实战",
                  price: "120",
                  img: "/img/03.jpg",
                  count: 436
                },
                {
                  id: 3,
                  title: "nodejs实战",
                  price: "80",
                  img: "/img/02.jpg",
                  count: 845
                },
                {
                  id: 4,
                  title: "前端工程化",
                  price: "110",
                  img: "/img/04.jpg",
                  count: 3453
                },
                {
                  id: 5,
                  title: "面试",
                  price: "200",
                  img: "/img/02.jpg",
                  count: 756
                },
                {
                  id: 6,
                  title: "前端安全",
                  price: "30",
                  img: "/img/05.jpg",
                  count: 879
                }
              ],
              python: [
                {
                  id: 7,
                  title: "Python基础语法",
                  price: "120",
                  img: "/img/03.jpg",
                  count: 614
                },
                {
                  id: 8,
                  title: "Flask实战",
                  price: "80",
                  img: "/img/02.jpg",
                  count: 765
                },
                {
                  id: 9,
                  title: "Django实战",
                  price: "110",
                  img: "/img/01.jpg",
                  count: 678
                },
                {
                  id: 10,
                  title: "Python语法进阶",
                  price: "200",
                  img: "/img/04.jpg",
                  count: 253
                }
              ],
              java: [
                {
                  id: 11,
                  title: "java入门实战",
                  price: "80",
                  img: "/img/02.jpg",
                  count: 568
                },
                {
                  id: 12,
                  title: "spring boot实战",
                  price: "110",
                  img: "/img/01.jpg",
                  count: 253
                },
                {
                  id: 13,
                  title: "Java高并发",
                  price: "30",
                  img: "/img/04.jpg",
                  count: 568
                }
              ],
              bigdata: [
                {
                  id: 14,
                  title: "大数据实战",
                  price: "200",
                  img: "/img/01.jpg",
                  count: 345
                },
                {
                  id: 15,
                  title: "Hadoop实战",
                  price: "120",
                  img: "/img/03.jpg",
                  count: 786
                },
                {
                  id: 16,
                  title: "Kafka平台",
                  price: "80",
                  img: "/img/02.jpg",
                  count: 123
                }
              ],
              ai: [
                {
                  id: 17,
                  title: "算法实战",
                  price: "100",
                  img: "/img/01.jpg",
                  count: 696
                },
                {
                  id: 18,
                  title: "个性化推荐",
                  price: "120",
                  img: "/img/03.jpg",
                  count: 354
                },
              ]
            },
            keys: ["fe", "python", "java", "bigdata", "ai"]
          });
        });
      }
    }
  },

}
