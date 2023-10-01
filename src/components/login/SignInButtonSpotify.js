"use client"
import { signIn, signOut, useSession } from "next-auth/react"

const SignInButtonSpotify = () => {
  const { data: session } = useSession();
  console.log(session)
  // console.log(session.accessToken)

  return (
    <>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="button"
        onClick={() => signIn("spotify")}
        style={{ backgroundColor: "#1ED760" }}
      >
        Entrar com Spotify
      </button>

    </>
  )
}

export default SignInButtonSpotify;