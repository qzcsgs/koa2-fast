/**
 * 项目配置
 * 时间统一单位(秒)
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
    port: 6379,
    prefixKey: 'fk_' // redis key 前缀
  },
  popCoreConfig: {
    accessKeyId: '',
    accessKeySecret: '',
    endpoint: 'https://dysmsapi.aliyuncs.com',
    apiVersion: '2017-05-25',
    // 短信模板
    template: {
      login(phone, code) {
        return {
          RegionId: "cn-hangzhou",
          PhoneNumbers: `${phone}`,
          SignName: '',
          TemplateCode: '',
          TemplateParam: `{ "code": "${code}" }`,
          codeExpire: 58, // 登录短信验证码过期时间 单位秒
        }
      }
    }
  },
  response: {
    successCode: 200,
    successMessage: '操作成功',
    errorCode: 500,
    errorMessage: '系统错误',
    authCode: 403,
    authMessage: '没有权限'
  },
  AES256GCMKey: 'mvMCsmdnilAwucaBGmglsEjamchnlkcA', // 加解密用到的key 32位
  tokenExpire: 3 * 24 * 3600, // token过期时间 单位秒
} 