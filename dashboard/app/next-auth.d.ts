import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface User {
    id: string;
    accessToken?: string;
    tokenType?: string;
    expiresIn?: number;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string;
    tokenType?: string;
    expiresIn?: number;
  }
}

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    tokenType?: string;
    expiresIn?: number;
  }
}