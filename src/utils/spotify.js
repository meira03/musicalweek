
export async function auth() {
  var urlencoded = new URLSearchParams();
  urlencoded.append("grant_type", "client_credentials");
  urlencoded.append("client_id", "3147c0493b3c453985f2de48b2b6cd35");
  urlencoded.append("client_secret", "d083ac778f3244569fce0258a64af6e5");

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    cache: "no-store",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: urlencoded,
  });

  if (!res.ok) {
    console.log('Failed to auth Spotify API')
  }

  return res.json()
}

export async function searchData(param) {
  const token = await auth();

  const res = await fetch(
    `https://api.spotify.com/v1/search?q=${param}&type=track&market=BR&limit=24`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token.access_token}`,
      },
    }
  );

  if (!res.ok) {
    console.log(await res.json())
    console.log('Spotify Error')
    return {}
  }

  return res.json()
}

export async function getMusic(id_music) {
  const token = await auth();

  const res = await fetch(
    ` https://api.spotify.com/v1/tracks/${id_music}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token.access_token}`,
      },
    }
  );

  // console.log("retorno do res.ok " + res.ok);
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    console.log(await res.json())
    console.log('Spotify Error')
    return {}
  }

  return res.json()
}

export async function getRecommendations() {
  const token = await auth();

  const res = await fetch(
    ` https://api.spotify.com/v1/playlists/37i9dQZF1DXcBWIGoYBM5M`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token.access_token}`,
      },
    }
  );

  if (!res.ok) {
    console.log(await res.json())
    console.log('Spotify Error')
    return {}
  }

  return res.json()
}