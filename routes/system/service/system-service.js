import systemDb from '../db/system-db'
import { success, error } from '../../../utils/response'

export default {
  async selectSystem ({ page, page_size }) {
    const systems = await systemDb.selectSystem({ page, page_size })
    return systems ? success(systems) : error()
  },
  async insertSystem ({ name, value, create_time, update_time }) {
    const result = await systemDb.insertSystem({ name, value, create_time, update_time })
    return result ? success() : error()
  },
  async updateSystem ({ system_id, name, value, create_time, update_time }) {
    const result = await systemDb.updateSystemById({ id: system_id, name, value, create_time, update_time })
    return result ? success() : error()
  }
}
