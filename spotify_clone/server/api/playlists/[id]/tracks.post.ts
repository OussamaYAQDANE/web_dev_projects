export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'access_token')
  
  if (!token) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized'
    })
  }

  const playlistId = getRouterParam(event, 'id')
  const body = await readBody(event)
  const { uris } = body

  const response = await $fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      uris
    })
  })

  return response
}) 