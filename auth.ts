import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { connectDB } from '@/lib/db';
import { User } from '@/models/User';
import bcrypt from 'bcryptjs';

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: 'Credentials',
      async authorize(credentials) {
        await connectDB();

        const { email, password } = credentials;
        if (!email || !password) return null;

        // 查找用户并强制拉取密码字段
        const user = await User.findOne({ email }).select('+password');
        if (!user) return null;

        const isMatch = await bcrypt.compare(password as string, user.password);
        if (!isMatch) return null;

        return { id: user._id.toString(), email: user.email, name: user.name };
      },
    }),
  ],
  session: { strategy: 'jwt' }, // 使用 JWT 策略
  pages: {
    signIn: '/login', // 自定义登录页
  },
});
