import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import SpotifyProvider from "next-auth/providers/spotify";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOption = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "E-mail", type: "text", placeholder: "email" },
        senha: { label: "Senha", type: "password", placeholder: "senha" },
      },
      async authorize(credentials, req) {
        return {
          provider: 'credentials',
          credentials: credentials,
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if(account.provider == 'google'){
        const res = await fetch("https://musicalweek-api.azurewebsites.net/endpoints/usuario/", {
          method: 'POST',
          body: JSON.stringify({
            token_google: account.access_token || credentials.token,
          }),
          headers: { "Content-Type": "application/json" }
        })

        const response = await res.json()

        if(response.cadastro === false){
          return '/cadastro'
        }
        user.user = response
        return true
      }
      if(account.provider == 'spotify'){
        const res = await fetch("https://musicalweek-api.azurewebsites.net/endpoints/usuario/", {
          method: 'POST',
          body: JSON.stringify({
            token_spotify: account.access_token || credentials.token,
          }),
          headers: { "Content-Type": "application/json" }
        })

        const response = await res.json()

        if(response.cadastro === false){
          return '/cadastro'
        }
        user.user = response
        return true
      }
      if(account.provider == 'credentials'){
        const res = await fetch("https://musicalweek-api.azurewebsites.net/endpoints/usuario/", {
          method: 'POST',
          body: JSON.stringify({
            email: credentials.email,
            senha: credentials.senha
          }),
          headers: { "Content-Type": "application/json" }
        })

        const response = await res.json()

        if(response.login === false){
          throw Error(response.descricao)
        }
        user.user = response
        return response
      }
      return false
    },
    async jwt({ token, user }) {
      user && (token.user = user.user);
      return token;
    },
    async session({ session, token }) {
      session = token.user;
      return session;
    },
  },
};

const handler = NextAuth(authOption);

export { handler as GET, handler as POST };
