"use server";
import { getServerSession } from "next-auth";
import { authOption } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export async function insereMusica(id_musica) {
  const session = await getServerSession(authOption)

  const url =
    "https://musicalweek-api.azurewebsites.net/endpoints/sala/index.php";
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", "Bearer " + session.token);

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
      console.log(res)
      if (res.id_musica_sala != undefined) {
        return { redirect: `/salas/fila` };
      }
      if (res.id_sala != undefined) {
        return {
          redirect: `/sala/${res.id_sala}/1`
        };
      } if (res.limite != undefined) {
        return { error: "Limite de salas ativas atingido." };
      }
      else {
        return { redirect: '/' };
      }
    });
}

export async function insereMusicasArtista(idsMusicas) {
  const session = await getServerSession(authOption)

  const url =
    "https://musicalweek-api.azurewebsites.net/endpoints/sala/index.php";
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", "Bearer " + session.token);

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
        return { redirect: `/sala/${res.id_sala}` };
      }
      if (res.limite != undefined) {
        return { error: "Limite de salas ativas atingido." };
      } else {
        return { redirect: '/' };
      }
    });
}

export async function pesquisaFila(id_musica_sala) {
  const session = await getServerSession(authOption)

  const url =
    `https://musicalweek-api.azurewebsites.net/endpoints/sala/index.php?id_musica_sala=${id_musica_sala}`;
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", "Bearer " + session.token);

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
  const session = await getServerSession(authOption)

  const url =
    `https://musicalweek-api.azurewebsites.net/endpoints/sala/index.php?id_musica_sala=${id_musica_sala}`;
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", "Bearer " + session.token);

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
  const session = await getServerSession(authOption)

  const url =
    `https://musicalweek-api.azurewebsites.net/endpoints/sala/index.php?id_sala=${id_sala}`;
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", "Bearer " + session.token);

  return await fetch(url, {
    method: "GET",
    headers: headers,
    credentials: "include",
    cache: "no-store",
  })
    .then((result) => {
      if (!result.ok || result.status != 200) {
        redirect('/salas')
      }
      return result.json();
    }).then((res) => {
      if (res.id_sala === false) {
        redirect('/salas')
      }
      return res
    })
}

export async function pesquisaSalaFinal(id_sala) {
  const session = await getServerSession(authOption)

  const url =
    `https://musicalweek-api.azurewebsites.net/endpoints/sala/final/index.php?id_sala=${id_sala}`;
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", "Bearer " + session.token);

  return await fetch(url, {
    method: "GET",
    headers: headers,
    credentials: "include",
    cache: "no-store",
  })
    .then((result) => {
      if (!result.ok || result.status != 200) {
        redirect('/salas')
      }
      return result.json();
    }).then((res) => {
      if (res.id_sala === false) {
        redirect('/salas')
      }
      return res
    })
}

export async function pesquisaMusica(id_sala, ordem) {
  const session = await getServerSession(authOption)

  const url =
    `https://musicalweek-api.azurewebsites.net/endpoints/sala/musica/index.php?id_sala=${id_sala}&posicao=${ordem}`;
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", "Bearer " + session.token);

  return await fetch(url, {
    method: "GET",
    headers: headers,
    credentials: "include",
    cache: "no-store",
  })
    .then((result) => {
      if (!result.ok || result.status != 200) {
        redirect('/salas')
      }
      return result.json();
    }).then((res) => {
      if (res.id_sala === false) {
        redirect('/salas')
      }
      return res
    })
}

export async function pesquisaParticipantes(id_sala) {
  const session = await getServerSession(authOption)

  const url =
    `https://musicalweek-api.azurewebsites.net/endpoints/sala/participantes/index.php?id_sala=${id_sala}`;
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", "Bearer " + session.token);

  return await fetch(url, {
    method: "GET",
    headers: headers,
    credentials: "include",
    cache: "no-store",
  })
    .then((result) => {
      if (!result.ok || result.status != 200) {
        redirect('/salas')
      }
      return result.json();
    }).then((res) => {
      if (res.id_sala === false) {
        redirect('/salas')
      }
      return res
    })
}

export async function pesquisaSalaArtista(id_sala) {
  const session = await getServerSession(authOption)

  const url =
    `https://musicalweek-api.azurewebsites.net/endpoints/sala/artista/index.php?id_sala=${id_sala}`;
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", "Bearer " + session.token);

  return await fetch(url, {
    method: "GET",
    headers: headers,
    credentials: "include",
    cache: "no-store",
  })
    .then((result) => { return result })
}

export async function avaliaMusica(nota, id_musica_sala) {
  const session = await getServerSession(authOption)

  const url =
    "https://musicalweek-api.azurewebsites.net/endpoints/avaliacao/index.php";
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", "Bearer " + session.token);

  const data = {
    nota: parseInt(nota),
    id_musica_sala: parseInt(id_musica_sala)
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
      return res;
    });
}
