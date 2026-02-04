const Redis = require('ioredis');

 
const redis = new Redis(process.env.REDIS_URL);

function getredisURL() {
    console.log("redis url");
    console.log(process.env.REDIS_URL);

}
 getredisURL();
exports.setCache = async (key, value, ttl) => {
  await redis.set(key, JSON.stringify(value), 'EX', ttl);
};
 
exports.getCache = async (key) => {
  const value = await redis.get(key);
  return value ? JSON.parse(value) : null;
};