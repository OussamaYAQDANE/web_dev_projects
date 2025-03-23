<template>
  <div v-if="post" class="post-container">
    <h2 class="post-title">{{ post.title }}</h2>
    <p class="post-body">{{ post.body }}</p>
    <div class="tags-container">
      <p v-for="tag in post.tags" :key="tag" class="tag">#{{ tag }}</p>
    </div>
  </div>
  <div v-else class="loading">
    <p>Chargement...</p>
  </div>
</template>

<style scoped>
.post-container {
  text-align: center;
  padding: 2vw;
}

.post-title {
  color: #007bff;
  font-size: 2rem;
  margin-bottom: 1vw;
}

.post-body {
  border: 1px solid #000;
  text-align: justify;
  font-size: 1.5vw;
  margin: 1.5vw auto;
  padding: 1.5vw;
  max-width: 80%;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.tags-container {
  display: flex;
  justify-content: center;
  gap: 1.5vw;
  flex-wrap: wrap;
  margin-top: 1.5vw;
}

.tag {
  color: #d32f2f;
  font-weight: bold;
  background: #ffebee;
  padding: 0.5vw 1vw;
  border-radius: 5px;
  font-size: 1.2vw;
}
</style>

  
  <script>
  
  export default {
    data() {
      return {
        post: null,
      };
    },
    async mounted() {
      const postId = this.$route.params.id;
      try {
        const response = await fetch("http://localhost:3000/posts"); // Fetch JSON data
        const posts = await response.json();
        this.post = posts.find(post => post.id == postId); // Find the matching post
      } catch (error) {
        console.error("Erreur de chargement des articles:", error);
      }
    },
  };
  </script>
  