import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error('请在 .env.local 中定义 MONGODB_URI');
}

/**
 * 为了防止在 Next.js 开发环境下因热重载（Hot Reload）
 * 导致重复创建 MongoDB 连接，我们将连接缓存到 global 对象中。
 */
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// 这里的声明是为了让 global 对象知道 mongoose 属性的存在
declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache;
}

// 检查全局变量中是否已有缓存，没有则初始化
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export const connectDB = async () => {
  // 1. 如果已有活跃连接，直接返回
  if (cached.conn) {
    return cached.conn;
  }

  // 2. 如果还没有连接请求，则创建一个新的 Promise
  if (!cached.promise) {
    const opts = {
      bufferCommands: false, // 禁用缓冲，连接断开时立即报错
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((m) => {
      return m;
    });
  }

  // 3. 等待 Promise 完成并存入缓存
  try {
    cached.conn = await cached.promise;
    console.log('MongoDB 已成功连接');
  } catch (e) {
    cached.promise = null; // 失败时重置 Promise
    throw e;
  }

  return cached.conn;
};
