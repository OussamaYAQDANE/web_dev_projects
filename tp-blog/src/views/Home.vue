<template>
  <div class="main-container">
    <h1 class="page-title">Welcome!</h1>
    <div class="content-grid">
      <div class="post-list-container">
        <PostList :posts="posts" :selectedTag="selectedTag" />
      </div>
      <div class="tag-cloud-container">
        <TagCloud :tags="allTags" @tag-selected="filterByTag" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.main-container {
  padding: 1vw;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
 
}

.page-title {
  color: #e53946;
  text-align: center;
  font-size: 3rem;
  font-weight: 600;
  margin-bottom: 2.5vw;
}

.content-grid {
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 2.5vw;
}

.post-list-container {
padding: 12px;

}

.tag-cloud-container {
  padding: 12px;
  background: #f1f1f1;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
}
</style>


  
  <script>
  import PostList from "../components/PostList.vue";
  import TagCloud from "../components/TagCloud.vue";
  
  export default {
    name: "HomeView",
    components: { PostList, TagCloud },
    data() {
      return {
        posts: [], // ✅ Posts list
        selectedTag: null,
      };
    },
    async created() {
      try {
        const response = await fetch("http://localhost:3000/posts");
        this.posts = await response.json();
      } catch (error) {
        console.error("Erreur de chargement des articles:", error);
      }
    },
    computed: {
      allTags() {
        return [...new Set(this.posts.flatMap(post => post.tags))];
      },
    },
    methods: {
      filterByTag(tag) {
        this.selectedTag = tag;
      },
    
    },
  };
  </script>
  