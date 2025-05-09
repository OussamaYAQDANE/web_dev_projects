import { defineEventHandler, getCookie } from 'h3';

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'access_token');

  const id = event.context.params?.id;

  if (!token || !id) {
    return { error: 'Unauthorized or missing playlist ID' };
  }

  const res = await fetch(`https://api.spotify.com/v1/playlists/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  return data;
});
