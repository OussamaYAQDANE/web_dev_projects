<template>
  <div class="home-container">
    <div v-if="userError" class="error-section">
      <h1 class="error-title">Une erreur est survenue</h1>
      <p class="error-message">{{ userError }}</p>
    </div>
    <div v-else-if="pending" class="loading">
      <div class="loader"></div>
      <p>Chargement...</p>
    </div>
    <div v-else-if="!isAuthenticated" class="welcome-section">
      <h1 class="welcome-title">Welcome to Musicly</h1>
      <p class="welcome-text">Connect with Spotify to start listening</p>
      <NuxtLink to="/login" class="login-button">Login with Spotify</NuxtLink>
    </div>
    <div v-else class="content">
      <h1 class="greeting">{{ getGreeting() }}, {{ user?.display_name }}</h1>

      <section class="top-tracks-section" v-if="topTracks?.items?.length">
        <h2 class="section-title">Vos titres préférés</h2>
        <div class="tracks-grid">
          <div 
            v-for="track in topTracks.items" 
            :key="track.id"
            class="track-card"
            @click="openInSpotify(track)"
          >
            <div class="track-image-container">
              <img
                :src="getOptimalImage(track.album?.images, 300)"
                :alt="track.name"
                class="track-image"
                loading="lazy"
              />
              <button class="play-button" @click.stop="openInSpotify(track)">▶</button>
            </div>
            <h3 class="track-name">{{ track.name }}</h3>
            <p class="track-artist">{{ track.artists?.map(a => a.name).join(', ') }}</p>
          </div>
        </div>
      </section>

      <section class="liked-songs-section" v-if="likedSongs?.length">
        <h2 class="section-title">Titres likés</h2>
        <div class="tracks-grid">
          <div 
            v-for="track in likedSongs" 
            :key="track.id"
            class="track-card"
            @click="openInSpotify(track)"
          >
            <div class="track-image-container">
              <img
                :src="getOptimalImage(track.album?.images, 300)"
                :alt="track.name"
                class="track-image"
                loading="lazy"
              />
              <button class="play-button" @click.stop="openInSpotify(track)">▶</button>
            </div>
            <h3 class="track-name">{{ track.name }}</h3>
            <p class="track-artist">{{ track.artists?.map(a => a.name).join(', ') }}</p>
          </div>
        </div>
      </section>

      <section class="saved-albums-section" v-if="savedAlbums?.items?.length">
        <h2 class="section-title">Vos albums</h2>
        <div class="albums-grid">
          <div 
            v-for="item in savedAlbums.items" 
            :key="item.album.id"
            class="album-card"
          >
            <div class="album-image-container">
              <img
                :src="getOptimalImage(item.album.images, 300)"
                :alt="item.album.name"
                class="album-image"
                loading="lazy"
              />
            </div>
            <h3 class="album-name">{{ item.album.name }}</h3>
            <p class="album-artist">{{ item.album.artists?.map(a => a.name).join(', ') }}</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'default'
});

const { data: user, pending, error: userError } = await useFetch("/api/me");
const { data: topTracks } = await useFetch("/api/me/top/tracks?time_range=short_term&limit=10");
const { data: likedSongs } = await useFetch("/api/me/tracks");
const { data: savedAlbums } = await useFetch("/api/me/albums");

// Get the global audio player state from the parent layout
const layout = useNuxtApp().$parent;
const currentTrack = computed(() => layout?.currentTrack);

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Bonjour';
  if (hour < 18) return 'Bon après-midi';
  return 'Bonsoir';
};

const isAuthenticated = computed(() => {
  return user.value && !user.value.error;
});

const getOptimalImage = (images, targetSize) => {
  if (!images?.length) return '/default-cover.png';
  
  // Sort images by size and find the closest to target size
  const sortedImages = [...images].sort((a, b) => {
    const aSize = Math.abs((a.width || 0) - targetSize);
    const bSize = Math.abs((b.width || 0) - targetSize);
    return aSize - bSize;
  });
  
  return sortedImages[0]?.url || '/default-cover.png';
};

const openInSpotify = (track) => {
  if (track?.external_urls?.spotify) {
    window.open(track.external_urls.spotify, '_blank');
  }
};
</script>

<style scoped>
.home-container {
  padding: 0 2rem;
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

.welcome-section {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 4rem;
}

.welcome-title {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.welcome-text {
  color: #b3b3b3;
  margin-bottom: 2rem;
  font-size: 1.25rem;
}

.login-button {
  background-color: #1DB954;
  color: white;
  text-decoration: none;
  padding: 1rem 2rem;
  border-radius: 500px;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.2s ease;
}

.login-button:hover {
  background-color: #1ed760;
  transform: scale(1.04);
}

.content {
  padding-bottom: 2rem;
}

.greeting {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 2rem;
  color: #ffffff;
}

.section-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: #ffffff;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.section-title::before {
  content: '';
  display: block;
  width: 24px;
  height: 24px;
  background-color: #1DB954;
  border-radius: 4px;
  opacity: 0.8;
}

.playlists-grid,
.tracks-grid,
.albums-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.playlist-card,
.track-card,
.album-card {
  background-color: #181818;
  padding: 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.playlist-card:hover,
.track-card:hover,
.album-card:hover {
  background-color: #282828;
}

.playlist-link {
  text-decoration: none;
  color: inherit;
}

.playlist-image-container,
.track-image-container,
.album-image-container {
  position: relative;
  width: 100%;
  padding-bottom: 100%;
  margin-bottom: 1rem;
  background-color: #282828;
  border-radius: 8px;
  overflow: hidden;
}

.playlist-image,
.track-image,
.album-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1);
  transition: transform 0.3s ease;
  image-rendering: -webkit-optimize-contrast;
  backface-visibility: hidden;
}

.playlist-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
}

.playlist-name,
.track-name,
.album-name {
  font-weight: 600;
  margin-bottom: 0.5rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.playlist-description,
.track-artist,
.album-artist {
  color: #b3b3b3;
  font-size: 0.875rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.track-image-container {
  cursor: pointer;
}

.track-image-container:hover .play-button {
  opacity: 1;
  transform: translateY(0);
}

.play-button {
  position: absolute;
  bottom: 0.5rem;
  right: 0.5rem;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #1DB954;
  border: none;
  color: white;
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.2s ease;
}

.play-button:hover {
  background-color: #1ed760;
  transform: scale(1.1) translateY(0);
}

.playlist-card:hover .playlist-image,
.track-card:hover .track-image,
.album-card:hover .album-image {
  transform: scale(1.05);
}

.error-section {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem;
  text-align: center;
}

.error-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #ff4444;
}

.error-message {
  color: #b3b3b3;
  margin-bottom: 2rem;
  font-size: 1.1rem;
  max-width: 600px;
}

.liked-songs-section,
.saved-albums-section {
  margin-bottom: 3rem;
}
</style>