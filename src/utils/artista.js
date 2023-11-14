"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function criaSala(musicasSelecionadas) {
  const cookieStore = cookies();

  const url =
    "https://musicalweek-api.azurewebsites.net/endpoints/sala/artista/index.php";
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", "Bearer " + cookieStore.get("token").value);

  const data = {
    musicas: musicasSelecionadas,
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
      if (res.id_sala != undefined) {
        redirect(`/artista/sala/${res.id_sala}`);
      }
      if (res.descricao != undefined) {
        return res.descricao;
      }

      return "Ocorreu um erro, tente novamente mais tarde.";
    });
}

export async function entraSalaArtista(id_sala) {
  const cookieStore = cookies();

  const url =
    "https://musicalweek-api.azurewebsites.net/endpoints/sala/artista/index.php";
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", "Bearer " + cookieStore.get("token").value);

  const data = {
    id_sala: id_sala,
  };

  return await fetch(url, {
    method: "POST",
    headers: headers,
    credentials: "include",
    body: JSON.stringify(data),
    cache: "no-store",
  })
    .then((result) => {
      console.log(result.status)
      if(result.status != 500){
        return true;
      }
      return false;
    })
}

export async function pesquisaSalaArtista(id_sala) {
  const cookieStore = cookies();

  const url = `https://musicalweek-api.azurewebsites.net/endpoints/sala/artista/index.php?id_sala=${id_sala}`;

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", "Bearer " + cookieStore.get("token").value);

  return fetch(url, {
    method: "GET",
    headers: headers,
    credentials: "include",
    cache: "no-store",
  })
    .then((result) => result.json())
    .then((data) => {
      if (data.sala !== undefined) {
        return data;
      } else {
        console.error("Não foi possível obter as informações da sala");
        return { error: "Não foi possível obter as informações da sala." };
      }
    })
}

export async function pesquisaMusicaArtista(id_sala, ordem) {
  const cookieStore = cookies();
  
  const url =
    `https://musicalweek-api.azurewebsites.net/endpoints/sala/artista/musica/index.php?id_sala=${id_sala}&posicao=${ordem}`;
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", "Bearer " + cookieStore.get("token").value);

  return await fetch(url, {
    method: "GET",
    headers: headers,
    credentials: "include",
    cache: "no-store",
  })
    .then((result) => {
      if(!result.ok || result.status != 200){
        redirect('/salas')
      }
      return result.json();
    }).then((res) => {
      if(res.id_sala === false){
        redirect('/salas')
      }
      return res
    })
}

export async function sairSalaArtista(id_sala_artista) {
  const cookieStore = cookies();
  
  const url =
    `https://musicalweek-api.azurewebsites.net/endpoints/sala/artista/index.php?id_sala=${id_sala_artista}`;
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
