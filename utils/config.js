/**
 * 项目配置
 */
export default {
  port: '1314',
  https: false,
  httpsKey: 'utils/ssl/xxx.xxxxx.com.key',
  httpsPem: 'utils/ssl/xxx.xxxxx.com.pem',
  db: {
    host: 'localhost',
    hostDev: 'localhost', // 开发环境的地址可以不填
    database: 'koa2-fast',
    user: 'koa2-fast',
    password: 'HBDypMDaahKyT7Ek'
  },
  redis: {
    host: '127.0.0.1',
    port: 6379
  },
  popCore: {
    accessKeyId: '',
    accessKeySecret: '',
    endpoint: 'https://dysmsapi.aliyuncs.com',
    apiVersion: '2017-05-25'
  },
  response: {
    successCode: 200,
    successMessage: '操作成功',
    errorCode: 500,
    errorMessage: '系统错误',
  }
} 