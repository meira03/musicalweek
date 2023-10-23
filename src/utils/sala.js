"use server";
import { cookies } from "next/headers";

export async function insereMusica(id_musica) {
  const cookieStore = cookies();

  const url =
    "https://musicalweek-api.azurewebsites.net/endpoints/sala/index.php";
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", "Bearer " + cookieStore.get("token").value);

  const data = {
    id_musica: id_musica,
  };

  return await fetch(url, {
    method: "POST",
    headers: headers,
    credentials: "include",
    body: JSON.stringify(data),
    cache: "no-store",
  })
    .then((result) => result.json())
    .then((res) => {
      if (res.id_musica_sala != undefined) {
        return { redirect: `/fila/${res.id_musica_sala}` };
      }
      if (res.id_sala != undefined) {
        return { redirect: `/room/${res.id_sala}` };
      } if (res.limite != undefined) {
        return { error: "Limite de salas ativas atingido." };
      }
      else{
        return { redirect: '/' };
      }
    });
}



export async function insereMusicasArtista(idsMusicas) {
  const cookieStore = cookies();

  const url =
    "https://musicalweek-api.azurewebsites.net/endpoints/sala/index.php";
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", "Bearer " + cookieStore.get("token").value);

  // Cria um array de objetos com cada ID de música
  const data = idsMusicas.map((id) => ({
    id_musica: id,
  }));

  return await fetch(url, {
    method: "POST",
    headers: headers,
    credentials: "include",
    body: JSON.stringify(data),
    cache: "no-store",
  })
    .then((result) => result.json())
    .then((res) => {
      if (res.id_musica_sala != undefined) {
        return { redirect: `/fila/${res.id_musica_sala}` };
      }
      if (res.id_sala != undefined) {
        return { redirect: `/room/${res.id_sala}` };
      }
      if (res.limite != undefined) {
        return { error: "Limite de salas ativas atingido." };
      } else {
        return { redirect: '/' };
      }
    });
}



export async function pesquisaFila(id_musica_sala) {
  const cookieStore = cookies();

  const url =
    `https://musicalweek-api.azurewebsites.net/endpoints/sala/index.php?id_musica_sala=${id_musica_sala}`;
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", "Bearer " + cookieStore.get("token").value);

  return await fetch(url, {
    method: "GET",
    headers: headers,
    credentials: "include",
    cache: "no-store",
  })
    .then((result) => result.json())
    .then((res) => {
      return res
    });
}

export async function sairFila(id_musica_sala) {
  const cookieStore = cookies();
  
  const url =
    `https://musicalweek-api.azurewebsites.net/endpoints/sala/index.php?id_musica_sala=${id_musica_sala}`;
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", "Bearer " + cookieStore.get("token").value);

  return await fetch(url, {
    method: "DELETE",
    headers: headers,
    credentials: "include",
    cache: "no-store",
  })
    .then((result) => result.json())
    .then((res) => {
      return res
    });
}

export async function pesquisaSala(id_sala) {
  const cookieStore = cookies();
  
  const url =
    `https://musicalweek-api.azurewebsites.net/endpoints/sala/index.php?id_sala=${id_sala}`;
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", "Bearer " + cookieStore.get("token").value);

  return await fetch(url, {
    method: "GET",
    headers: headers,
    credentials: "include",
    cache: "no-store",
  })
    .then((result) => {return result})
}

export async function pesquisaSalaArtista(id_sala) {
  const cookieStore = cookies();
  
  const url =
    `https://musicalweek-api.azurewebsites.net/endpoints/sala/artista/index.php?id_sala=${id_sala}`;
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", "Bearer " + cookieStore.get("token").value);

  return await fetch(url, {
    method: "GET",
    headers: headers,
    credentials: "include",
    cache: "no-store",
  })
    .then((result) => {return result})
}

export async function avaliaMusica(nota, id_musica_sala) {
  const cookieStore = cookies();

  const url =
    "https://musicalweek-api.azurewebsites.net/endpoints/avaliacao/index.php";
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", "Bearer " + cookieStore.get("token").value);

  const data = {
    nota: parseInt(nota),
    id_musica_sala: parseInt(id_musica_sala)
  };
  console.log(data)

  return await fetch(url, {
    method: "POST",
    headers: headers,
    credentials: "include",
    body: JSON.stringify(data),
    cache: "no-store",
  })
    .then((result) => result.json())
    .then((res) => {
      return res;
    });
}