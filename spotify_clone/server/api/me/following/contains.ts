import { defineEventHandler, getQuery, getCookie, createError } from 'h3';

export default defineEventHandler(async (event) => {
  const accessToken = getCookie(event, 'access_token');
  if (!accessToken) {
    throw createError({ statusCode: 401, statusMessage: 'Not authenticated' });
  }

  const query = getQuery(event);
  const type = query.type;
  const ids = query.ids;

  if (!type || typeof type !== 'string') {
    throw createError({ statusCode: 400, statusMessage: 'Missing type parameter' });
  }
  if (!ids || typeof ids !== 'string') {
    throw createError({ statusCode: 400, statusMessage: 'Missing IDs' });
  }

  const url = `https://api.spotify.com/v1/me/following/contains?type=${encodeURIComponent(type)}&ids=${encodeURIComponent(ids)}`;
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

  return await response.json();
}); 