"use client"
import { signIn } from "next-auth/react";

const SignInButtonSpotify = () => {
  return (
      <button
        className="border border-neon-blue-200  hover:bg-neon-blue-200 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline w-full"
        type="button"
        onClick={() => signIn("spotify")}
        id="spotifySignIn"
      >
        CONTINUAR COM O SPOTIFY
      </button>
  );
};

export default SignInButtonSpotify;
