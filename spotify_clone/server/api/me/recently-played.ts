import { defineEventHandler, getCookie, createError } from 'h3';

export default defineEventHandler(async (event) => {
  const accessToken = getCookie(event, 'access_token');
  if (!accessToken) {
    throw createError({ statusCode: 401, statusMessage: 'Not authenticated' });
  }

  const url = 'https://api.spotify.com/v1/me/player/recently-played?limit=12';
  const response = await fetch(url, {
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

  const data = await response.json();
  return data.items || [];
}); 