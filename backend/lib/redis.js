import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

export const redis = new Redis(process.env.REDIS_URI);

console.log("Redis is connected");

// await redis.set('foo', 'bar');

// console.log(await redis.get('foo'));