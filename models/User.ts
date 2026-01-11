import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  name: { type: String },
  image: { type: String },
});

// 如果模型已存在则直接使用，不存在则创建
export const User = models.User || model('User', UserSchema);
