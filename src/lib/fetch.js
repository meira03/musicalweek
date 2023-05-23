
async function authorization() {
  var urlencoded = new URLSearchParams();
  urlencoded.append("grant_type", "client_credentials");
  urlencoded.append("client_id", "1ecfac062a16479ba97b244a4173ef33");
  urlencoded.append("client_secret", "d477a84ddb37416c8663e50016f39ca3");

  const res = await fetch("https://accounts.spotify.com/api/token", {
    cache: 'no-cache',
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: urlencoded,
  })

  return await res.json()
}

export async function getSearchMusic(search) {
  const auth = await authorization();
  
  const res = await fetch(
    `https://api.spotify.com/v1/search?q=${search}&type=track&market=BR&limit=24`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${auth.access_token}`,
      },
    }
  );

  return await res.json();
}

export async function getTrack(id) {
  const auth = await authorization();
  
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

export async function getArtist(id) {
  const auth = await authorization();
  
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

export async function createRoom(music, gender, user = 2) {
  const room = {
    id_musica: music,
    id_genero: gender,
    id_usuario: user
  };

  const res = await fetch(
    `https://musicalweek-api.azurewebsites.net/createRoom.php`,
    {
      method: "POST",
      mode : "no-cors",
      headers: {
        "Content-Type" : "application/json",
      },
      body: JSON.stringify(room)
    }
  );

  return await res.json();
}