import { defineEventHandler } from 'h3';
import { generateRandomString } from '~/utils/auth';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const state = generateRandomString(16);
  const scope = 'user-read-private user-read-email user-library-read user-library-modify playlist-read-private user-top-read user-follow-read user-follow-modify playlist-modify-public playlist-modify-private user-read-recently-played';

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: config.public.spotifyClientId,
    scope: scope,
    redirect_uri: config.public.spotifyRedirectUri,
    state: state
  });

  setCookie(event, 'spotify_auth_state', state);

  return {
    url: `https://accounts.spotify.com/authorize?${params.toString()}`
  };
}); 