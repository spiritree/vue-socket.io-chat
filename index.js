var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

// // 设置模板引擎为pug
// app.set('view engine', 'pug');

// // 设置目录view为模板目录
// app.set('views', 'view');

// 读取目录static下的文件
app.use('/static', express.static('static'));

// 读取根目录下的index.html
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
  var user = '';

  // socket.on('join', function(userName) {
  //   // 通知房间内人员
  //   console.log(user + '加入了');
  // });

  socket.on('chatmessage', function(message) {
    // 接受用户信息
    io.emit('chatmessage', message);
  });
});

http.listen(port, function() {
  console.log('listening on *:' + port);
});