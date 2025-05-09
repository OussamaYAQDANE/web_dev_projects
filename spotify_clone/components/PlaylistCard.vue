<template>
  <div class="playlist-card">
    <div class="playlist-content">
      <div class="playlist-image-container">
        <img 
          :src="image || '/images/liked.png'" 
          :alt="title"
          class="playlist-image"
        />
        <div class="play-button-container">
          <button 
            @click="play"
            class="play-button"
          >
            <Icon name="mdi:play" class="play-icon" />
          </button>
        </div>
      </div>
      <div class="playlist-info">
        <h3 class="playlist-title">{{ title }}</h3>
        <p class="playlist-description">
          {{ description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

interface Props {
  data: any
}

const props = defineProps<Props>()
const router = useRouter()

const image = computed(() => props.data?.images?.[0]?.url)
const title = computed(() => props.data?.name)
const description = computed(() => props.data?.description || `Par ${props.data?.owner?.display_name}`)

const play = () => {
  router.push(`/playlist/${props.data.id}`)
}
</script>

<style scoped>
.playlist-card {
  background: linear-gradient(145deg, #1a1a1a, #2a2a2a);
  border-radius: 12px;
  padding: 16px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.playlist-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  background: linear-gradient(145deg, #2a2a2a, #3a3a3a);
}

.playlist-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.playlist-image-container {
  position: relative;
  aspect-ratio: 1;
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.playlist-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.playlist-card:hover .playlist-image {
  transform: scale(1.05);
}

.play-button-container {
  position: absolute;
  bottom: 8px;
  right: 8px;
  opacity: 0;
  transform: translateY(8px);
  transition: all 0.3s ease;
}

.playlist-card:hover .play-button-container {
  opacity: 1;
  transform: translateY(0);
}

.play-button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #1DB954;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.play-button:hover {
  transform: scale(1.1);
  background: #1ed760;
}

.play-icon {
  color: #ffffff;
  font-size: 24px;
}

.playlist-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.playlist-title {
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.playlist-description {
  color: #b3b3b3;
  font-size: 14px;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style> 