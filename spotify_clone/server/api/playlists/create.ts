import { defineEventHandler, getCookie, createError, readBody } from 'h3'

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'access_token')
  if (!token) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized'
    })
  }

  try {
    const { name, description, public: isPublic } = await readBody(event)
    
    // First get the user's ID
    const userResponse = await $fetch('https://api.spotify.com/v1/me', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    // Create the playlist
    const response = await $fetch(`https://api.spotify.com/v1/users/${userResponse.id}/playlists`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        description,
        public: isPublic
      })
    })

    return response
  } catch (error) {
    console.error('Failed to create playlist:', error)
    throw createError({
      statusCode: error.status || 500,
      message: error.message || 'Failed to create playlist'
    })
  }
}) 