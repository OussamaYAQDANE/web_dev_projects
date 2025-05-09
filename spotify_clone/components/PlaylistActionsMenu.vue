<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div class="bg-neutral-900 p-6 rounded-lg w-full max-w-md">
      <h2 class="text-2xl font-bold text-white mb-4">Ajouter à une playlist</h2>
      
      <div class="space-y-4">
        <div class="max-h-60 overflow-y-auto">
          <div 
            v-for="playlist in playlists" 
            :key="playlist.id"
            class="flex items-center justify-between p-2 hover:bg-neutral-800 rounded-md cursor-pointer"
            @click="addToPlaylist(playlist.id)"
          >
            <div class="flex items-center space-x-3">
              <div class="w-12 h-12 bg-neutral-700 rounded-md flex items-center justify-center">
                <Icon name="mdi:playlist" class="text-2xl text-white" />
              </div>
              <div>
                <h3 class="text-white font-medium">{{ playlist.name }}</h3>
                <p class="text-sm text-gray-400">{{ playlist.tracks?.total || 0 }} titres</p>
              </div>
            </div>
          </div>
        </div>

        <div class="pt-4 border-t border-neutral-800">
          <button 
            @click="createNewPlaylist"
            class="w-full px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 flex items-center justify-center space-x-2"
          >
            <Icon name="mdi:plus" />
            <span>Créer une nouvelle playlist</span>
          </button>
        </div>

        <div class="flex justify-end mt-6">
          <button 
            @click="closeMenu"
            class="px-4 py-2 text-white bg-neutral-700 rounded-md hover:bg-neutral-600"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  isOpen: boolean
  playlists: any[]
  currentTrack: any
}>()

const emit = defineEmits(['close', 'addToPlaylist', 'createNewPlaylist'])

const closeMenu = () => {
  emit('close')
}

const addToPlaylist = (playlistId: string) => {
  emit('addToPlaylist', {
    playlistId,
    track: props.currentTrack
  })
  closeMenu()
}

const createNewPlaylist = () => {
  emit('createNewPlaylist', props.currentTrack)
  closeMenu()
}
</script> 