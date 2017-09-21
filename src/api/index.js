const data = require('./mock')

/**
 * 从mock数据中获取data
 * 执行callback回调函数读取data
 * @export
 * @param {any} callback 
 */
export function getAllMessages (callback) {
  callback(data)
}

/**
 * 
 * 
 * @export
 * @param {any} { text, thread, userName } 定义载荷(payload)形式分发的数据
 * @param {any} callback 
 */
export function createMessage ({ text, thread, userName }, callback) {
  const timestamp = Date.now()
  const id = 'm_' + timestamp
  const message = {
    id,
    text,
    timestamp,
    threadID: thread.id,
    threadName: thread.name,
    authorName: userName
  }
  callback(message)
}