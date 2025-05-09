<template>
  <div class="library-page">
    <h1>Votre Bibliothèque</h1>

    <div class="library-nav">
      <NuxtLink to="/playlists" class="nav-item">
        <span class="icon">📑</span>
        <span>Playlists</span>
      </NuxtLink>
      <NuxtLink to="/liked-songs" class="nav-item">
        <span class="icon">❤️</span>
        <span>Titres likés</span>
      </NuxtLink>
      <NuxtLink to="/albums" class="nav-item">
        <span class="icon">💿</span>
        <span>Albums</span>
      </NuxtLink>
      <NuxtLink to="/artists" class="nav-item">
        <span class="icon">🎤</span>
        <span>Artistes</span>
      </NuxtLink>
      <NuxtLink to="/podcasts" class="nav-item">
        <span class="icon">🎧</span>
        <span>Podcasts</span>
      </NuxtLink>
    </div>

    <div class="recent-section">
      <h2>Écoutés récemment</h2>
      <div v-if="loading" class="loading">
        <div class="loader"></div>
        <p>Chargement...</p>
      </div>
      <div v-else-if="error" class="error">
        {{ error }}
      </div>
      <div v-else class="grid">
        <div v-for="item in recentTracks" :key="item.played_at + item.track.id" class="grid-item" @click="openInSpotify(item.track)">
          <img :src="item.track.album.images?.[0]?.url || '/default-cover.png'" :alt="item.track.name" class="cover-image" />
          <div class="item-info">
            <h3>{{ item.track.name }}</h3>
            <p class="subtitle">{{ item.track.artists?.map(a => a.name).join(', ') }}</p>
            <p class="subtitle">{{ item.track.album.name }}</p>
            <p class="subtitle">Écouté le {{ new Date(item.played_at).toLocaleString() }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const loading = ref(true);
const error = ref(null);
const recentTracks = ref([]);

onMounted(async () => {
  loading.value = true;
  try {
    const response = await $fetch('/api/me/recently-played');
    recentTracks.value = Array.isArray(response) ? response : [];
  } catch (err) {
    console.error('Failed to fetch recently played tracks:', err);
    error.value = 'Une erreur est survenue lors du chargement de vos titres récemment écoutés.';
  } finally {
    loading.value = false;
  }
});

const openInSpotify = (track) => {
  if (track?.external_urls?.spotify) {
    window.open(track.external_urls.spotify, '_blank');
  }
};
</script>

<style scoped>
.library-page {
  padding: 2rem;
}

h1 {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 2rem;
  color: #ffffff;
}

h2 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #ffffff;
}

.library-nav {
  display: flex;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background-color: #282828;
  border-radius: 500px;
  color: #ffffff;
  text-decoration: none;
  transition: background-color 0.2s ease;
}

.nav-item:hover {
  background-color: #383838;
}

.nav-item.router-link-active {
  background-color: #1DB954;
}

.icon {
  font-size: 1.25rem;
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