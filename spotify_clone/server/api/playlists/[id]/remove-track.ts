import { defineEventHandler, readBody, getCookie, createError } from 'h3';

export default defineEventHandler(async (event) => {
  const accessToken = getCookie(event, 'access_token');
  if (!accessToken) {
    throw createError({ statusCode: 401, statusMessage: 'Not authenticated' });
  }
  const playlistId = event.context.params.id;
  const body = await readBody(event);
  const trackUri = body?.trackUri;
  if (!trackUri || typeof trackUri !== 'string') {
    throw createError({ statusCode: 400, statusMessage: 'Missing trackUri' });
  }
  const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ tracks: [{ uri: trackUri }] }),
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw createError({
      statusCode: response.status,
      statusMessage: error.error?.message || 'Spotify API error',
    });
  }
  return { success: true };
}); 