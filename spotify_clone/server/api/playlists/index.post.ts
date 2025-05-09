export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'access_token')
  
  if (!token) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized'
    })
  }

  const body = await readBody(event)
  const { name, description } = body

  // Get user ID from Spotify API
  const userResponse = await $fetch('https://api.spotify.com/v1/me', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })

  const response = await $fetch(`https://api.spotify.com/v1/users/${userResponse.id}/playlists`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name,
      description,
      public: false
    })
  })

  return response
}) 