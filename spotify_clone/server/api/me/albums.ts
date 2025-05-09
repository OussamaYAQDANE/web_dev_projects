import { defineEventHandler, getCookie, createError } from 'h3'

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'access_token')
  if (!token) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized'
    })
  }

  try {
    const response = await $fetch('https://api.spotify.com/v1/me/albums', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    // Check if response has items before mapping
    if (!response?.items) {
      return []
    }

    return response.items.map(item => item.album)
  } catch (error) {
    console.error('Failed to fetch saved albums:', error)
    throw createError({
      statusCode: error.status || 500,
      message: error.message || 'Failed to fetch saved albums'
    })
  }
}) 