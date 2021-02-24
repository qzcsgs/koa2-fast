import query from '../../../utils/mysql/query'
import { formatSql } from '../../../utils/utils'

export default {
  selectDemo ({ page = 1, page_size = 10 }) {
    return new Promise(async (resolve) => {
      try {
        const sql = `SELECT * FROM \`t_demo\` ORDER BY id DESC LIMIT ${(page - 1) * page_size},${page_size}`
        const demos = await query({ sql })
        resolve(demos)
      } catch (error) {
        resolve(false)
      }
    })
  },
  insertDemo ({ title, content, create_time, update_time }) {
    return new Promise(async (resolve) => {
      try {
        const sqlHandle = formatSql({ table: 't_demo', data: { title, content, create_time, update_time } })
        await query(sqlHandle)
        resolve(true)
      } catch (error) {
        resolve(false)
      }
    })
  },
  updateDemoById ({ id, title, content, create_time, update_time }) {
    return new Promise(async (resolve) => {
      try {
        const sqlHandle = formatSql({ type: 'update', table: 't_demo', data: { title, content, create_time, update_time } })
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
