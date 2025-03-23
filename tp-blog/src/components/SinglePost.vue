<template>
  <div class="post-card">
    <h3 class="post-title">{{ post.title }}</h3>
    <p class="post-body">{{ post.body.substring(0, 50) }}...</p>
    <router-link class="read-more" :to="'/post/' + post.id">...Lire plus</router-link>
  </div>
</template>

<style scoped>
.post-card {
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 2vw;
  background-color: #f9f9f9;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  margin-bottom: 10px;
}

.post-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.post-title {
  color: #388e3c;
  font-size: 1.8rem;
  margin-bottom: 1.2vw;
  font-weight: 600;
}

.post-body {
  font-size: 1.1rem;
  color: #555;
  line-height: 1.5;
  margin-bottom: 1.5vw;
}

.read-more {
  color: #388e3c;
  font-size: 1.1rem;
  text-decoration: none;
  font-weight: 500;
  display: inline-block;
  margin-top: 1vw;
  transition: color 0.3s ease;
}

.read-more:hover {
  color: #2c6e2c;
}
</style>

  <script>
  export default {
    props: {
      post: Object, // ✅ Post object comes from parent component
    },
  };
  </script>
  