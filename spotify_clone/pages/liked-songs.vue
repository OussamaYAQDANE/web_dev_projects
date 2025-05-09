<template>
  <div class="liked-songs-page">
    <h1>Titres likés</h1>

    <div v-if="loading" class="loading">
      <div class="loader"></div>
      <p>Chargement...</p>
    </div>
    <div v-else-if="error" class="error">
      {{ error }}
    </div>
    <div v-else class="tracks-list">
      <div v-for="track in likedTracks" :key="track.id" class="track-item" @click="openInSpotify(track)">
        <img :src="track.album?.images?.[0]?.url || '/default-cover.png'" :alt="track.name" class="track-image" />
        <div class="track-info">
          <h3>{{ track.name }}</h3>
          <p class="subtitle">{{ track.artists?.map(artist => artist.name).join(', ') }}</p>
        </div>
        <div class="track-album">{{ track.album?.name }}</div>
        <div class="track-duration">{{ formatDuration(track.duration_ms) }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
const loading = ref(true);
const error = ref(null);
const likedTracks = ref([]);

const formatDuration = (ms) => {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

const openInSpotify = (track) => {
  if (track?.external_urls?.spotify) {
    window.open(track.external_urls.spotify, '_blank');
  }
};

onMounted(async () => {
  try {
    const response = await $fetch('/api/me/tracks');
    likedTracks.value = Array.isArray(response) ? response : [];
  } catch (err) {
    console.error('Failed to fetch liked tracks:', err);
    error.value = 'Une erreur est survenue lors du chargement de vos titres likés.';
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.liked-songs-page {
  padding: 2rem;
}

h1 {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 2rem;
  color: #ffffff;
}

.tracks-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.track-item {
  display: grid;
  grid-template-columns: auto 1fr auto auto;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem;
  border-radius: 4px;
  transition: background-color 0.2s ease;
}

.track-item:hover {
  background-color: #282828;
}

.track-image {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 4px;
}

.track-info {
  min-width: 0;
}

.track-info h3 {
  font-weight: 600;
  margin-bottom: 0.25rem;
  color: #ffffff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.subtitle {
  color: #b3b3b3;
  font-size: 0.875rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.track-album {
  color: #b3b3b3;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.track-duration {
  color: #b3b3b3;
  font-size: 0.875rem;
  white-space: nowrap;
}

.loading {
  text-align: center;
  color: #b3b3b3;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.loader {
  width: 40px;
  height: 40px;
  border: 3px solid #242424;
  border-top-color: #1DB954;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.error {
  text-align: center;
  color: #ff4444;
  padding: 2rem;
  background-color: rgba(255, 68, 68, 0.1);
  border-radius: 4px;
}
</style> 