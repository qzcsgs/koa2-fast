import query from '../../../utils/mysql/query'
import { formatSql } from '../../../utils/utils'

export default {
  selectSystem () {
    return new Promise(async (resolve) => {
      try {
        const sql = 'SELECT * FROM `t_system`'
        const systems = await query(sql, [])
        resolve(systems)
      } catch (error) {
        resolve(false)
      }
    })
  },
  insertSystem ({ name, value }) {
    return new Promise(async (resolve) => {
      try {
        const sqlHandle = formatSql({ table: 't_system', data: { name, value } })
        await query(sqlHandle)
        resolve(true)
      } catch (error) {
        resolve(false)
      }
    })
  },
  updateSystemById ({ id, name, value, create_time, update_time }) {
    return new Promise(async (resolve) => {
      try {
        const sqlHandle = formatSql({ type: 'update', table: 't_system', data: { name, value, create_time, update_time } })
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
