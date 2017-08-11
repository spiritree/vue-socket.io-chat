# Socket.io实现web在线聊天室

[![Build Status](https://img.shields.io/travis/SpiriTree/socket.io-chat/master.svg?style=flat-square)](https://travis-ci.org/SpiriTree/socket.io-chat)

## 项目介绍
技术栈：Express + Socket.io + JQuery + Bootstrap

### 安装和使用
从github clone项目

`git clone https://github.com/SpiriTree/Socket.io-chat.git`

安装依赖
`npm install`

启动服务
`node index.js`

访问
`http://localhost:3000/`

### 预览地址
http://115.159.103.178:3000

### 功能
- 消息接受和发送
- 在线列表

## 实现思路
利用`socket.on`绑定事件，`socket.emit`触发事件，实现服务器和客户端的实时交互

### 服务器
构建Express服务器

```javascript
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

// 读取目录static下的文件
app.use('/static', express.static('static'));

// 读取根目录下的index.html
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
```

Socket.io

```javascript
  // 接受用户信息
  socket.on('chatmessage', function(message) {
    io.emit('chatmessage', message);
  });
```

### 客户端

```javascript
  // 发送消息
  $('#form-chat').submit(function() {
    socket.emit('chatmessage', 'Name:' + $('#nametext').val());
    socket.emit('chatmessage', 'Text:' + $('#chattext').val());
    $('#chattext').val('');
    return false;
  });

  // 监听消息
  socket.on('chatmessage', function(message) {
    var message = '' +
      '<div>' +
      '  <span>' + message + '</span>' +
      '</div>';
    $('#message-list').append(message);
  });
  ```
