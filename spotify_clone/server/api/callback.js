import { defineEventHandler, getQuery, sendRedirect, deleteCookie } from 'h3';
import { useRuntimeConfig } from '#imports'
import axios from 'axios';

export default defineEventHandler(async (event) => {
  try {
    const config = useRuntimeConfig();

    // Clear any existing authentication cookies first
    deleteCookie(event, 'access_token', { path: '/' });
    deleteCookie(event, 'refresh_token', { path: '/' });
    deleteCookie(event, 'access_token_expires_at', { path: '/' });

    const clientId = config.public.spotifyClientId;
    const clientSecret = config.spotifyClientSecret;
    const redirectUri = config.public.spotifyRedirectUri;
    const params = new URLSearchParams(getQuery(event));
    const code = params.get('code');

    const response = await axios.post('https://accounts.spotify.com/api/token',
      new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirectUri,
        client_id: clientId,
        client_secret: clientSecret
      }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    const { access_token, refresh_token, expires_in } = response.data;

    // Set new cookies
    setCookie(event, 'access_token', access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: expires_in,
      path: '/',
    });

    setCookie(event, 'refresh_token', refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
    });

    const expiresAt = Date.now() + expires_in * 1000;
    setCookie(event, 'access_token_expires_at', expiresAt.toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: expires_in,
      path: '/',
    });

    return sendRedirect(event, '/');
  } catch (error) {
    console.error('Spotify token request failed:', error?.response?.data || error.message);
    return {
      success: false,
      message: 'Failed to exchange code for token.'
    };
  }
});
