import { defineEventHandler, deleteCookie } from 'h3';

export default defineEventHandler((event) => {
  deleteCookie(event, 'access_token', { path: '/' });
  deleteCookie(event, 'refresh_token', { path: '/' });
  deleteCookie(event, 'spotify_auth_state', { path: '/' });
  deleteCookie(event, 'access_token_expires_at', { path: '/' });

  return {
    success: true
  };
});