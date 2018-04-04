# 教你用Vue渐进式搭建聊天室，从JavaScript=>TypeScript

[![Build Status](https://img.shields.io/travis/spiritree/vue-socket.io-chat/master.svg?style=flat-square)](https://travis-ci.org/spiritree/vue-socket.io-chat)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://raw.githubusercontent.com/spiritree/vue-socket.io-chat/master/LICENSE)
[![](https://badge.juejin.im/entry/59f67b4051882546b15bc825/likes.svg?style=flat-square)](https://juejin.im/post/59f5de305188254eaf27d729)

## [English Document](https://github.com/spiritree/vue-socket.io-chat/blob/master/README-en.md)

## 前言
Vue+Socket.io这个轮子已经有很多人造过了，为了不重复造轮子，我将本项目以三阶段实现（大家可以在github中的Releases查看）：
- 纯前端（Vuex）
- 后端+前端（JavaScript）
- 后端+前端（TypeScript）

希望能给大家一个渐进学习的经验。

**预览地址：https://app.spiritree.me/**

## 技术栈

Vue + Webpack + TypeScript + Express + SCSS + Socket.io + Gulp

<details><summary>Vue-cli创建工程</summary><br>
`npm install -g vue-cli`

`vue init webpack my-project`

`vue init ElemeFE/webpack-typescript my-project`（感谢饿了么分享的TypeScript的模板）

这样就在当前目录下创建了完整的工程模板

<br>
</details>

<details><summary>Socket.io</summary><br>
在Server端（Express）

```javascript
import * as socketIo from 'socket.io'

this.io.on('connection', (socket: any) => {
  socket.on('sendMessage', (data: any) => {
    this.io.emit('boardcastMessage', data)
})
```
在Client端（Vue）

```javascipt
<script lang="ts">
/// <reference path="../../socket.io.d.ts" />
export default Vue.extend({
  mounted() {
    socket.on('boardcastMessage', (data: any) => {
        this.$store.dispatch('sendMessage', { data })
    })
  }
})
```

Server端常用API：

`socket.emit()`：向建立该连接的客户端发送消息

`socket.on()`：监听客户端发送信息

`io.sockets.emit()`：向所有客户端广播

Client端常用API：

`socket.emit()`：向服务端发送消息

`socket.on()`：监听服务端发来的信息

<br>
</details>

<details><summary>TypeScript</summary><br>

关于TypeScript的基本知识，可以直接看xcatliu整理的教程，简单易懂，有Java/C#基础就可快速上手。
[TypeScript 入门教程](https://github.com/xcatliu/typescript-tutorial)

## webpack+TypeScript（前端）
[Vue + TypeScript 尝鲜体验](https://zhuanlan.zhihu.com/p/29971290)

也可用官方插件`vue-class-component`

**本项目参考
`vue init ElemeFE/webpack-typescript my-project`**

先添加声明文件（Vue全家桶自带就不需要了）
本项目用到Express和Socket.io

`npm install typescript --save-dev`

`npm i ts-loader --save-dev`

### 在webpack.base.conf.js中添加

```javascript
{
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [/\.vue$/],
        }
      },
    ],
  }
}
```
### 在根目录添加声明文件
socket.io.d.ts（为了编译通过）

```javascript
declare namespace socket {
  var on: any;
  var emit: any;
  var data: any;
}
```
### 在每个Vue文件中添加

![vuechat2.png](https://user-gold-cdn.xitu.io/2017/10/29/730cb84d8274c4a7bbb6708aeb5723ce)

<br>
</details>

<details><summary>Gulp+TypeScript（后端）</summary><br>

`npm install gulp --save-dev`

`npm install gulp-typescript --save-dev`

`npm install @types/express --save-dev`

`npm install @types/socket.io --save-dev`

### Server文件夹结构

```
├── app.js
├── gulpfile.js
├── register.js
├── src
│   ├── type-app.ts
│   └── type-register.ts
├── tsconfig.json
├── type-app.js
└── type-register.js
```

### 添加tsconfig.json
[TypeScript官方手册](https://www.tslang.cn/docs/handbook/tsconfig-json.html)

```json
{
  "include": [
    "src/*.ts"
  ],
  "compilerOptions": {
    "noImplicitAny": true,
    "lib": ["es6"],
    "target": "es5",
    "outDir": ""
  }
}
```

### 配置gulpfile.js
```javascript
var gulp = require("gulp");
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");

gulp.task("build", function () {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest(""));
});
```

### 从JavaScript=>TypeScript

![vuechat3.png](https://user-gold-cdn.xitu.io/2017/10/29/4866e9bbda07ba78cab6d47767e1b581)

<br>
</details>

<details><summary>部署</summary><br>

Linux+Nginx的组合，可以一键部署虚拟主机
[OneinStack](https://oneinstack.com/)

部署的遇到的坑
https://github.com/socketio/socket.io/issues/1942

`Error during WebSocket handshake: Unexpected response code: 400`

在nginx.conf添加

```nginx
location / {
	proxy_pass http://localhost:8989;
	proxy_http_version 1.1;
	proxy_set_header Upgrade $http_upgrade;
	proxy_set_header Connection "upgrade";
	proxy_set_header Host $host;
 }
```

<br>
</details>

## 如何使用
**预览地址：https://app.spiritree.me/**

**Github地址：https://github.com/spiritree/vue-socket.io-chat**

### 开启JavaScript服务端
```bash

# 从Github克隆本项目
`git clone https://github.com/spiritree/vue-socket.io-chat.git`

# 安装依赖
`npm install`

# 开启本地服务器
`npm run server`

```
### 开启TypeScript服务器
```bash

# 从Github克隆本项目
`git clone https://github.com/spiritree/vue-socket.io-chat.git`

# 安装依赖
`npm install`

# 切换目录
`cd server`

# 将TypeScript编译成JavaScript
`gulp build`

# 开启本地服务器
`npm run tsserver`

```
浏览器访问 http://localhost:8989
如遇在线列表不同步，刷新重进即可
## 预览
![vuechat0.png](https://user-gold-cdn.xitu.io/2017/10/29/0f5255e818d66f7611f75783b06e0fea)
![vuechat1.png](https://user-gold-cdn.xitu.io/2017/10/29/ff207d95b2d4251087a6f4fbd1f1d113)

## 参考资料

- [TypeScript 入门教程](https://github.com/xcatliu/typescript-tutorial)
- [Vue + TypeScript 尝鲜体验](https://zhuanlan.zhihu.com/p/29971290)
- [TypeScript官方手册](https://www.tslang.cn/docs/handbook/tsconfig-json.html)

## LICENSE
MIT

Copyright (c) 2017-present, spiritree