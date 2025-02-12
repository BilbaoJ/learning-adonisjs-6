import redis from '@adonisjs/redis/services/main'

class CacheService {
  async has(...key: string[]) {
    return redis.exists(key)
  }

  async get(key: string) {
    const value = await redis.get(key)
    return value && JSON.parse(value)
  }

  async set(key: string, value: any) {
    return redis.set(key, JSON.stringify(value))
  }

  async delete(...key: string[]) {
    return redis.del(key)
  }

  // this function will flush out all of the data that
  // we have stored within the particular database tha
  // we are using inside of Redis
  async flushDb() {
    return redis.flushdb()
  }
}

const cache = new CacheService()
export default cache
