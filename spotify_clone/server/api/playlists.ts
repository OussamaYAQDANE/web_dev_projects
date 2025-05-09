import { defineEventHandler, getCookie } from 'h3';

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'access_token');

  if (!token) {
    return { error: 'Unauthorized' };
  }

  const res = await fetch('https://api.spotify.com/v1/me/playlists', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  return data;
});
