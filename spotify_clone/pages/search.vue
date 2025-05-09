<template>
  <div class="search-page">
    <div class="search-header">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Que souhaitez-vous écouter ?"
        class="search-input"
        @input="debouncedSearch"
      />
      <div class="search-filters">
        <button 
          v-for="type in searchTypes" 
          :key="type.value"
          :class="['filter-btn', { active: selectedTypes.includes(type.value) }]"
          @click="toggleSearchType(type.value)"
        >
          {{ type.label }}
        </button>
      </div>
    </div>

    <div v-if="loading" class="loading">
      <div class="loader"></div>
      <p>Recherche en cours...</p>
    </div>

    <div v-else-if="error" class="error">
      {{ error }}
    </div>

    <template v-else>
      <div v-if="searchResults.tracks?.length > 0" class="search-results">
        <div class="results-header" @click="toggleSection('tracks')">
          <h2>Tracks</h2>
          <span class="toggle-icon">{{ isSectionOpen('tracks') ? '▼' : '▶' }}</span>
        </div>
        <div v-show="isSectionOpen('tracks')" class="results-content">
          <div v-for="track in searchResults.tracks" :key="track?.id" class="search-result-item">
            <img 
              :src="track?.album?.images?.[2]?.url || '/default-album.svg'" 
              class="track-thumbnail" 
              alt="Album cover"
            />
            <div class="track-info">
              <p class="track-name">{{ track?.name }}</p>
              <p class="track-artist">{{ track?.artists?.map(a => a?.name).filter(Boolean).join(', ') }}</p>
              <p class="track-album">{{ track?.album?.name }}</p>
            </div>
            <div class="track-actions">
              <button class="play-preview-btn" @click="playTrack(track)">
                ▶
              </button>
            </div>
          </div>
        </div>
      </div>

      <div v-if="searchResults.albums?.length > 0" class="search-results">
        <div class="results-header" @click="toggleSection('albums')">
          <h2>Albums</h2>
          <span class="toggle-icon">{{ isSectionOpen('albums') ? '▼' : '▶' }}</span>
        </div>
        <div v-show="isSectionOpen('albums')" class="results-content">
          <div v-for="album in searchResults.albums" :key="album?.id" class="search-result-item">
            <img :src="album?.images?.[0]?.url || '/default-album.svg'" class="track-thumbnail" alt="Album cover" />
            <div class="track-info">
              <p class="track-name">{{ album?.name }}</p>
              <p class="track-artist">{{ album?.artists?.map(a => a?.name).filter(Boolean).join(', ') }}</p>
            </div>
            <div class="track-actions">
              <button 
                @click="followAlbum(album?.id)" 
                :disabled="!album?.id"
                :class="{ 'following': isFollowing('album', album?.id) }"
              >
                {{ isFollowing('album', album?.id) ? 'Suivi' : 'Suivre' }}
              </button>
              <a :href="album?.external_urls?.spotify" target="_blank" rel="noopener noreferrer">Ouvrir</a>
            </div>
          </div>
        </div>
      </div>

      <div v-if="searchResults.playlists?.length > 0" class="search-results">
        <div class="results-header" @click="toggleSection('playlists')">
          <h2>Playlists</h2>
          <span class="toggle-icon">{{ isSectionOpen('playlists') ? '▼' : '▶' }}</span>
        </div>
        <div v-show="isSectionOpen('playlists')" class="results-content">
          <div v-for="playlist in searchResults.playlists" :key="playlist?.id" class="search-result-item">
            <img :src="playlist?.images?.[0]?.url || '/default-album.svg'" class="track-thumbnail" alt="Playlist cover" />
            <div class="track-info">
              <p class="track-name">{{ playlist?.name }}</p>
              <p class="track-artist">{{ playlist?.owner?.display_name }}</p>
            </div>
            <div class="track-actions">
              <button 
                @click="followPlaylist(playlist?.id)" 
                :disabled="!playlist?.id"
                :class="{ 'following': isFollowing('playlist', playlist?.id) }"
              >
                {{ isFollowing('playlist', playlist?.id) ? 'Suivi' : 'Suivre' }}
              </button>
              <a :href="playlist?.external_urls?.spotify" target="_blank" rel="noopener noreferrer">Ouvrir</a>
            </div>
          </div>
        </div>
      </div>

      <div v-if="searchResults.artists?.length > 0" class="search-results">
        <div class="results-header" @click="toggleSection('artists')">
          <h2>Artistes</h2>
          <span class="toggle-icon">{{ isSectionOpen('artists') ? '▼' : '▶' }}</span>
        </div>
        <div v-show="isSectionOpen('artists')" class="results-content">
          <div v-for="artist in searchResults.artists" :key="artist?.id" class="search-result-item">
            <img :src="artist?.images?.[0]?.url || '/default-artist.svg'" class="track-thumbnail" alt="Artist" />
            <div class="track-info">
              <p class="track-name">{{ artist?.name }}</p>
            </div>
            <div class="track-actions">
              <button 
                @click="followArtist(artist?.id)" 
                :disabled="!artist?.id"
                :class="{ 'following': isFollowing('artist', artist?.id) }"
              >
                {{ isFollowing('artist', artist?.id) ? 'Suivi' : 'Suivre' }}
              </button>
              <a :href="artist?.external_urls?.spotify" target="_blank" rel="noopener noreferrer">Ouvrir</a>
            </div>
          </div>
        </div>
      </div>

      <div v-if="searchResults.shows?.length > 0" class="search-results">
        <div class="results-header" @click="toggleSection('shows')">
          <h2>Podcasts</h2>
          <span class="toggle-icon">{{ isSectionOpen('shows') ? '▼' : '▶' }}</span>
        </div>
        <div v-show="isSectionOpen('shows')" class="results-content">
          <div v-for="show in searchResults.shows" :key="show?.id" class="search-result-item">
            <img :src="show?.images?.[0]?.url || '/default-podcast.svg'" class="track-thumbnail" alt="Podcast cover" />
            <div class="track-info">
              <p class="track-name">{{ show?.name }}</p>
              <p class="track-artist">{{ show?.publisher }}</p>
            </div>
            <div class="track-actions">
              <button 
                @click="followShow(show?.id)" 
                :disabled="!show?.id"
                :class="{ 'following': isFollowing('show', show?.id) }"
              >
                {{ isFollowing('show', show?.id) ? 'Suivi' : 'Suivre' }}
              </button>
              <a :href="show?.external_urls?.spotify" target="_blank" rel="noopener noreferrer">Ouvrir</a>
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="searchQuery" class="no-results">
        Aucun résultat trouvé pour "{{ searchQuery }}"
      </div>
    </template>
  </div>
</template>

<script setup>
const searchQuery = ref('');
const searchResults = ref({ 
  tracks: [], 
  albums: [], 
  playlists: [], 
  artists: [], 
  shows: [] 
});
const loading = ref(false);
const error = ref(null);
const selectedTypes = ref(['track', 'album', 'playlist', 'artist', 'show']);
const openSections = ref(['tracks', 'albums', 'playlists', 'artists', 'shows']);
const followingStatus = ref({
  albums: new Set(),
  playlists: new Set(),
  artists: new Set(),
  shows: new Set()
});

const searchTypes = [
  { label: 'Titres', value: 'track' },
  { label: 'Albums', value: 'album' },
  { label: 'Playlists', value: 'playlist' },
  { label: 'Artistes', value: 'artist' },
  { label: 'Podcasts', value: 'show' }
];

let searchTimeout = null;

const toggleSearchType = (type) => {
  const index = selectedTypes.value.indexOf(type);
  if (index === -1) {
    selectedTypes.value.push(type);
  } else {
    selectedTypes.value.splice(index, 1);
  }
  if (searchQuery.value.trim()) {
    handleSearch();
  }
};

const toggleSection = (section) => {
  const index = openSections.value.indexOf(section);
  if (index === -1) {
    openSections.value.push(section);
  } else {
    openSections.value.splice(index, 1);
  }
};

const isSectionOpen = (section) => {
  return openSections.value.includes(section);
};

const isFollowing = (type, id) => {
  return followingStatus.value[type + 's']?.has(id);
};

const handleSearch = async () => {
  if (!searchQuery.value.trim()) {
    searchResults.value = { tracks: [], albums: [], playlists: [], artists: [], shows: [] };
    error.value = null;
    return;
  }
  loading.value = true;
  error.value = null;
  try {
    const response = await $fetch('/api/search', {
      params: { 
        q: searchQuery.value.trim(), 
        type: selectedTypes.value.join(',')
      }
    });
    searchResults.value = {
      tracks: response?.tracks?.items || [],
      albums: response?.albums?.items || [],
      playlists: response?.playlists?.items || [],
      artists: response?.artists?.items || [],
      shows: response?.shows?.items || []
    };
    
    // Check following status for all items
    await checkFollowingStatus();
  } catch (err) {
    console.error('Search error:', err);
    error.value = 'Une erreur est survenue lors de la recherche. Veuillez réessayer.';
    searchResults.value = { tracks: [], albums: [], playlists: [], artists: [], shows: [] };
  } finally {
    loading.value = false;
  }
};

const checkFollowingStatus = async () => {
  try {
    // Check albums
    if (searchResults.value.albums.length > 0) {
      const albumIds = searchResults.value.albums.map(a => a.id).filter(Boolean);
      const response = await $fetch('/api/me/albums/contains', {
        params: { ids: albumIds.join(',') }
      });
      followingStatus.value.albums = new Set(
        albumIds.filter((_, i) => response[i])
      );
    }

    // Check artists
    if (searchResults.value.artists.length > 0) {
      const artistIds = searchResults.value.artists.map(a => a.id).filter(Boolean);
      const response = await $fetch('/api/me/following/contains', {
        params: { 
          type: 'artist',
          ids: artistIds.join(',')
        }
      });
      followingStatus.value.artists = new Set(
        artistIds.filter((_, i) => response[i])
      );
    }

    // Check shows
    if (searchResults.value.shows.length > 0) {
      const showIds = searchResults.value.shows.map(s => s.id).filter(Boolean);
      const response = await $fetch('/api/me/shows/contains', {
        params: { ids: showIds.join(',') }
      });
      followingStatus.value.shows = new Set(
        showIds.filter((_, i) => response[i])
      );
    }
  } catch (err) {
    console.error('Error checking following status:', err);
  }
};

const debouncedSearch = () => {
  if (searchTimeout) clearTimeout(searchTimeout);
  searchTimeout = setTimeout(handleSearch, 300);
};

const playTrack = (track) => {
  if (track?.external_urls?.spotify) {
    window.open(track.external_urls.spotify, '_blank', 'noopener,noreferrer');
  }
};

const followAlbum = async (albumId) => {
  if (!albumId) return;
  try {
    await $fetch('/api/me/albums', { 
      method: 'PUT', 
      body: { ids: [albumId] }
    });
    followingStatus.value.albums.add(albumId);
  } catch (e) {
    console.error('Error following album:', e);
    alert('Erreur lors du suivi de l\'album.');
  }
};

const followPlaylist = async (playlistId) => {
  if (!playlistId) return;
  try {
    await $fetch('/api/follow/playlist', { 
      method: 'POST', 
      body: { playlistId } 
    });
    followingStatus.value.playlists.add(playlistId);
  } catch (e) {
    console.error('Error following playlist:', e);
    alert('Erreur lors du suivi de la playlist.');
  }
};

const followArtist = async (artistId) => {
  if (!artistId) return;
  try {
    await $fetch('/api/follow/artist', { 
      method: 'PUT', 
      body: { 
        type: 'artist',
        ids: [artistId]
      }
    });
    followingStatus.value.artists.add(artistId);
  } catch (e) {
    console.error('Error following artist:', e);
    alert('Erreur lors du suivi de l\'artiste.');
  }
};

const followShow = async (showId) => {
  if (!showId) return;
  try {
    console.log('Following show:', showId);
    const response = await $fetch('/api/follow/show', { 
      method: 'PUT', 
      body: { ids: [showId] },
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log('Follow show response:', response);
    followingStatus.value.shows.add(showId);
  } catch (e) {
    console.error('Error following show:', e);
    alert('Erreur lors du suivi du podcast.');
  }
};

onUnmounted(() => { 
  if (searchTimeout) clearTimeout(searchTimeout); 
});
</script>

<style scoped>
.search-page {
  padding: 2rem;
}

.search-header {
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.search-input {
  width: 100%;
  max-width: 600px;
  padding: 1rem;
  font-size: 1rem;
  border: none;
  border-radius: 500px;
  background-color: #242424;
  color: #ffffff;
  transition: background-color 0.2s ease;
}

.search-input:focus {
  outline: none;
  background-color: #2a2a2a;
}

.search-input::placeholder {
  color: #909090;
}

.search-filters {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 0.5rem 1rem;
  border: 1px solid #b3b3b3;
  border-radius: 500px;
  background: none;
  color: #b3b3b3;
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-btn:hover {
  color: white;
  border-color: white;
}

.filter-btn.active {
  background-color: #1DB954;
  color: white;
  border-color: #1DB954;
}

.search-results {
  margin-bottom: 2rem;
}

.results-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background-color: #181818;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 0.5rem;
}

.results-header:hover {
  background-color: #282828;
}

.toggle-icon {
  color: #b3b3b3;
  font-size: 0.875rem;
}

.results-content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.search-result-item {
  display: flex;
  align-items: center;
  padding: 0.75rem;
  background-color: #181818;
  border-radius: 4px;
  transition: background-color 0.2s ease;
}

.search-result-item:hover {
  background-color: #282828;
}

.track-thumbnail {
  width: 48px;
  height: 48px;
  border-radius: 4px;
  margin-right: 1rem;
  object-fit: cover;
}

.track-info {
  flex: 1;
  min-width: 0;
}

.track-name {
  font-weight: 500;
  margin-bottom: 0.25rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.track-artist {
  font-size: 0.875rem;
  color: #b3b3b3;
  margin-bottom: 0.25rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.track-album {
  font-size: 0.75rem;
  color: #909090;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.track-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-left: 1rem;
}

.track-actions button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 500px;
  background-color: #1DB954;
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;
}

.track-actions button:hover:not(:disabled) {
  background-color: #1ed760;
  transform: scale(1.05);
}

.track-actions button:disabled {
  background-color: #404040;
  cursor: not-allowed;
}

.track-actions button.following {
  background-color: #404040;
}

.track-actions button.following:hover {
  background-color: #505050;
}

.track-actions a {
  padding: 0.5rem 1rem;
  border: 1px solid #b3b3b3;
  border-radius: 500px;
  color: #b3b3b3;
  text-decoration: none;
  transition: all 0.2s ease;
}

.track-actions a:hover {
  color: white;
  border-color: white;
}

.play-preview-btn {
  background: none;
  border: none;
  color: #1DB954;
  cursor: pointer;
  padding: 0.5rem;
  font-size: 1.5rem;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.play-preview-btn:hover {
  opacity: 1;
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
  margin: 1rem 0;
}

.no-results {
  text-align: center;
  color: #b3b3b3;
  padding: 2rem;
  background-color: #181818;
  border-radius: 4px;
}
</style> 