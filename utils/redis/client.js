import redis from 'redis'
import { redis as redisConfig } from '../config'

const client = redis.createClient(redisConfig.port, redisConfig.host)
client.on('error', function (err) {
  console.log('Error ' + err)
})

export default client
