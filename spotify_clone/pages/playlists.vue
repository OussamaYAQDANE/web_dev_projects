<template>
  <div class="playlists-page">
    <div class="playlists-header">
      <h1 class="playlists-title">
        Vos playlists
      </h1>
    </div>
    <div class="playlists-grid">
      <CreatePlaylistCard @open-create-playlist="openCreatePlaylistModal" />
      <PlaylistCard 
        v-for="playlist in playlists" 
        :key="playlist.id"
        :data="playlist"
      />
    </div>
  </div>

  <CreatePlaylistModal
    v-if="showCreatePlaylistModal"
    :is-open="showCreatePlaylistModal"
    @close="closeCreatePlaylistModal"
    @create="createPlaylist"
  />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const playlists = ref<any[]>([])
const showCreatePlaylistModal = ref(false)

const fetchPlaylists = async () => {
  try {
    const response = await fetch('/api/playlists')
    const data = await response.json()
    playlists.value = data.items
  } catch (error) {
    console.error('Error fetching playlists:', error)
  }
}

const openCreatePlaylistModal = () => {
  showCreatePlaylistModal.value = true
}

const closeCreatePlaylistModal = () => {
  showCreatePlaylistModal.value = false
}

const createPlaylist = async (playlistData: { name: string, description: string }) => {
  try {
    const response = await fetch('/api/playlists', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(playlistData)
    })
    
    const newPlaylist = await response.json()
    playlists.value = [newPlaylist, ...playlists.value]
  } catch (error) {
    console.error('Error creating playlist:', error)
  }
}

onMounted(() => {
  fetchPlaylists()
})
</script>

<style scoped>
.playlists-page {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  padding: 0 24px;
}

.playlists-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.playlists-title {
  color: #ffffff;
  font-size: 24px;
  font-weight: 700;
  margin: 0;
}

.playlists-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 24px;
  margin-top: 16px;
}

@media (min-width: 640px) {
  .playlists-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1280px) {
  .playlists-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1536px) {
  .playlists-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
