<template>
  <div v-if="tags.length" class="tags-section">
    <h3 class="tags-title">Les thématiques les plus discutées</h3>
    <div class="tags-container">
      <button 
        v-for="tag in tags" 
        :key="tag" 
        @click="selectTag(tag)" 
        :class="{ active: selectedTag === tag }" 
        class="tag-button"
      >
        {{ tag }}
      </button>
    </div>
  </div>
  <p v-else class="loading-message">Chargement des tags...</p>
</template>

<style scoped>
.tags-section {
  padding: 2vw;
}

.tags-title {
  color: purple;
  font-size: 1.8rem;
  margin-left: 2vw;
  margin-bottom: 1.5vw;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1.2vw;
}

.tag-button {
  background-color: #e0f7fa;
  border: 2px solid #00bcd4;
  color: #00796b;
  padding: 0.5vw 1.5vw;
  border-radius: 15px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.tag-button:hover {
  background-color: #00bcd4;
  color: white;
  transform: translateY(-3px);
}

.tag-button.active {
  background-color: #00796b;
  color: white;
}

.loading-message {
  text-align: center;
  color: #888;
  font-size: 1.1rem;
}
</style>

  
  <script>
  export default {
    props: ["tags"], // ✅ Receive tags from parent
    data() {
      return {
        selectedTag: null, // ✅ Store the selected tag
      };
    },
    methods: {
      selectTag(tag) {
        this.selectedTag = tag;
        this.$emit("tag-selected", tag); // ✅ Emit to HomeView
      },
    },
  };
  </script>
  