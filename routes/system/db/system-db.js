import query from '../../../utils/mysql/query'

export default {
  selectUserInfoByPhone (phone) {
    return new Promise(async (resolve) => {
      try {
        const sql = 'select id,phone,coins,is_pay from `t_user` where `is_disable`=0 and `phone`=?'
        const results = await query(sql, [ phone ])
        const userInfo = results[0]
        resolve(userInfo)
      } catch (error) {
        resolve(false)
      }
    })
  }
}
