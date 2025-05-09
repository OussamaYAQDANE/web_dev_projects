<template>
  <div class="podcasts-page">
    <h1>Podcasts</h1>

    <div v-if="loading" class="loading">
      <div class="loader"></div>
      <p>Chargement...</p>
    </div>
    <div v-else-if="error" class="error">
      {{ error }}
    </div>
    <div v-else class="grid">
      <div v-for="show in shows" :key="show.id" class="grid-item" @click="openInSpotify(show)">
        <img :src="show.images?.[0]?.url || '/default-podcast.png'" :alt="show.name" class="cover-image" />
        <div class="item-info">
          <h3>{{ show.name }}</h3>
          <p class="subtitle">{{ show.publisher }}</p>
          <p class="description">{{ truncateDescription(show.description) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const loading = ref(true);
const error = ref(null);
const shows = ref([]);

const truncateDescription = (description) => {
  if (!description) return '';
  return description.length > 100 ? description.slice(0, 97) + '...' : description;
};

const openInSpotify = (show) => {
  if (show?.external_urls?.spotify) {
    window.open(show.external_urls.spotify, '_blank');
  }
};

onMounted(async () => {
  try {
    const response = await $fetch('/api/me/shows');
    shows.value = Array.isArray(response) ? response : [];
  } catch (err) {
    console.error('Failed to fetch podcasts:', err);
    error.value = 'Une erreur est survenue lors du chargement de vos podcasts.';
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.podcasts-page {
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
  margin-bottom: 0.5rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.description {
  color: #b3b3b3;
  font-size: 0.75rem;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
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