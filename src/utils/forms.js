"use server";
import { getServerSession } from "next-auth";
import { authOption } from "@/app/api/auth/[...nextauth]/route";
import { cookies } from 'next/headers'

export async function register(formData) {
  try {
    const body = {
      nome: formData.get("completeName"),
      nick: formData.get("nickname"),
      data_nasc: formData.get("birthday"),
      email: formData.get("email"),
      senha: formData.get("passwordCadastro"),
    }

    const today = new Date();
    const userBirthday = new Date(body.data_nasc);
    const userAge = today.getFullYear() - userBirthday.getFullYear();
    let validAge = true;
    if (userAge <= 0) { validAge = false; }
    if (userAge < 18) { validAge = false; }
    if (userAge > 130) { validAge = false; }

    return await fetch(`https://musicalweek-api.azurewebsites.net/endpoints/usuario/index.php`, {
      method: "POST",
      cache: 'no-store',
      body: JSON.stringify(body),
    })
      .then((result) => result.json())
      .then((res) => {
        if (res.descricao === 'Variável(s) fora do formato') {
          return { message: 'Alguma das informações inseridas é inválida.' }
        } else if (res.descricao === 'Variável(s) já está cadastrada' && res.nick === true && res.email === true) {
          return { message: 'Usuário já está cadastrado!' }
        } else if (res.descricao === 'Variável(s) já está cadastrada' && res.email === true) {
          return { message: "O email em questão já está em uso." }
        } else if (res.descricao === 'Variável(s) já está cadastrada' && res.nick === true) {
          return { message: "O nickname em questão já está em uso." }
        } else {
          return { redirect: true }
        }
      });
  } catch (e) {
    return {
      message: "Ocorreu um erro, tente novamente mais tarde.", error: e.toString()
    };
  }
}

export async function loginGoogle(token) {
  try {
    const body = {
      token_google: token
    }

    return fetch(`https://musicalweek-api.azurewebsites.net/endpoints/usuario/index.php`, {
      method: "POST",
      body: JSON.stringify(body),
    })
      .then((result) => result.json())
      .then((res) => {
        const cookieStore = cookies()
        cookieStore.set('token_google', body.token_google)
        cookieStore.set('provider', 'google')

        if (res.cadastro != false) {
          cookieStore.set('token', res.token)
          cookieStore.set('nick', res.nick)
          cookieStore.set('plano', res.plano)
        }
        return res
      });
  } catch (e) {
    return { message: "Ocorreu um erro, tente novamente mais tarde.", error: e.toString() };
  }
}

export async function loginSpotify(token) {
  try {
    const body = {
      token_spotify: token
    }

    return fetch(`https://musicalweek-api.azurewebsites.net/endpoints/usuario/index.php`, {
      method: "POST",
      body: JSON.stringify(body),
    })
      .then((result) => result.json())
      .then((res) => {
        const cookieStore = cookies();
        cookieStore.set('token_spotify', body.token_spotify)
        cookieStore.set('provider', 'spotify')

        if (res.cadastro != false) {
          cookieStore.set('token', res.token)
          cookieStore.set('nick', res.nick)
          cookieStore.set('plano', res.plano)
        }
        return res
      });
  } catch (e) {
    return { message: "Ocorreu um erro, tente novamente mais tarde.", error: e.toString() };
  }
}

export async function cadastroProvider(formData) {
  try {
    const session = await getServerSession(authOption);
    const body = {
      token_google: session.token,
      nome: formData.get("completeName"),
      nick: formData.get("nickname"),
      data_nasc: formData.get("birthday"),
    };


    const today = new Date();
    const userBirthday = new Date(body.data_nasc);
    const userAge = today.getFullYear() - userBirthday.getFullYear();
    let validAge = true;
    if (userAge <= 0) { validAge == false; }
    if (userAge < 18) { validAge == false; }
    if (userAge > 130) { validAge == false; }

    return await fetch(`https://musicalweek-api.azurewebsites.net/endpoints/usuario/index.php`, {
      method: "POST",
      body: JSON.stringify(body),
    })
      .then((result) => result.json())
      .then((res) => {
        console.log(res.descricao)
        if (res.descricao === 'Variável(s) fora do formato') {
          return {
            message: 'Alguma das informações inseridas é inválida.'
          }
        } else if (res.descricao === 'Nome não enviado. ') {
          return { message: 'Erro ao enviar o nome!' }
        } else if (res.descricao === 'Variável(s) já está cadastrada' && res.nick === true && res.email === true) {
          return { message: 'Usuário já cadastrado!' }
        } else if (res.descricao === 'Variável(s) já está cadastrada' && res.email === true) {
          return { message: "O email em questão já está em uso." }
        } else if (res.descricao === 'Variável(s) já está cadastrada' && res.nick === true) {
          return { message: "O nickname em questão já está em uso." }
        } else {
          return { redirect: true }
        }
      });
  } catch (e) {
    return { message: "Ocorreu um erro, tente novamente mais tarde.", error: e.toString() };
  }

}

export async function enviarEmail(formData) {
  const body = {
    email: formData.get("emailEsqueciSenha")
  };

  try {
    const response = await fetch(`https://musicalweek-api.azurewebsites.net/endpoints/senha/index.php`, {
      method: "POST",
      body: JSON.stringify(body),
      cache: "no-store"
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Erro na requisição:", response.status, response.statusText);
      return null;
    }
  } catch (error) {
    console.error("Erro na requisição:", error);
    throw error;
  }
}

export async function recebeToken(codigo) {
  const url = `https://musicalweek-api.azurewebsites.net/endpoints/senha?codigo=${codigo}`;
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const res = await fetch(url, {
    method: "GET",
    cache: "no-store",
    headers: headers,
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Erro na requisição:", error);
    });

  return await res.json();
}

export async function enviarNovaSenha(codigo, formData) {
  const url = `https://musicalweek-api.azurewebsites.net/endpoints/senha/index.php`;
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const data = {
    codigo: codigo,
    senha: formData.get("passwordCadastro"),
  };

  const res = await fetch(url, {
    method: "PUT",
    headers: headers,
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Erro na requisição:", error);
    });

  return await res.json();
}

export async function AlterarSenha(formData) {
  const session = await getServerSession(authOption)
  const url = `https://musicalweek-api.azurewebsites.net/endpoints/usuario/index.php`;
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", "Bearer " + session.token);

  const data = {
    senha: formData.get("passwordAtual"),
    nova: formData.get("passwordCadastro"),
  };

  const res = await fetch(url, {
    method: "PUT",
    headers: headers,
    body: JSON.stringify(data)
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Erro na requisição:", error);
    });
  return await res.json();
}