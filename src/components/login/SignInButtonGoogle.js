"use client"
import { signIn } from "next-auth/react";
const SignInButtonGoogle = () => {

  return (
    <>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="button"
        onClick={() => signIn("google")}
      >
        Entrar com Google
      </button>
    </>
  );
};

export default SignInButtonGoogle;
