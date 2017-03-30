var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.use('/static', express.static('static'));
//读取目录static下的文件

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});
//读取根目录下的index.html

io.on('connection', function(socket) {
  var user = '';
  socket.on('chat message', function(msg) {
    io.emit('chat message', msg);
    console.log(msg);
  });
});

http.listen(port, function() {
  console.log('listening on *:' + port);
});