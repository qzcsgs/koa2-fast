import demoDb from '../db/demo-db'
import { success, error } from '../../../utils/response'

export default {
  async selectDemo ({ page, page_size }) {
    const demos = await demoDb.selectDemo({ page, page_size })
    return demos ? success(demos) : error()
  },
  async insertDemo ({ title, content, create_time, update_time }) {
    const result = await demoDb.insertDemo({ title, content, create_time, update_time })
    return result ? success() : error()
  },
  async updateDemo ({ demo_id, title, content, create_time, update_time }) {
    const result = await demoDb.updateDemoById({ id: demo_id, title, content, create_time, update_time })
    return result ? success() : error()
  }
}
