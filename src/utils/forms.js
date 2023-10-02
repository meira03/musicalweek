"use server";
import { cookies } from 'next/headers'

export async function login(formData) {
  try {
    const body = {
      email: formData.get("email"),
      senha: formData.get("password"),
    };

    return await fetch(`https://musicalweek-api.azurewebsites.net/endpoints/usuario/`, {
      method: "POST",
      body: JSON.stringify(body),
    })
      .then((result) => result.json())
      .then((res) => {
        console.log(res)
        if (res.login !== false) {
          const cookieStore = cookies();
          cookieStore.set('token', res.token)
          cookieStore.set('nick', res.nick)
          cookieStore.set('plano', res.plano)
          return { redirect: true }
        } else {
          return { message: res.descricao }
        }
      });
  } catch (e) {
    console.log(e.toString());
    return { message: "Ocorreu um erro, tente novamente mais tarde.", error: e.toString() };
  }
}

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
      body: JSON.stringify(body),
    })
      .then((result) => result.json())
      .then((res) => {
        console.log(res)
        if (res.descricao === 'Variável(s) fora do formato' ) {
          return { message: 'Alguma das informações inseridas é inválida.' }
        }else if(res.descricao === 'Variável(s) já está cadastrada' && res.nick === true && res.email === true){
          return { message: 'Já está em uso!' }
        }else if(res.descricao === 'Variável(s) já está cadastrada' && res.email === true){
          return { message: "O email em questão já está em uso." }
        } else if (res.descricao === 'Variável(s) já está cadastrada' && res.nick === true) {
          return { message: "O nickname em questão já está em uso." }
        } else {
          const cookieStore = cookies();
          cookieStore.set('token', res.token)
          cookieStore.set('nick', res.nick)
          cookieStore.set('plano', 0)
          return { redirect: true }
        }
      });
  } catch (e) {
    console.log(e.toString());
    return { message: "Ocorreu um erro, tente novamente mais tarde.", error: e.toString() };
  }

}

export async function loginGoogle(token) {
  try {
    const body = {
      token_google: token
    }
    // console.log("token_google enviado " + body.token_google)

    return fetch(`https://musicalweek-api.azurewebsites.net/endpoints/usuario/index.php`, {
      method: "POST",
      body: JSON.stringify(body),
    })
      .then((result) => result.json())
      .then((res) => {
        const cookieStore = cookies();
        cookieStore.set('token_google', body.token_google)
        return res
      });
  } catch (e) {
    console.log(e.toString());
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
        return res
      });
  } catch (e) {
    console.log(e.toString());
    return { message: "Ocorreu um erro, tente novamente mais tarde.", error: e.toString() };
  }
}

export async function cadastroGoogle(formData) {
  try {
    const cookieStore = cookies();
    const body = {
      nick: formData.get("nickname"),
      data_nasc: formData.get("birthday"),
      token_google: cookieStore.get('token_google').value
    }

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
        console.log(res)
        if (res.descricao === 'Variável(s) fora do formato') {
          return {
            message: 'Alguma das informações inseridas é inválida.'
          }
        } else if (res.descricao === 'Variável(s) já está cadastrada' && res.nick === true && res.email === true) {
          return { message: 'Usuário já cadastrado!' }
        } else if (res.descricao === 'Variável(s) já está cadastrada' && res.email === true) {
          return { message: "O email em questão já está em uso." }
        } else if (res.descricao === 'Variável(s) já está cadastrada' && res.nick === true) {
          return { message: "O nickname em questão já está em uso." }
        } else {
          const cookieStore = cookies();
          cookieStore.set('token', res.token)
          cookieStore.set('nick', res.nick)
          cookieStore.set('plano', 0)
          cookies().delete('token_google')

          return { redirect: true }
        }
      });
  } catch (e) {
    console.log(e.toString());
    return { message: "Ocorreu um erro, tente novamente mais tarde.", error: e.toString() };
  }

}

export async function cadastroSpotify(formData) {
  try {
    const cookieStore = cookies();
    const body = {
      nick: formData.get("nickname"),
      data_nasc: formData.get("birthday"),
      token_google: cookieStore.get('token_google').value
    }

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
        console.log(res)
        if (res.descricao === 'Variável(s) fora do formato') {
          return {
            message: 'Alguma das informações inseridas é inválida.'
          }
        } else if (res.descricao === 'Variável(s) já está cadastrada' && res.nick === true && res.email === true) {
          return { message: 'Usuário já cadastrado!' }
        } else if (res.descricao === 'Variável(s) já está cadastrada' && res.email === true) {
          return { message: "O email em questão já está em uso." }
        } else if (res.descricao === 'Variável(s) já está cadastrada' && res.nick === true) {
          return { message: "O nickname em questão já está em uso." }
        } else {
          const cookieStore = cookies();
          cookieStore.set('token', res.token)
          cookieStore.set('nick', res.nick)
          cookieStore.set('plano', 0)
          cookies().delete('token_google')

          return { redirect: true }
        }
      });
  } catch (e) {
    console.log(e.toString());
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
      return data; // Retorne os dados da API
    } else {
      console.error("Erro na requisição:", response.status, response.statusText);
      return null; // Ou lança um erro, dependendo do seu tratamento de erro
    }
  } catch (error) {
    console.error("Erro na requisição:", error);
    throw error; // Relança o erro para tratamento posterior
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


export async function enviarNovaSenha(codigo, novaSenha) {
  const url = `https://musicalweek-api.azurewebsites.net/endpoints/senha?codigo=${codigo}`;
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const data = {
    novaSenha: novaSenha,
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