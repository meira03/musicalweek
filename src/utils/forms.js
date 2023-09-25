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
    if(userAge <= 0){validAge = false;}
    if(userAge < 18){validAge = false;}
    if(userAge > 130){validAge = false;}

    return await fetch(`https://musicalweek-api.azurewebsites.net/endpoints/usuario/index.php`, {
      method: "POST",
      body: JSON.stringify(body),
    })
      .then((result) => result.json())
      .then((res) => {
        console.log(res)
        if (res.descricao === 'Variável(s) fora do formato' ||res.nick !== body.nick ) {
          return { message: 'Alguma das informações inseridas é inválida.' }
        }else if(res.descricao === 'Variável(s) já está cadastrada' && res.nick === true && res.email === true){
          return { message: 'Usuário já cadastrado!' }
        }else if(res.descricao === 'Variável(s) já está cadastrada' && res.email === true){
          return { message: "O email em questão já está em uso." }
        }else if(res.descricao === 'Variável(s) já está cadastrada' && res.nick === true){
          return { message: "O nickname em questão já está em uso." }
        }else{
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

export async function enviarEmail(formData) {
  const data = {
    email: formData.get("emailEsqueciSenha"),
  };

  console.log("Email: " + data.email);

  return await fetch(`https://musicalweek-api.azurewebsites.net/endpoints/senha/index.php`, {
    method: "POST",
    body: JSON.stringify(data),
  })
  .then((response) => {
    return response;
  })
  .catch((error) => {
    console.error("Erro na requisição:", error);
  });

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