const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 8989;

// 读取目录static下的文件
app.use('/static', express.static('dist/static'));

// 读取根目录下的index.html
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/dist/index.html');
});

io.on('connection', function(socket) {
  var user = '';
  console.log('find a person');
  socket.on('join', function(data) {
    user = data;
    userList.push(user);
    console.log(user);
    console.log(userList[0],userList[1]);
  });

  // 接受用户信息
  socket.on('chatmessage', function(message) {
    io.emit('chatmessage', message);
  });

  // 接受用户名称
  socket.on('userList', function(data) {
    io.emit('userList', data);
  })

  // 用户退出
  socket.on('dis', function(data) {
    io.emit('dis', data);
  })
});

http.listen(port, function() {
  console.log('listening on *:' + port);
});