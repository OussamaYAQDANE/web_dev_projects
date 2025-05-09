<template>
  <div class="playlist-detail">
    <div class="playlist-header" v-if="playlist">
      <img 
        v-if="playlist.images?.[0]?.url"
        :src="playlist.images[0].url"
        class="playlist-cover"
        alt="Playlist cover"
      />
      <div class="playlist-info">
        <span class="playlist-label">PLAYLIST</span>
        <h1 class="playlist-title">{{ playlist?.name }}</h1>
        <p class="playlist-description">{{ playlist?.description }}</p>
        <div class="playlist-meta">
          <span class="owner">{{ playlist?.owner?.display_name }}</span>
          <span class="dot">•</span>
          <span class="tracks-count">{{ playlist?.tracks?.total }} songs</span>
        </div>
        <div v-if="isOwner">
          <input v-model="newTrackUri" placeholder="Spotify Track URI" class="add-track-input" />
          <button @click="addTrack" class="add-track-btn">Add Track</button>
        </div>
        <div v-else>
          <button @click="followPlaylist" class="follow-btn">Follow</button>
        </div>
      </div>
    </div>

    <div class="tracks-header">
      <div class="track-number">#</div>
      <div class="track-title">Title</div>
      <div class="track-album">Album</div>
      <div class="track-duration">Duration</div>
      <div v-if="isOwner" class="track-actions-header">Actions</div>
    </div>

    <div class="tracks-container">
      <div 
        v-for="(item, i) in playlist?.tracks?.items" 
        :key="item.track.id" 
        class="track-item"
        :class="{ 'playing': currentTrack?.id === item.track.id }"
        @click="playTrack(item.track)"
      >
        <div class="track-number">
          <span class="number">{{ i + 1 }}</span>
          <button class="play-button">
            {{ currentTrack?.id === item.track.id ? '⏸' : '▶' }}
          </button>
        </div>

        <div class="track-info">
          <img 
            :src="item.track.album.images[2]?.url" 
            class="track-image"
            alt="Album cover"
          />
          <div class="track-details">
            <span class="track-name">{{ item.track.name }}</span>
            <span class="track-artist">{{ item.track.artists.map(a => a.name).join(', ') }}</span>
          </div>
        </div>

        <div class="track-album">
          {{ item.track.album.name }}
        </div>

        <div class="track-duration">
          {{ formatDuration(item.track.duration_ms) }}
        </div>
        <div v-if="isOwner" class="track-actions">
          <button @click.stop="removeTrack(item.track.uri)">Remove</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const { data: playlist, refresh } = await useFetch(`/api/playlist/${route.params.id}`);
const { data: user } = await useFetch('/api/me');
const newTrackUri = ref('');
const isOwner = computed(() => user.value && playlist.value && user.value.id === playlist.value.owner.id);

// Get the global audio player state from the parent layout
const layout = useNuxtApp().$parent;
const currentTrack = computed(() => layout?.currentTrack);
const playTrack = (track) => {
  if (track?.external_urls?.spotify) {
    window.open(track.external_urls.spotify, '_blank');
  }
};

const formatDuration = (ms) => {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

const addTrack = async () => {
  if (!newTrackUri.value) return;
  try {
    await $fetch(`/api/playlists/${playlist.value.id}/add-track`, {
      method: 'POST',
      body: { trackUri: newTrackUri.value },
    });
    newTrackUri.value = '';
    await refresh();
    alert('Track added!');
  } catch (e) {
    alert('Failed to add track.');
  }
};

const removeTrack = async (trackUri) => {
  try {
    await $fetch(`/api/playlists/${playlist.value.id}/remove-track`, {
      method: 'POST',
      body: { trackUri },
    });
    await refresh();
    alert('Track removed!');
  } catch (e) {
    alert('Failed to remove track.');
  }
};

const followPlaylist = async () => {
  try {
    await $fetch('/api/follow/playlist', { method: 'POST', body: { playlistId: playlist.value.id } });
    alert('Playlist suivie !');
  } catch (e) {
    alert('Erreur lors du suivi de la playlist.');
  }
};
</script>

<style scoped>
.playlist-detail {
  padding: 0 2rem;
}

.playlist-header {
  display: flex;
  gap: 2rem;
  padding: 2rem 0;
  align-items: flex-end;
}

.playlist-cover {
  width: 232px;
  height: 232px;
  box-shadow: 0 4px 60px rgba(0, 0, 0, .5);
}

.playlist-info {
  flex: 1;
}

.playlist-label {
  font-size: 0.875rem;
  font-weight: 500;
  text-transform: uppercase;
  color: #b3b3b3;
}

.playlist-title {
  font-size: 5rem;
  font-weight: 700;
  margin: 0.5rem 0;
  line-height: 1;
}

.playlist-description {
  color: #b3b3b3;
  margin-bottom: 1rem;
}

.playlist-meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #b3b3b3;
}

.dot {
  font-size: 0.5rem;
}

.tracks-header {
  display: grid;
  grid-template-columns: 50px 1fr 1fr 100px 100px;
  padding: 1rem 0;
  border-bottom: 1px solid #282828;
  color: #b3b3b3;
  font-size: 0.875rem;
  position: sticky;
  top: 64px;
  background-color: #000000;
  z-index: 1;
}

.tracks-container {
  margin-top: 1rem;
}

.track-item {
  display: grid;
  grid-template-columns: 50px 1fr 1fr 100px 100px;
  padding: 0.5rem 0;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.track-item:hover {
  background-color: #282828;
}

.track-item:hover .number {
  display: none;
}

.track-item:hover .play-button {
  display: block;
}

.track-item.playing {
  background-color: #282828;
}

.track-number {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.number {
  color: #b3b3b3;
}

.play-button {
  display: none;
  background: none;
  border: none;
  color: #ffffff;
  cursor: pointer;
  position: absolute;
}

.track-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  min-width: 0;
}

.track-image {
  width: 40px;
  height: 40px;
}

.track-details {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.track-name {
  color: #ffffff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.track-artist {
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
  padding: 0 1rem;
}

.track-duration {
  color: #b3b3b3;
  text-align: right;
  padding-right: 1rem;
}

.track-actions-header {
  color: #b3b3b3;
  text-align: right;
  padding-right: 1rem;
}

.track-actions {
  display: flex;
  justify-content: flex-end;
  padding-right: 1rem;
}

.add-track-input {
  padding: 0.5rem;
  margin-right: 0.5rem;
}

.add-track-btn {
  padding: 0.5rem 1rem;
  background-color: #1db954;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.follow-btn {
  padding: 0.5rem 1rem;
  background-color: #1db954;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>