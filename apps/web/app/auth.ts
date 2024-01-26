import NextAuth from 'next-auth';
import type { NextAuthConfig } from 'next-auth';
import credentials from 'next-auth/providers/credentials';
import PocketBase from 'pocketbase';

interface credentialsType {
  username: string;
  password: string;
}

export const config = {
  providers: [
    credentials({
      async authorize(credentials: credentialsType) {
        const pb = new PocketBase('http://3.35.176.72:8090');

        const authData: any = await pb
          .collection('users')
          .authWithPassword(credentials.username, credentials.password)
          .then(data => data)
          .catch(() => null);

        if (authData) {
          const imageUrl = pb.files.getUrl(
            authData.record,
            authData.record.avatar,
            {
              thumb: '100x100',
            },
          );

          return {
            id: authData.record.id,
            name: authData.record.nickname,
            email: authData.record.email,
            image: imageUrl,
          };
        } else {
          return null;
        }
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
      if (token && session) {
        session.user.id = token.id;
      }
      // console.log('session =', session);
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
