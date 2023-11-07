"use server";
import { cookies } from "next/headers";

export async function perfilUsuario() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token");
    const url = `https://musicalweek-api.azurewebsites.net/endpoints/usuario/`;
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", token.value);
    
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
    const cookieStore = cookies();
    const token = cookieStore.get("token");
    const url = `https://musicalweek-api.azurewebsites.net/endpoints/salas/`;
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", token.value);

    // const res = await fetch(url, {
    //   method: "GET",
    //   cache: "no-store",
    //   headers: headers,
    //   credentials: "include",
    // })
    // .then((response) => {
    //   return response.json();
    // })
    // .then((res) => {
    //   return res;
    // })
    // .catch((error) => {
    //   console.error("Erro na requisição:", error);
    // })

    const resJson = `
    {
      "filas" : [
          {
              "id_musica" : "7nD9nN3jord9wWcfW3Gkcm",
              "id_musica_sala" : 1,
              "inicio_fila" : "2023-11-03 23:01:59"
          }
      ],
      "salas" : [
          {
              "id_sala" : 36,
              "id_musica" : "7nD9nN3jord9wWcfW3Gkcm",
              "ordem" : 5,
              "tempo_restante" : "2023-11-04 07:13:24",
              "pontuacao" : 100
          },
          {
              "id_sala" : 36,
              "id_musica" : "7nD9nN3jord9wWcfW3Gkcm",
              "ordem" : 5,
              "tempo_restante" : "2023-11-04 07:13:24"
          }
      ],
      "historico" : [
          {
              "id_sala" : 36,
              "id_musica" : "7nD9nN3jord9wWcfW3Gkcm",
              "data_inicio" : "2023-11-03 07:13:24"
          }
      ],
      "salas_artista" : [
          {
            "id_sala_artista" : 28,
            "artista" : {
                "icon" : "icone1.png",
                "nick" : "carv.wan"
            },
            "id_musica" : "7nD9nN3jord9wWcfW3Gkcm"
          }
      ],
      "recomendacoes" : [
          {
            "id_sala_artista" : 28,
            "artista" : {
                "icon" : "icone1.png",
                "nick" : "carv.wan"
            },
            "id_musica" : "7nD9nN3jord9wWcfW3Gkcm"
          }
      ]
    }
    `;
    return resJson;
  } catch (e) {
    console.log(e);
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
  } catch (e) {
    console.log(e);
  }
}

export async function deleteAccount(token) {
  try {
    const res = await fetch(
      "https://musicalweek-api.azurewebsites.net/endpoints/usuario/index.php",
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
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
      cookies().delete("token");
      cookies().delete("plano");
      cookies().delete("nick");
      cookies().delete("token_google");
      cookies().delete("token_spotify");
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
