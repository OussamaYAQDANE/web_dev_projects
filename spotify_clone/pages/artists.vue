<template>
  <div class="artists-page">
    <h1>Artistes</h1>

    <div v-if="loading" class="loading">
      <div class="loader"></div>
      <p>Chargement...</p>
    </div>
    <div v-else-if="error" class="error">
      {{ error }}
    </div>
    <div v-else class="grid">
      <div v-for="artist in artists" :key="artist.id" class="grid-item">
        <img :src="artist.images?.[0]?.url || '/default-artist.png'" :alt="artist.name" class="artist-image" @click="openInSpotify(artist)" />
        <div class="item-info">
          <h3>{{ artist.name }}</h3>
          <p class="subtitle">Artiste</p>
          <p class="followers">{{ formatFollowers(artist.followers?.total) }} followers</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const loading = ref(true);
const error = ref(null);
const artists = ref([]);

const formatFollowers = (count) => {
  if (!count) return '0';
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toString();
};

const openInSpotify = (artist) => {
  if (artist?.external_urls?.spotify) {
    window.open(artist.external_urls.spotify, '_blank');
  }
};

onMounted(async () => {
  try {
    const response = await $fetch('/api/me/following')
    artists.value = Array.isArray(response) ? response : []
  } catch (err) {
    console.error('Failed to fetch artists:', err)
    error.value = 'Une erreur est survenue lors du chargement de vos artistes.'
  } finally {
    loading.value = false
  }
});
</script>

<style scoped>
.artists-page {
  padding: 2rem;
}

h1 {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 2rem;
  color: #ffffff;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
}

.grid-item {
  background: #181818;
  padding: 1rem;
  border-radius: 8px;
  transition: background-color 0.2s ease;
  cursor: pointer;
  text-align: center;
}

.grid-item:hover {
  background: #282828;
}

.artist-image {
  width: 160px;
  height: 160px;
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: 1rem;
}

.item-info h3 {
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
  margin-bottom: 0.25rem;
}

.followers {
  color: #b3b3b3;
  font-size: 0.75rem;
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