import { defineEventHandler, readBody, getCookie, createError } from 'h3';

export default defineEventHandler(async (event) => {
  const accessToken = getCookie(event, 'access_token');
  if (!accessToken) {
    throw createError({ statusCode: 401, statusMessage: 'Not authenticated' });
  }

  try {
    const body = await readBody(event);
    console.log('Follow show request body:', body);

    if (!body || !body.ids || !Array.isArray(body.ids) || body.ids.length === 0) {
      console.error('Invalid request body:', body);
      throw createError({ 
        statusCode: 400, 
        statusMessage: 'Request body must contain a non-empty ids array' 
      });
    }

    const url = `https://api.spotify.com/v1/me/shows`;
    const requestBody = { ids: body.ids };
    console.log('Making request to Spotify API:', url, 'with body:', requestBody);

    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      console.error('Spotify API error:', error);
      throw createError({
        statusCode: response.status,
        statusMessage: error.error?.message || 'Spotify API error',
      });
    }

    return { success: true };
  } catch (error) {
    console.error('Error in follow show endpoint:', error);
    throw error;
  }
}); 