import Redis from 'ioredis';

// Configuration from environment variables with fallbacks
const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
const redisPassword = process.env.REDIS_PASSWORD || '';
const redisUsername = process.env.REDIS_USERNAME || 'default';

// Parse Redis URL to extract components
const parseRedisUrl = (url: string) => {
  try {
    const parsedUrl = new URL(url);
    return {
      host: parsedUrl.hostname,
      port: parseInt(parsedUrl.port || '6379', 10),
      username: parsedUrl.username || redisUsername,
      password: parsedUrl.password || redisPassword,
    };
  } catch (error) {
    console.error('Error parsing Redis URL:', error);
    return {
      host: 'localhost',
      port: 6379,
      username: redisUsername,
      password: redisPassword,
    };
  }
};

const redisConfig = parseRedisUrl(redisUrl);

// Create Redis client with configuration
let redis: Redis | null = null;

// Get Redis client (singleton pattern)
export const getRedisClient = () => {
  if (!redis) {
    redis = new Redis({
      host: redisConfig.host,
      port: redisConfig.port,
      username: redisConfig.username,
      password: redisConfig.password,
      retryStrategy: (times) => {
        // Exponential backoff with max 10 seconds
        const delay = Math.min(times * 50, 10000);
        return delay;
      },
    });

    redis.on('error', (err) => {
      console.error('Redis connection error:', err);
    });

    redis.on('connect', () => {
      console.log('Connected to Redis');
    });
  }

  return redis;
};

// Cache data with expiration
export const cacheData = async <T>(key: string, data: T, ttlSeconds = 3600): Promise<void> => {
  try {
    const client = getRedisClient();
    await client.set(key, JSON.stringify(data), 'EX', ttlSeconds);
  } catch (error) {
    console.error('Error caching data:', error);
  }
};

// Get cached data
export const getCachedData = async <T>(key: string): Promise<T | null> => {
  try {
    const client = getRedisClient();
    const data = await client.get(key);
    
    if (!data) return null;
    
    return JSON.parse(data) as T;
  } catch (error) {
    console.error('Error getting cached data:', error);
    return null;
  }
};

// Delete cached data
export const deleteCachedData = async (key: string): Promise<void> => {
  try {
    const client = getRedisClient();
    await client.del(key);
  } catch (error) {
    console.error('Error deleting cached data:', error);
  }
};

// Clear cache with pattern
export const clearCacheWithPattern = async (pattern: string): Promise<void> => {
  try {
    const client = getRedisClient();
    const keys = await client.keys(pattern);
    
    if (keys.length > 0) {
      await client.del(...keys);
    }
  } catch (error) {
    console.error('Error clearing cache with pattern:', error);
  }
};

// Simple demo function to test Redis connection
export const testRedisConnection = async (): Promise<{ success: boolean; timestamp: string }> => {
  try {
    const client = getRedisClient();
    const timestamp = new Date().toISOString();
    const testKey = 'redis:connection:test';
    
    await client.set(testKey, timestamp, 'EX', 60);
    const result = await client.get(testKey);
    
    return {
      success: result === timestamp,
      timestamp: result || 'No result',
    };
  } catch (error) {
    console.error('Redis connection test failed:', error);
    return {
      success: false,
      timestamp: 'Connection failed',
    };
  }
};
