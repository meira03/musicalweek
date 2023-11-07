"use client"
import { signIn } from "next-auth/react";

const SignInButtonSpotify = () => {
  return (
      <button
        className="bg-black-100 dark:bg-black-300 border-2 border-neon-blue-300 text-white hover:text-gray-400 font-bold py-2 px-4 focus:outline-none focus:shadow-outline w-full"
        type="button"
        onClick={() => signIn("spotify")}
        id="spotifySignIn"
      >
        CONTINUAR COM SPOTIFY
      </button>
  );
};

export default SignInButtonSpotify;
