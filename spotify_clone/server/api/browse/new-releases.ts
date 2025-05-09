import { defineEventHandler, getCookie } from 'h3';

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'access_token');

  if (!token) {
    return { error: 'Unauthorized' };
  }

  try {
    const res = await fetch('https://api.spotify.com/v1/browse/new-releases', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      let errorText;
      try {
        const errorData = await res.json();
        errorText = errorData.error?.message || await res.text();
      } catch {
        errorText = await res.text();
      }
      
      return {
        error: `Failed to fetch new releases: ${errorText}`,
        status: res.status
      };
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching new releases:', error);
    return {
      error: 'Failed to fetch new releases',
      details: error.message
    };
  }
}); 