<template>
  <div class="flex flex-col gap-y-2 w-full px-6">
    <div class="flex items-center justify-between">
      <h1 class="text-white text-2xl font-semibold">
        Résultats de recherche
      </h1>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4">
      <div 
        v-for="track in tracks" 
        :key="track.id"
        class="flex items-center gap-x-4 cursor-pointer hover:bg-neutral-800/50 p-2 rounded-md group"
      >
        <div class="relative min-h-[64px] min-w-[64px]">
          <img 
            :src="track.album.images[0]?.url" 
            class="object-cover"
            :alt="track.name"
          />
          <div 
            @click="play(track)"
            class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition flex items-center justify-center"
          >
            <Icon 
              name="mdi:play" 
              size="30"
              class="text-white opacity-0 group-hover:opacity-100 transition"
            />
          </div>
        </div>
        <div class="flex flex-col gap-y-1 overflow-hidden">
          <p class="text-white truncate">{{ track.name }}</p>
          <p class="text-neutral-400 text-sm truncate">
            {{ track.artists.map((artist: any) => artist.name).join(', ') }}
          </p>
        </div>
        <div class="ml-auto flex items-center gap-x-2">
          <button 
            @click.stop="toggleLike(track)"
            class="text-neutral-400 hover:text-white transition"
          >
            <Icon 
              :name="isLiked(track.id) ? 'mdi:heart' : 'mdi:heart-outline'" 
              size="25"
              :class="isLiked(track.id) ? 'text-green-500' : ''"
            />
          </button>
          <button 
            @click.stop="openPlaylistMenu(track)"
            class="text-neutral-400 hover:text-white transition"
          >
            <Icon name="mdi:playlist-plus" size="25" />
          </button>
        </div>
      </div>
    </div>
  </div>

  <PlaylistActionsMenu
    v-if="showPlaylistMenu"
    :is-open="showPlaylistMenu"
    :playlists="userPlaylists"
    :current-track="selectedTrack"
    @close="closePlaylistMenu"
    @add-to-playlist="addToPlaylist"
    @create-new-playlist="createNewPlaylist"
  />

  <CreatePlaylistModal
    v-if="showCreatePlaylistModal"
    :is-open="showCreatePlaylistModal"
    @close="closeCreatePlaylistModal"
    @create="createPlaylist"
  />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useUserStore } from '~/stores/user'
import { usePlayerStore } from '~/stores/player'

const userStore = useUserStore()
const playerStore = usePlayerStore()

const props = defineProps<{
  tracks: any[]
}>()

const showPlaylistMenu = ref(false)
const showCreatePlaylistModal = ref(false)
const selectedTrack = ref<any>(null)
const userPlaylists = ref<any[]>([])

const isLiked = (trackId: string) => {
  return userStore.likedSongs.includes(trackId)
}

const toggleLike = async (track: any) => {
  if (isLiked(track.id)) {
    await userStore.removeLikedSong(track.id)
  } else {
    await userStore.addLikedSong(track.id)
  }
}

const play = (track: any) => {
  playerStore.setId(track.id)
  playerStore.setIds(props.tracks.map(track => track.id))
  playerStore.setActive(track)
}

const openPlaylistMenu = async (track: any) => {
  selectedTrack.value = track

  const response = await fetch('/api/playlists')
  const data = await response.json()
  userPlaylists.value = data.items
  showPlaylistMenu.value = true
}

const closePlaylistMenu = () => {
  showPlaylistMenu.value = false
  selectedTrack.value = null
}

const addToPlaylist = async ({ playlistId, track }: { playlistId: string, track: any }) => {
  try {
    await fetch(`/api/playlists/${playlistId}/tracks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uris: [`spotify:track:${track.id}`]
      })
    })
  } catch (error) {
    console.error('Error adding track to playlist:', error)
  }
}

const createNewPlaylist = (track: any) => {
  selectedTrack.value = track
  showCreatePlaylistModal.value = true
}

const closeCreatePlaylistModal = () => {
  showCreatePlaylistModal.value = false
  selectedTrack.value = null
}

const createPlaylist = async (playlistData: { name: string, description: string }) => {
  try {
    const response = await fetch('/api/playlists', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(playlistData)
    })
    
    const newPlaylist = await response.json()
    
    if (selectedTrack.value) {
      await addToPlaylist({
        playlistId: newPlaylist.id,
        track: selectedTrack.value
      })
    }
  } catch (error) {
    console.error('Error creating playlist:', error)
  }
}
</script> 