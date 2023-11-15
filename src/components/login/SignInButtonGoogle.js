"use client"
import { signIn } from "next-auth/react";

const SignInButtonGoogle = () => {

  return (
    <button
      className="border border-neon-blue-200 hover:bg-neon-blue-200 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline w-full font-family:tech"
      type="button"
      onClick={() => signIn("google")}
      id="googleSignIn"
    >
      CONTINUAR COM GOOGLE
    </button>
  );
};

export default SignInButtonGoogle;

