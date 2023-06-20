async function autorizacao() {
  var urlencoded = new URLSearchParams();
  urlencoded.append("grant_type", "client_credentials");
  urlencoded.append("client_id", "3147c0493b3c453985f2de48b2b6cd35");
  urlencoded.append("client_secret", "d083ac778f3244569fce0258a64af6e5");

  const res = await fetch("https://accounts.spotify.com/api/token", {
    cache: "no-cache",
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: urlencoded,
  });

  return await res.json();
}

export async function pesquisaMusica(pesquisa) {
  const auth = await autorizacao();

  const res = await fetch(
    `https://api.spotify.com/v1/search?q=${pesquisa}&type=track&market=BR&limit=24`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${auth.access_token}`,
      },
    }
  );

  return await res.json();
}

export async function procuraMusica(id) {
  const auth = await autorizacao();

  const res = await fetch(
    `
    https://api.spotify.com/v1/tracks/${id}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${auth.access_token}`,
      },
    }
  );

  return await res.json();
}

export async function procuraArtista(id) {
  const auth = await autorizacao();

  const res = await fetch(
    `
    https://api.spotify.com/v1/artists/${id}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${auth.access_token}`,
      },
    }
  );

  return await res.json();
}

export async function criaSala(musica, usuario) {
  const url = "https://musicalweek-api.azurewebsites.net/endpoints/insert_fila.php";
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const data = {
    id_usuario: usuario,
    id_musica: musica,
  };

  const res = await fetch(url, {
    method: "POST",
    headers: headers,
    credentials: "include",
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

export async function procuraMusicaSala(id) {
  const url = `https://musicalweek-api.azurewebsites.net/endpoints/procura_sala.php?id_musica_sala=${id}`;
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

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

export async function procuraSala(id) {
  const url = `http://localhost/musicalweek-api/searchRoom.php?id_sala=${id}`;
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

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

export async function procuraSalas(id_usuario) {
  const url = `https://musicalweek-api.azurewebsites.net/endpoints/salas.php`;
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const data = {
    id_usuario: id_usuario,
  };

  const res = await fetch(url, {
    method: "POST",
    headers: headers,
    credentials: "include",
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

export async function geraAvaliacao(nota, id_musica_sala, id_usuario) {
  const url = "https://musicalweek-api.azurewebsites.net/endpoints/avalia_musica.php";
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const data = {
    nota: nota,
    id_musica_sala: id_musica_sala,
    id_usuario: id_usuario,
  };

  const res = await fetch(url, {
    method: "POST",
    cache: "no-store",
    headers: headers,
    credentials: "include",
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

export async function cadastraUsuario(usuario) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify(usuario);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
  };

  const res = await fetch("https://musicalweek-api.azurewebsites.net/endpoints/cadastro.php", requestOptions)
    .then((response) => {
      return response;
    })
    .catch((error) => console.log("error", error));

  return await res.json();
}

export async function loginUsuario(usuario) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify(usuario);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
  };

  const res = await fetch("https://musicalweek-api.azurewebsites.net/endpoints/login.php", requestOptions)
    .then((response) => {
      return response;
    })
    .catch((error) => console.log("error", error));

  return await res.json();
}