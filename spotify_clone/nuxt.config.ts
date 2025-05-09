export default defineNuxtConfig({
  devtools: { enabled: true },
  devServer: {
    host: '0.0.0.0',
    port: 3000
  },
  runtimeConfig: {
    public: {
      spotifyClientId: process.env.NUXT_PUBLIC_SPOTIFY_CLIENT_ID,
      spotifyRedirectUri: process.env.NUXT_PUBLIC_SPOTIFY_REDIRECT_URI
    },
    spotifyClientSecret: process.env.SPOTIFY_CLIENT_SECRET
  }
})
