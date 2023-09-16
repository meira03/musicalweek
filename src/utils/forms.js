"use server";
import { cookies } from 'next/headers'

export async function login(formData) {
  try {
    const body = {
      email: formData.get("email"),
      senha: formData.get("password"),
    };

    return await fetch(`http://localhost:3001/endpoints/usuario`, {
      method: "POST",
      body: JSON.stringify(body),
    })
      .then((result) => result.json())
      .then((res) => {
        console.log(res)
        if(res.login !== false) {
          const cookieStore = cookies();
          cookieStore.set('token', res.token)
          cookieStore.set('nick', res.nick)
          cookieStore.set('plano', res.plano)
          return {redirect: true}
        }else {
          return { message: "Email ou senha inserido está incorreto." }
        }
      });
  } catch (e) {
    console.log(e.toString());
    return { message: "Ocorreu um erro, tente novamente mais tarde.", error: e.toString() };
  }
}
