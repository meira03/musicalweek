"use server"
import { cookies } from 'next/headers'

export async function perfilUsuario() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('token');
    const url = `https://musicalweek-api.azurewebsites.net/endpoints/usuario/`;
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    // headers.append("Authorization", "Bearer " + token);
    headers.append("Authorization", token.value);

    const res = await fetch(url, {
      method: "GET",
      cache: "no-store",
      headers: headers,
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
  console.log(res)
}