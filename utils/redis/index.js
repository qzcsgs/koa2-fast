import client from './client'

export default {
  /**
   * 向数组中push一个值
   * @param {string} key key不存在则会创建
   * @param {string} value 
   * @param {number} expire 过期时间，单位是秒，可选参数
   */
  lpushList(key, value, expire) {
    return new Promise(async (resolve, reject) => {
      const list = await lrangeList(key, 0, 1)

      client.lpush(key, value, (err, length) => {
        if (err) {
          console.log(err)
          return reject()
        } else {
          resolve(length) // length是当前list长度
        }
      })

      if (!list.length && expire) {  // 如果key不存在list为[]
        // 设置过期时间
        await expireSecond(key, expire)
      } else {
        await ttl(key) == -1 && await expireSecond(key, expire)
      }
    })
  },
  /**
   * 
   * @param {string} key 
   * @param {number} start 起始索引
   * @param {number} end 结束索引
   */
  lrangeList(key, start, end) {
    return new Promise((resolve, reject) => {
      client.lrange(key, start, end, (err, list) => {
        if (err) {
          console.log(err)
          return reject()
        } else {
          resolve(list)
        }
      })
    })
  },
  /**
   * 设置过期时间
   * @param {string} key 
   * @param {number} expire 秒
   */
  expireSecond(key, expire) {
    return new Promise((resolve, reject) => {
      client.expire(key, expire, (err, value) => { // 多少秒后过期
        if (err) {
          console.log(err)
          return reject()
        } else {
          resolve(value) // value 0和1代表 false true
        }
      })
    })
  },
  /**
   * 查看剩余过期时间
   */
  ttl(key) {
    return new Promise((resolve, reject) => {
      client.ttl(key, (err, time) => {
        if (err) {
          console.log(err)
          return reject()
        } else {
          resolve(time) // 剩余多少秒过期, -1值存在但是没有过期时间, -2没有这个值
        }
      })
    })
  },
  /**
   * 存一个key: value
   * @param {string} key key存在之前的值会被覆盖
   * @param {string} value
   * @param {number} expire 过期时间，可选，单位秒
   */
  set(key, value, expire) {
    try {
      if (typeof value != 'string') {
        value = JSON.stringify(value)
      }
    } catch (error) { }
    return new Promise((resolve, reject) => {
      const cb = (err, value) => {
        if (err) {
          reject()
          return console.log(err)
        } else {
          resolve(value) // ok
        }
      }
      if (expire) {
        client.set(key, value, 'EX', expire, cb)
      } else {
        client.set(key, value, cb)
      }
    })
  },
  /**
   * @param {string} key 
   */
  get(key) {
    return new Promise((resolve, reject) => {
      client.get(key, (err, value) => {
        try {
          value = JSON.parse(value)
        } catch (error) { }
        err ? reject(err) : resolve(value) // key不存在会返回null
      })
    })
  },
  del(key) {
    return new Promise((resolve, reject) => {
      client.del(key, (err, value) => {
        err ? reject(err) : resolve(value) // key不存在会返回null
      })
    })
  }
}
