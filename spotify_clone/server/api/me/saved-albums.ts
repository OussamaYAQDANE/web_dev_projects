import { defineEventHandler, getCookie } from 'h3';

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'access_token');

  if (!token) {
    return { error: 'Unauthorized' };
  }

  try {
    const res = await fetch('https://api.spotify.com/v1/me/albums?limit=50', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const errorData = await res.text();
      let errorMessage;
      try {
        const parsed = JSON.parse(errorData);
        errorMessage = parsed.error?.message || errorData;
      } catch {
        errorMessage = errorData;
      }
      
      return {
        error: `Failed to fetch saved albums: ${errorMessage}`,
        status: res.status
      };
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching saved albums:', error);
    return {
      error: 'Failed to fetch saved albums',
      details: error.message
    };
  }
}); 