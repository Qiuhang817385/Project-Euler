# [vue cli3 项目配置](https://www.cnblogs.com/lanshengzhong/p/10386986.html)

【转】https://juejin.im/post/5c63afd56fb9a049b41cf5f4

## 基于vue-cli3.0快速构建vue项目

> 本章详细介绍使用vue-cli3.0来搭建项目。 本章使用vue-cli3.0构建的项目是基于webpack的模板文件，构建后的项目属于单页面（SPA）应用。因此，该文档后续操作与说明不适用于构建一个多页面应用。

相比于之前有如下优点：

- 功能丰富：对babel、Typescript、ESLint...提供开箱即用的支持
- 易于扩展：它的插件系统可以让社区根据需求构建和共享可复用的解决方案
- 无需Eject：vue cli 完全可配置的，无需再使用webpack配置
- CLI图形化界面：vue ui图形化界面创建、开发和管理项目
- 即刻创建原型：用单个vue文件实现新的灵感
- 面向未来：为现代浏览器轻松产出原生的ES2015代码，或将你的vue组件构建为原生的Web Components组件

### 1、vue-cli3.0初始化

#### 安装@vue/cli

```
# npm install -g @vue/cli
OR
# yarn global add @vue/cli
 
```

> 你可以使用vue --version 或者 vue -V检查其版本

 

![img](https://user-gold-cdn.xitu.io/2019/2/13/168e57bd23bc3430?imageView2/0/w/1280/h/960/format/webp/ignore-error/1) 注意事项:

 

- VUE CLI3的包名称由`vue-cli`改成`@vue/cli`。如果你已经安装了旧版本的vue-cli(1.x或2.x)，你先通过`npm uninstall vue-cli -g`或 `yarn global remove vue-cli`卸载它。
- VUE CLI3需要`node8.9`或`更高版本`（推荐8.11.0+）
- VUE CLI3和旧版本使用了相同的vue命令，所以Vue CLI2(vue-cli)被覆盖了。如果你仍然需要使用旧版本的vue init 功能，你需要全局安装一个桥接工具：

```
npm install -g @vue/cli-init
Vue init webpack myVue
```

 

### 创建项目

> 可以使用`vue ui`图形化界面创建和管理项目，这里不做阐述，请自行查看cli.vuejs.org/，下面以命令行形式进行创建：

```
vue create vuedemo
复制代码
```

> 你会被提示选取一个preset。你可以选默认的包含了基本的Babel+ESLint设置的preset，也可以选`手动选择特性`来选取需要的特性。

 

![img](https://user-gold-cdn.xitu.io/2019/2/13/168e58f594bf79db?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

 

> 这个默认的设置非常适合快速创建一个新项目的原型，而手动设置则提供了更多的选项，它们是面向生产的项目更加需要的，下面以”手动设置“为例。`以上下键移动，以空格键进行是否选定`

 

![img](https://user-gold-cdn.xitu.io/2019/2/13/168e59237544a8ed?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

 

- Babel : 将ES6编译成ES5
- TypeScript: javascript类型的超集
- Progressive Web App (PWA) Support: 支持渐进式的网页应用程序
- Router:vue-router
- Vuex: 状态管理
- CSS Pre-processors: CSS预处理
- Linter / Formatter: 开发规范
- Unit Testing: 单元测试
- E2E Testing: 端到端测试

> 如果后续你想在一个已经被创建好的项目中安装插件，可以使用 vue add 命令：

```
D:\i\vuedemo> vue add vuex

```

![img](https://user-gold-cdn.xitu.io/2019/2/13/168e597651b28a58?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

 

> 出现如上字样，说明安装成功。请输入命令`cd vuedemo`与`yarn serve`运行环境。

### 配置文件说明

> vue-cli3.0致力于Vue生态中的工具基础标准化。它确保了各种构建工具能够基于智能的默认配置即可平稳衔接，这样你就可以专注在撰写应用上，减少配置的时间。查看如下文件，会发现相比于vue-cli2.0少了`build`与`config`文件夹，所以vue-cli3提供了一个可选的配置文件 ——`vue.config.js`。请具体参考5.3和5.4(打包配置)，这里只详细解读文件作用。

 

![img](https://user-gold-cdn.xitu.io/2019/2/13/168e59a7b8574d09?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

 

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
|-- dist                       # 打包后文件夹            
|-- public                     # 静态文件夹                                   
|   |-- favicon.ico                
|   |-- index.html                    #入口页面
|-- src                        # 源码目录         
|   |--assets                        # 模块资源
|   |--components                    # vue公共组件
|   |--views                         
|   |--App.vue                                          # 页面入口文件
|   |--main.js                                            # 入口文件，加载公共组件
|   |--router.js                                        # 路由配置
|   |--store.js                                            # 状态管理
|-- .env.pre-release          # 预发布环境    
|-- .env.production          # 生产环境       
|-- .env.test              # 测试环境  
|-- vue.config.js             # 配置文件 
|-- .eslintrc.js                  # ES-lint校验                   
|-- .gitignore                  # git忽略上传的文件格式   
|-- babel.config.js               # babel语法编译                        
|-- package.json                # 项目基本信息 
|-- postcss.config.js            # CSS预处理器(此处默认启用autoprefixer)  
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

 

### vue.config.js配置

> Vue.config.js是一个可选的配置文件，如果项目的根目录存在这个文件，那么它就会被 `@vue/cli-service` 自动加载。你也可以使用package.json中的vue字段，但要注意严格遵守JSON的格式来写。这里使用配置vue.config.js的方式进行处理。

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
const webpack = require('webpack')
module.exports = {
    //部署应用包时的基本 URL
    publicPath: process.env.NODE_ENV === 'production' ? '/online/' : './',
    //当运行 vue-cli-service build 时生成的生产环境构建文件的目录
    outputDir: 'dist',
    //放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
    assetsDir: 'assets',
    // eslint-loader 是否在保存的时候检查 安装@vue/cli-plugin-eslint有效
    lintOnSave: true,
    //是否使用包含运行时编译器的 Vue 构建版本。设置true后你就可以在使用template
    runtimeCompiler: true,
    // 生产环境是否生成 sourceMap 文件 sourceMap的详解请看末尾  
    productionSourceMap: true,
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            // 为生产环境修改配置...
        } else {
            // 为开发环境修改配置...
        }
    },
    // css相关配置
    css: {
        // 是否使用css分离插件 ExtractTextPlugin 生产环境下是true,开发环境下是false
        extract: true,
        // 开启 CSS source maps?
        sourceMap: false,
        // css预设器配置项
        loaderOptions: {},
        // 启用 CSS modules for all css / pre-processor files.
        modules: false
    },
    // webpack-dev-server 相关配置
    devServer: { // 设置代理
        hot: true, //热加载
        host: '0.0.0.0', //ip地址
        port: 8085, //端口
        https: false, //false关闭https，true为开启
        open: true, //自动打开浏览器
        proxy: {
            '/api': { //本地 
                target: 'xxx',
                // 如果要代理 websockets
                ws: true,
                changeOrigin: true
            },
            '/test': { //测试
                target: 'xxx'
            },
            '/pre': { //预发布
                target: 'xxx'
            },
            '/pro': { //正式
                target: 'xxx'
            }
        }
    },
    pluginOptions: { // 第三方插件配置
        // ...
    }
}
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

 

扩展:

> Source map的作用：针对打包后的代码进行的处理，就是一个信息文件，里面储存着位置信息。也就是说，转换后的代码的每一个位置，所对应的转换前的位置。有了它，出错的时候，除错工具将直接显示原始代码，而不是转换后的代码。这无疑给开发者带来了很大方便。

### 打包配置

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
创建.env.test文件，文件内容如下

NODE_ENV='test'                    # 测试环境
VUE_APP_TT='TT'

创建.env.pre-release文件，文件内容如下：

NODE_ENV='pre-release'              # 预发布环境

创建.env.production文件，文件内容如下：

NODE_ENV='production'              # 正式环境
VUE_APP_T='la'
Q='1'

package.json配置
"scripts": {
    "serve": "vue-cli-service serve ",
    "build:pre": "vue-cli-service build --mode pre-release",  #预发布环境
    "build:test": "vue-cli-service build --mode test", #测试环境
    "build:prod": "vue-cli-service build --mode production", #正式环境
    "lint": "vue-cli-service lint",
    "test:unit": "vue-cli-service test:unit"
}
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

##### 有关环境变量的注意事项

- 环境名应该与环境文件统一
- 环境文件放置根目录下
- 除了 `baseUrl` 和 `NODE_ENV` 其他环境变量使用 `VUE_APP`开头