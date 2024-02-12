import NextAuth from 'next-auth';
import type { DefaultSession, NextAuthConfig } from 'next-auth';
import credentials from 'next-auth/providers/credentials';
import PocketBase from 'pocketbase';
declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      email: string;
      id: string;
      image: string;
      name: string;
    };
  }
}

interface credentialsType {
  email: string;
  password: string;
}

export const config = {
  providers: [
    credentials({
      async authorize(credentials: credentialsType) {
        const pb = new PocketBase('http://3.35.176.72:8090');

        const authData: any = await pb
          .collection('users')
          .authWithPassword(credentials.email, credentials.password)
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
            username: authData.record.username,
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
    async jwt({ token, trigger, account, user, profile, session }) {
      // console.log('TOKEN =', token);
      // console.log('session =', session);
      // console.log('Account =', account);
      // console.log('User= ', user);
      // console.log('profile= ', profile);
      if (trigger === 'update' && session.name && session.image) {
        // session 업데이트 (닉네임 수정)
        token.name = session.name;
        token.image = session.image;
        token.picture = session.image;
      }
      return {
        ...token,
        ...user,
      };
    },
    session({ session, token }) {
      if (token && session) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.image = token.image;
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
