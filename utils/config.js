/**
 * 项目配置
 */
export default {
  port: '1314',
  https: true,
  httpsKey: 'utils/ssl/xxx.xxxxx.com.key',
  httpsPem: 'utils/ssl/xxx.xxxxx.com.pem',
  db: {
    host: 'localhost',
    hostDev: 'xxx.xxxxx.com', // 开发环境的地址可以不填
    user: 'test',
    password: '123456',
    database: 'testDataBase'
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
  }
} 