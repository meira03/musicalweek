"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function insereMusica(musicasSelecionadas) {
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
        if (res.id_musica_sala != undefined) {
          return { redirect: `/salas` };
        }
        if (res.id_sala != undefined) {
          return { redirect: `/sala/${res.id_sala}` };
        } if (res.limite != undefined) {
          return { error: "Limite de salas ativas atingido." };
        }
        else{
          return { redirect: '/' };
        }
      });
  }