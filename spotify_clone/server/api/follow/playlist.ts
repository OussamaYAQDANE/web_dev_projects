import { defineEventHandler, readBody, getCookie, createError } from 'h3';

export default defineEventHandler(async (event) => {
  const accessToken = getCookie(event, 'access_token');
  if (!accessToken) {
    throw createError({ statusCode: 401, statusMessage: 'Not authenticated' });
  }
  const body = await readBody(event);
  const playlistId = body?.playlistId;
  if (!playlistId || typeof playlistId !== 'string') {
    throw createError({ statusCode: 400, statusMessage: 'Missing playlistId' });
  }
  const url = `https://api.spotify.com/v1/playlists/${playlistId}/followers`;
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
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