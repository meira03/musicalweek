"use server"
import { cookies } from 'next/headers'

export async function perfilUsuario() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('token');
    const url = `https://musicalweek-api.azurewebsites.net/endpoints/usuario/`;
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", token.value);
    // headers.append("Authorization", "Bearer " + token);

    const res = await fetch(url, {
      method: "GET",
      cache: "no-store",
      headers: headers,
      credentials: "include",
    })
      .then((response) => {

        return response.json();
      })
      .then((res) => {
        return res;
      })
      .catch((error) => {
        console.error("Erro na requisição:", error);
      })
    return await res
  }
  catch (e) {
    console.log(e)
  }

}

export async function alterarPerfil(data) {
  try {
    const cookieStore = cookies();
    const url = `https://musicalweek-api.azurewebsites.net/endpoints/usuario/index.php`;
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", "Bearer " + cookieStore.get("token").value);

    const res = await fetch(url, {
      method: "PUT",
      headers: headers,
      cache: "no-store",
      body: JSON.stringify(data),
      credentials: "include",
    })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.error("Erro na requisição:", error);
      });
    return await res.json();
  }
  catch (e) {
    console.log(e)
  }
}

export async function deleteAccount(token) {
  try {
    const res = await fetch('https://musicalweek-api.azurewebsites.net/endpoints/usuario/index.php', {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      cache: 'no-store',
    })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.error("Erro na requisição:", error);
      });
    return await res.json();
  } catch (error) {
    console.error('Erro ao deletar a conta', error);
  }
};

export async function updatePlano(token, planoIndex) {
  try {
    const data = { "plano": planoIndex };

    const res = await fetch('https://musicalweek-api.azurewebsites.net/endpoints/usuario/index.php', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }).then((response) => {
      return response;
    })
      .catch((error) => {
        console.error("Erro na requisição:", error);
      });
    return await res.json();
  } catch (error) {
    console.error('Erro ao atualizar o plano', error);
    return false; // Indica erro
  }
};