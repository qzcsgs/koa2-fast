import query from '../../../utils/mysql/query'
import { formatSql } from '../../../utils/utils'

export default {
  userLogin ({ name, password }) {
    return new Promise(async (resolve) => {
      try {
        const sql = `SELECT * FROM \`t_user\` WHERE \`name\`=? and \`password\`=?`
        const users = await query({ sql, params: [name, password] })
        resolve(users[0])
      } catch (error) {
        resolve(false)
      }
    })
  },
  selectUser ({ page = 1, page_size = 10 }) {
    return new Promise(async (resolve) => {
      try {
        const sql = `SELECT * FROM \`t_user\` ORDER BY id DESC LIMIT ${(page - 1) * page_size},${page_size}`
        const users = await query({ sql })
        resolve(users)
      } catch (error) {
        resolve(false)
      }
    })
  },
  insertUser ({ name, password, create_time, update_time }) {
    return new Promise(async (resolve) => {
      try {
        const sqlHandle = formatSql({ table: 't_user', data: { name, password, create_time, update_time } })
        await query(sqlHandle)
        resolve(true)
      } catch (error) {
        resolve(false)
      }
    })
  },
  updateUserById ({ id, name, password, create_time, update_time }) {
    return new Promise(async (resolve) => {
      try {
        const sqlHandle = formatSql({ type: 'update', table: 't_user', data: { name, password, create_time, update_time } })
        sqlHandle.sql += ' WHERE `id`=?'
        sqlHandle.params.push(id)
        await query(sqlHandle)
        resolve(true)
      } catch (error) {
        resolve(false)
      }
    })
  }
}
