const Redis = require('ioredis');

let redis;

function getRedisClient() {
  if (!redis) {
    if (!process.env.REDISCLOUD_URL) {
      console.warn('⚠️ REDIS_URL not set. Cache disabled.');
      return null;
    }

    console.log('🔌 Connecting to Redis:', process.env.REDISCLOUD_URL);

    redis = new Redis(process.env.REDISCLOUD_URL);

    redis.on('connect', () => {
      console.log('✅ Redis connected');
    });

    redis.on('error', (err) => {
      console.error('❌ Redis error:', err.message);
    });
  }

  return redis;
}

exports.setCache = async (key, value, ttl) => {
  const client = getRedisClient();
  if (!client) return;
  await client.set(key, JSON.stringify(value), 'EX', ttl);
};

exports.getCache = async (key) => {
  const client = getRedisClient();
  if (!client) return null;

  const value = await client.get(key);
  return value ? JSON.parse(value) : null;
};
