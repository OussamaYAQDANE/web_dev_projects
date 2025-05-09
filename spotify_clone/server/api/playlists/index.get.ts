export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'access_token')
  
  if (!token) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized'
    })
  }

  const response = await $fetch('https://api.spotify.com/v1/me/playlists', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })

  return response
}) 