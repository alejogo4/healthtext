import Credentials from 'next-auth/providers/credentials';

import { loginService } from '@/services/login';

export const authOptions = {
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const foundUser = await loginService({email, password})

        if ( foundUser && !foundUser?.access_token) {
          return null;
        }

      
        if (foundUser && foundUser?.access_token) {
          return foundUser as any;
        }
        return null;
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: 'jwt'
  },
  debug: process.env.NODE_ENV !== 'production'
};
