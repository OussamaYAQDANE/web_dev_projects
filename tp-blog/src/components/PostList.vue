<template>
  <div class="featured-container">
    <h2 class="featured-title">Sample</h2>
    <div v-if="filteredPosts.length" class="posts-container">
      <SinglePost 
        v-for="post in filteredPosts" 
        :key="post.id" 
        :post="post" 
        class="post-card"
      />
    </div>
    <p v-else class="no-posts">Aucun article trouvé...</p>
  </div>
</template>

<style scoped>
.featured-container {
  padding: 2vw;
}

.featured-title {
  color: red;
  margin-left: 1vw;
  font-size: 2.2rem;
  margin-bottom: 10px;
}

.posts-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5vw;
}

.post-card {
  border: 1px solid #000;
  margin: 10px;
  padding: 1.5vw;
  width: 100%;
  max-width: 400px;
  border-radius: 8px;
  background-color: #f4f4f4;
}

.no-posts {
  text-align: center;
  color: #888;
  font-size: 1.1rem;
}
</style>

  <script>
  import SinglePost from "./SinglePost.vue";
  
  export default {
    components: { SinglePost },
    props: ["posts", "selectedTag"], // ✅ Receive selectedTag from HomeView
    computed: {
      filteredPosts() {
        if (!this.selectedTag) return this.posts; // ✅ Show all if no tag selected
        return this.posts.filter(post => post.tags.includes(this.selectedTag)); // ✅ Filter by tag
      },
    },
  };
  </script>
  