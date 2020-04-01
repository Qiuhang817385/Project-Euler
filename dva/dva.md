---
title: DVA
date: 2020-03-21
categories:
  - dva
author: 安若天
---

## 1.初始化项目

---

> [dva 官方 gitHub 文档链接](https://github.com/dvajs/dva-docs/blob/master/v1/zh-cn/getting-started.md)

通过 npm 安装 dva-cli 并确保版本是 `0.9.1` 或以上。

```bash
$ npm install dva-cli -g
$ dva -v
dva-cli version 0.9.1
```

::: tip
当前版本 0.10.1
:::

创建项目

```bash
$ dva new dva
$ cd dva
$ npm start
```

- 包含
  - 项目初始化目录和文件
  - 开发服务器
  - 构建脚本
  - 数据 mock 服务
  - 代理服务器等功能。

## 2.添加 sass

---

命令 : `cnpm install sass-loader node-sass --save`

## 学到的新命令

- cl:console.log
- rqr:require
- imn:import ''
- ctm 和 cte console.time('object') console.timeEnd('object')
- clo : console.log('json', json)
- clt : console.table(object); 打印 json
- cdc: componentDidCatch(error, info) {}
- cdi:console.dir(object)

## GetNew

---

--save：默认生产环境

--dev：开发环境

检查 webpack 版本 webpack -v 4.41.5

## BUG

---

安装 node-sass 的时候发生意外

```
peerDependencies WARNING sass-loader@* requires a peer of webpack@^4.36.0 || ^5.0.0 but webpack@3.12.0 was installed
peerDependencies WARNING sass-loader@* requires a peer of sass@^1.3.0 but none was installed
peerDependencies WARNING sass-loader@* requires a peer of fibers@>= 3.1.0 but none was installed
```

解决办法:[sass-loader 的版本过高](https://www.cnblogs.com/szqtiger/p/11599205.html)

## 附录

---

网上踩坑

1.https://www.jianshu.com/p/9a7a05a123aa
