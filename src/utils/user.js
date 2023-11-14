"use server";
import { getServerSession } from "next-auth";
import { authOption } from "@/app/api/auth/[...nextauth]/route";

export async function perfilUsuario() {
  try {
    const session = await getServerSession(authOption)
    const token = session.token;
    const url = `https://musicalweek-api.azurewebsites.net/endpoints/usuario/`;
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", "Bearer " + token);
    
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
      });
    return await res;
  } catch (e) {
    console.log(e);
  }
}

export async function salasUsuario() {
  try {
    const session = await getServerSession(authOption)
    const token = session.token;
    const url = `https://musicalweek-api.azurewebsites.net/endpoints/salas/`;
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", "Bearer " + token);

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
    
    return res
  } catch (e) {
    console.log(e);
  }
}

export async function alterarPerfil(data) {
  try {
    const session = await getServerSession(authOption)
    const url = `https://musicalweek-api.azurewebsites.net/endpoints/usuario/index.php`;
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", "Bearer " + session.token);

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
  } catch (e) {
    console.log(e);
  }
}

export async function deleteAccount(token) {
  try {
    const session = await getServerSession(authOption)
    const res = await fetch(
      "https://musicalweek-api.azurewebsites.net/endpoints/usuario/index.php",
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${session.token}`,
        },
        cache: "no-store",
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        return res;
      })
      .catch((error) => {
        console.error("Erro na requisição:", error);
      });

    if (res.sucesso == true) {
      
    }
    return res;
  } catch (error) {
    console.error("Erro ao deletar a conta", error);
  }
}

export async function updatePlano(token, planoIndex) {
  try {
    const data = { plano: planoIndex };

    const res = await fetch(
      "https://musicalweek-api.azurewebsites.net/endpoints/usuario/index.php",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    )
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.error("Erro na requisição:", error);
      });
    return await res.json();
  } catch (error) {
    console.error("Erro ao atualizar o plano", error);
    return false; // Indica erro
  }
}
