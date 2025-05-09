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
    const response = await $fetch('https://api.spotify.com/v1/me/following?type=artist', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    // Check if response has artists and items before mapping
    if (!response?.artists?.items) {
      return []
    }

    return response.artists.items
  } catch (error) {
    console.error('Failed to fetch followed artists:', error)
    throw createError({
      statusCode: error.status || 500,
      message: error.message || 'Failed to fetch followed artists'
    })
  }
}) 