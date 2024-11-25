import { getProfile, loginService } from '@/services/login';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Laravel API',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'example@example.com'
        },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials) return null;

        try {
          const { email, password } = credentials as {
            email: string;
            password: string;
          };

          const foundUser = await loginService({ email, password });

          if (foundUser) {
            return {
              id: credentials.email,
              accessToken: foundUser.access_token,
              tokenType: foundUser.token_type,
              expiresIn: foundUser.expires_in
            };
          } else {
            return null;
          }
        } catch (error) {
          console.error('Error durante la autenticación:', error);
          return null;
        }
      }
    })
  ],
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.tokenType = user.tokenType;
        token.expiresIn = user.expiresIn;
        console.log(user.accessToken)
        const profile = await getProfile(user.accessToken ?? '');
        console.log(profile)
        token.additionalInfo = profile ?? undefined; 

      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.tokenType = token.tokenType;
      session.expiresIn = token.expiresIn;

      if (token?.additionalInfo) {
        session.additionalInfo = token.additionalInfo;
      }

      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET
};

export default NextAuth(authOptions);
