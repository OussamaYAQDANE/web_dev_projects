import { defineEventHandler, getCookie, createError, readBody } from 'h3'

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'access_token')
  if (!token) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized'
    })
  }

  const playlistId = event.context.params?.id
  if (!playlistId) {
    throw createError({
      statusCode: 400,
      message: 'Playlist ID is required'
    })
  }

  try {
    const { uris, action } = await readBody(event)
    
    const response = await $fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
      method: action === 'add' ? 'POST' : 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        uris
      })
    })

    return response
  } catch (error) {
    console.error('Failed to modify playlist tracks:', error)
    throw createError({
      statusCode: error.status || 500,
      message: error.message || 'Failed to modify playlist tracks'
    })
  }
}) 