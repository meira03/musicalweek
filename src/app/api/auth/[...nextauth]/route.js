import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import SpotifyProvider from 'next-auth/providers/spotify';

import { loginGoogle, loginSpotify } from '@/utils/forms'

export const authOption = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      profile(profile) {
        return {
          id: profile.id,
          name: profile.display_name,
          email: profile.email,
          image: profile.images?.[0]?.url
        }
      },
    }),
  ],
  secret: process.env.JWT_SECRET,
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token = Object.assign({}, token, { access_token: account.access_token });
      }
      return token
    },
    async signIn(profile) {
      if (profile.account.provider === 'google') {
        const token = profile.account.access_token
        const res = await loginGoogle(token);
        if (res.cadastro == false) {
          return '/cadastro-provider';
        }

        if (res.token != null && res.token != '') {
          return '/search';
        }
      }
      if (profile.account.provider === 'spotify') {
        const token = profile.account.access_token
        const res = await loginSpotify(token);
        if (res.cadastro == false) {
          return '/cadastro-provider';
        }

        if (res.token != null && res.token != '') {
          return '/search';
        }
      }
      return true;
    },
  }
};

const handler = NextAuth(authOption);

export { handler as GET, handler as POST };

