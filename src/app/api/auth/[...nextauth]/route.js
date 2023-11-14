import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import SpotifyProvider from 'next-auth/providers/spotify';
import CredentialsProvider from "next-auth/providers/credentials"

import { loginGoogle, loginSpotify } from '@/utils/forms'

export const authOption = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "E-mail", type: "text", placeholder: "email" },
        senha: { label: "Senha", type: "password", placeholder: "senha" }
      },
      async authorize(credentials, req) {
        const res = await fetch("https://musicalweek-api.azurewebsites.net/endpoints/usuario/", {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" }
        })

        const user = await res.json()

        if(user.login === false){
          throw Error(user.descricao)
        }else {
          return user
        }
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      token_endpoint_auth_method: "none",
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
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      user && (token.user = user)
      return token
    },
    async session({session, token }){
      session = token.user
      return session
    }
  }
};

const handler = NextAuth(authOption);

export { handler as GET, handler as POST};

