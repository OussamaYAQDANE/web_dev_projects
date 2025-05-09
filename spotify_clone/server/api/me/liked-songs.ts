import { defineEventHandler, getCookie, createError } from 'h3';

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'access_token');

  if (!token) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized'
    });
  }

  try {
    const response = await $fetch('https://api.spotify.com/v1/me/tracks', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    return response.items.map(item => item.track);
  } catch (error) {
    console.error('Failed to fetch liked tracks:', error);
    throw createError({
      statusCode: error.status || 500,
      message: error.message || 'Failed to fetch liked tracks'
    });
  }
}); 