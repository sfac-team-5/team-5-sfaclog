import NextAuth from 'next-auth';
import type { NextAuthConfig } from 'next-auth';
import credentials from 'next-auth/providers/credentials';
import PocketBase from 'pocketbase';
export const config = {
  providers: [
    credentials({
      async authorize(credentials) {
        const pb = new PocketBase('http://3.35.176.72:8090');
        const authData: any = await pb
          .collection('users')
          .authWithPassword(credentials.id, credentials.password)
          .then(data => data)
          .catch(() => null);
        console.log('authData = ', authData);
        return {
          id: authData.record.id,
          name: authData.record.username,
          email: authData.record.email,
          image: authData.record.avatar,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, account, user, profile }) {
      //   console.log('TOKEN =', token);
      //   console.log('Account =', account);
      //   console.log('User= ', user);
      //   console.log('profile= ', profile);
      return {
        ...token,
        ...user,
      };
    },
    session({ session, token }) {
      console.log('session TOKEN ', token);
      if (token) {
        session.user.id = token.id;
      }
      return session;
    },
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl;
      if (pathname === '/middleware-example') return !!auth;
      return true;
    },
  },
  secret: process.env.AUTH_SECRET,
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
