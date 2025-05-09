<template>
  <div 
    class="create-playlist-card"
    @click="openCreatePlaylistModal"
  >
    <div class="create-playlist-content">
      <div class="create-playlist-icon">
        <Icon name="mdi:plus" class="plus-icon" />
      </div>
      <h3 class="create-playlist-title">Créer une playlist</h3>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['openCreatePlaylist'])

const openCreatePlaylistModal = () => {
  emit('openCreatePlaylist')
}
</script>

<style scoped>
.create-playlist-card {
  background: linear-gradient(145deg, #1a1a1a, #2a2a2a);
  border-radius: 12px;
  padding: 24px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.create-playlist-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  background: linear-gradient(145deg, #2a2a2a, #3a3a3a);
}

.create-playlist-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.create-playlist-icon {
  width: 96px;
  height: 96px;
  background: linear-gradient(145deg, #2a2a2a, #3a3a3a);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.plus-icon {
  font-size: 48px;
  color: #1DB954;
  transition: transform 0.3s ease;
}

.create-playlist-card:hover .plus-icon {
  transform: scale(1.1);
}

.create-playlist-title {
  color: #ffffff;
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  margin: 0;
}
</style> 