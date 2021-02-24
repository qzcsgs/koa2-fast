import systemDb from '../db/system-db'
import { success, error } from '../../../utils/response'

export default {
  async selectSystem () {
    const systems = await systemDb.selectSystem()
    return systems ? success(systems) : error()
  },
  async insertSystem ({ name, value }) {
    if (!name) { return error('缺少字段name') }
    if (!value) { return error('缺少字段value') }

    const result = await systemDb.insertSystem({ name, value })
    return result ? success() : error()
  },
  async updateSystem ({ system_id, name, value, create_time, update_time }) {
    const result = await systemDb.updateSystemById({ id: system_id, name, value, create_time, update_time })
    return result ? success() : error()
  },
}
