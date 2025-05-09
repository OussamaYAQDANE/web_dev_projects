import { defineEventHandler, getQuery, getCookie, createError } from 'h3';

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    let q = query.q;
    let type = query.type;
    
    // Log the incoming request
    console.log('Search request:', { q, type });
    
    if (Array.isArray(type)) type = type[0];
    if (!type || typeof type !== 'string') type = 'track,playlist,artist,album,show';
    if (Array.isArray(q)) q = q[0];
    if (!q || typeof q !== 'string') {
      throw createError({ statusCode: 400, statusMessage: 'Missing search query' });
    }

    const accessToken = getCookie(event, 'access_token');
    if (!accessToken) {
      console.error('No access token found in cookies');
      throw createError({ statusCode: 401, statusMessage: 'Not authenticated' });
    }

    const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(q)}&type=${encodeURIComponent(type)}&limit=10`;
    console.log('Making request to Spotify API:', url);
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      console.error('Spotify API error:', error);
      throw createError({
        statusCode: response.status,
        statusMessage: error.error?.message || 'Spotify API error',
      });
    }

    const data = await response.json();
    console.log('Search results:', { 
      tracks: data.tracks?.items?.length || 0,
      playlists: data.playlists?.items?.length || 0,
      artists: data.artists?.items?.length || 0,
      albums: data.albums?.items?.length || 0,
      shows: data.shows?.items?.length || 0
    });
    
    return data;
  } catch (error: any) {
    console.error('Search endpoint error:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message || 'Internal server error'
    });
  }
}); 