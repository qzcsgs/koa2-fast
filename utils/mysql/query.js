import mysql from 'mysql'
import { db } from '../config'

const env = process.env.NODE_ENV
const isProd = env === 'prod'

const pool = mysql.createPool({
  ...db,
  host: isProd ? db.host : (db.hostDev || db.host),
  useConnectionPooling: true,
  dateStrings: true
})

export default function ({ sql, params = [] }) {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connect) => {
      if (err) {
        console.log(err)
        return reject(err)
      } else {
        connect.query(sql, params, (err, values) => {
          connect.release() // 释放连接
          if (err) {
            console.log(err)
            return reject(err)
          } else {
            resolve(values)
          }
        })
      }
    })
  })
}
