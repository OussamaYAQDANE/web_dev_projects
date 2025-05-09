<template>
  <div class="albums-page">
    <h1>Albums</h1>

    <div v-if="loading" class="loading">
      <div class="loader"></div>
      <p>Chargement...</p>
    </div>
    <div v-else-if="error" class="error">
      {{ error }}
    </div>
    <div v-else class="grid">
      <div v-for="album in albums" :key="album.id" class="grid-item">
        <img :src="album.images?.[0]?.url || '/default-cover.png'" :alt="album.name" class="cover-image" @click="openInSpotify(album)" />
        <div class="item-info">
          <h3>{{ album.name }}</h3>
          <p class="subtitle">{{ album.artists?.map(artist => artist.name).join(', ') }}</p>
          <p class="year">{{ new Date(album.release_date).getFullYear() }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const loading = ref(true);
const error = ref(null);
const albums = ref([]);

onMounted(async () => {
  try {
    const response = await $fetch('/api/me/albums');
    albums.value = Array.isArray(response) ? response : [];
  } catch (err) {
    console.error('Failed to fetch albums:', err);
    error.value = 'Une erreur est survenue lors du chargement de vos albums.';
  } finally {
    loading.value = false;
  }
});

const openInSpotify = (album) => {
  if (album?.external_urls?.spotify) {
    window.open(album.external_urls.spotify, '_blank');
  }
};
</script>

<style scoped>
.albums-page {
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
}

.grid-item:hover {
  background: #282828;
}

.cover-image {
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 4px;
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
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 0.25rem;
}

.year {
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