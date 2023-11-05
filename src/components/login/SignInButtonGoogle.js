"use client"
import { signIn } from "next-auth/react";

const SignInButtonGoogle = () => {

  return (
      <button
        className="bg-black-900 border-2 border-neon-blue-300 text-white hover:text-gray-400 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full font-family:tech"
        type="button"
        onClick={() => signIn("google")}
        id="googleSignIn"
      >
        CONTINUAR COM O GOOGLE
      </button>
  );
};

export default SignInButtonGoogle;

