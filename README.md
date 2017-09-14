# Socket.io实现web在线聊天室

[![Build Status](https://img.shields.io/travis/spiritree/vue-socket.io-chat/master.svg?style=flat-square)](https://travis-ci.org/spiritree/vue-socket.io-chat)

## 项目介绍
技术栈：Vue + iView + socket.io + Express

### 安装和使用
从github clone项目

`git clone https://github.com/spiritree/vue-socket.io-chat.git`

安装依赖
`npm install`

启动服务
`node index`

访问
`http://localhost:8989/`

### 预览地址
TODO

### 功能
- 消息接受和发送
- 在线列表

## 实现思路
利用`socket.on`绑定事件，`socket.emit`触发事件，实现服务器和客户端的实时交互

## TODO LIST
- [ ] 用Vue重构前端