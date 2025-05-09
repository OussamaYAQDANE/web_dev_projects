<template>
  <div v-if="isOpen" class="modal-overlay">
    <div class="modal-content">
      <h2 class="modal-title">Créer une nouvelle playlist</h2>
      
      <div class="modal-form">
        <div class="form-group">
          <label class="form-label">Nom de la playlist</label>
          <input 
            v-model="playlistName"
            type="text"
            class="form-input"
            placeholder="Ma nouvelle playlist"
          />
        </div>
        
        <div class="form-group">
          <label class="form-label">Description</label>
          <textarea 
            v-model="playlistDescription"
            class="form-textarea"
            rows="3"
            placeholder="Ajouter une description..."
          ></textarea>
        </div>

        <div class="modal-actions">
          <button 
            @click="closeModal"
            class="btn btn-secondary"
          >
            Annuler
          </button>
          <button 
            @click="createPlaylist"
            class="btn btn-primary"
            :disabled="!playlistName"
          >
            Créer
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
}>()

const emit = defineEmits(['close', 'create'])

const playlistName = ref('')
const playlistDescription = ref('')

const closeModal = () => {
  playlistName.value = ''
  playlistDescription.value = ''
  emit('close')
}

const createPlaylist = () => {
  if (!playlistName.value) return
  
  emit('create', {
    name: playlistName.value,
    description: playlistDescription.value
  })
  
  closeModal()
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  backdrop-filter: blur(4px);
}

.modal-content {
  background: linear-gradient(145deg, #1a1a1a, #2a2a2a);
  border-radius: 16px;
  padding: 32px;
  width: 100%;
  max-width: 480px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.modal-title {
  color: #ffffff;
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 24px;
  text-align: center;
}

.modal-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-label {
  color: #b3b3b3;
  font-size: 14px;
  font-weight: 500;
}

.form-input,
.form-textarea {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 12px 16px;
  color: #ffffff;
  font-size: 16px;
  transition: all 0.3s ease;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: #1DB954;
  box-shadow: 0 0 0 2px rgba(29, 185, 84, 0.2);
}

.form-textarea {
  resize: vertical;
  min-height: 100px;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 8px;
}

.btn {
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-primary {
  background: #1DB954;
  color: #ffffff;
}

.btn-primary:hover:not(:disabled) {
  background: #1ed760;
  transform: translateY(-1px);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.2);
}
</style> 