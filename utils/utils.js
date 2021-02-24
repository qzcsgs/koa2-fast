import crypto from 'crypto'

export default {
  /**
   * 随机截取指定长度的字符串
   * @param {number} len 为截取字符串长度
   * @param {string} letters 要截取的字符串模板，默认为 abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890
   */
  randomStrWithLength(len, letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890') {
    var str = ''
    for (let i = 0; i < len; i++) {
      var start = Math.floor(Math.random() * Math.floor(len))
      str = str + letters.substring(start, start + 1)
    }
    return str
  },
  /**
   * @description 16进制 => 10进制 => 字符
   * @param {string} str Hex
   * @return {string}
   */
  binary16ToString(str) {
    let arr = []
    Array.prototype.map.call(str, (c, i) => {
      if (i % 2 !== 0) {
        arr.push(parseInt(str[i - 1] + str[i], 16)) // 返回当前位置前两个
      } else if (str.length - 1 == i) {
        arr.push(parseInt(str[i], 16)) // 最后一位为偶数
      }
    })
    return String.fromCharCode.apply(null, arr)
  },
  /**
   * 获取距离中国0点还有多少秒
   */
  nextExTime() {
    let currentTime = new Date()
    let currentMs = +new Date()

    let zeroMs = +new Date(`${currentTime.getFullYear()}/${currentTime.getMonth() + 1}/${new Date().getDate()} 23:59:59`)
    let offset = zeroMs - currentMs

    if (offset <= 0) {
      offset = 86400000 + offset
    }
    return parseInt(offset / 1000)
  },
  md5(str, encoding = 'utf8') {
    return crypto.createHash('md5').update(str, encoding).digest('hex')
  },
  /**
   * @getClientIP
   * @desc 获取用户 ip 地址
   * @param {Object} req - 请求
   */
  getClientIP(req) {
    return req.headers['x-forwarded-for'] || // 判断是否有反向代理 IP
      req.connection.remoteAddress || // 判断 connection 的远程 IP
      req.socket.remoteAddress || // 判断后端的 socket 的 IP
      req.connection.socket.remoteAddress
  },
  formatSql({ type = 'insert', table, data }) {
    type = type.toLocaleLowerCase()
    const keys = []
    const newData = []
    for (let key in data) {
      if (data[key] != undefined) {
        keys.push(key)
        newData.push(data[key])
      }
    }
    let sql = ''
    if (type == 'insert') {
      sql = `INSERT INTO \`${table}\` (\`${keys.join('`,`')}\`) VALUES (${keys.map(_ => '?').join(',')})`
    } else if (type == 'update') {
      sql = `UPDATE \`${table}\` SET \`${keys.join('`=?,`')}\`=?`
    }

    return { sql, params: newData }
  }
}
