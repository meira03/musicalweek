"use client"
import { signIn } from "next-auth/react";

const SignInButtonGoogle = () => {

  return (
      <button
        className="bg-black border-2 border-blue-500 hover:bg-zinc-950 text-white hover:text-gray-400 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
        type="button"
        onClick={() => signIn("google")}
        id="googleSignIn"
      >
        CONTINUAR COM O GOOGLE
      </button>
  );
};

export default SignInButtonGoogle;

