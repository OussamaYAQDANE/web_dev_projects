<template>
  <div class="form-container">
    <h2 class="form-title">Publiez votre article</h2>
    <form @submit.prevent="addPost">
      <input class="form-input" v-model="title" placeholder="Titre" required /><br />
      <textarea class="form-textarea" v-model="body" placeholder="Contenu" required></textarea><br />
      <input class="form-input tags-input" v-model="tags" placeholder="Tags (séparés par des virgules)" /><br />
      <button class="submit-btn" type="submit">Publier</button>
    </form>
  </div>
</template>

<style scoped>
.form-container {
  margin: 3vw;
  border: 5px solid #000;
  padding: 3vw;
  background-color: #f9f9f9;
  border-radius: 8px;
}

.form-title {
  text-align: center;
  color: #388e3c;
  font-size: 2.2rem;
  margin-bottom: 2vw;
}

.form-input {
  width: 100%;
  padding: 1vw;
  margin-bottom: 2vw;
  font-size: 1.2rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
}

.form-textarea {
  width: 90%;
  padding: 1vw;
  margin: 2vw auto;
  height: 8vw;
  font-size: 1.2rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
}

.tags-input {
  width: 98%;
}

.submit-btn {
  width: 40%;
  padding: 1.2vw;
  background-color: #388e3c;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.2rem;
  float: right;
  margin-right: 4vw;
  
  transition: background-color 0.3s ease;
}

.submit-btn:hover {
  background-color: #2c6e2c;
}
</style>

  
  <script>
  export default {
    data() {
      return {
        posts: [],
        title: "",
        body: "",
        tags: "",
      };
    },
    mounted() {
      fetch("http://localhost:3000/posts")
        .then(response => response.json())
        .then(posts => (this.posts = posts))
        .catch(error => console.error("Erreur de chargement des articles:", error));
    },
    methods: {
      createPost() {
        const newPost = {
          id: Date.now(),
          title: this.title,
          body: this.body,
          tags: this.tags.split(",").map(tag => tag.trim()),
        };
        this.$router.push("/");
        this.title = "";
        this.body = "";
        this.tags = "";
        return newPost;},
        async addPost() {
        const newPost = this.createPost();
        const response = await fetch("http://localhost:3000/posts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newPost)
        });
        if (response.ok) {
          this.$emit("post-added", newPost);
        } else {
          console.error("Erreur de publication de l'article");
        }
        
        
  
        
      },
    },
  };
  </script>
  