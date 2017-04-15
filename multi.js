// 连接数组
var connectlist = []; 
var socket = SocketIO();

// 检测是否有新用户连入
function searchThread() {
  while (true) {
    // 阻塞状态等待连入
    var address = socket.accept();
    var receiver = thread.receive(address);
    thread.lock();
    connectlist.push(receiver);
    thread.release();
    receiver.start();
  }
}

// 接受消息的线程
function receiveThread() {
  var counter = 0;
  mutex.lock();
  if (receiver.thread.counter === 0) {
    thread.lock();
  }receiver.thread.counter += 1;
  mutex.release();
  for (let i=0; i<connectlist.length; i++) {
    socket.send(msg);
  }
  mutex.lock();
  receiver.thread.counter -= 1;
  if (receiver.thread.counter === 0) {
    thread.release();
  }
  mutex.release();
}

receive_msg();
send_msg();