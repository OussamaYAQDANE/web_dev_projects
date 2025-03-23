<template>
  <nav>
    <router-link to="/">Accueil</router-link>
    <router-link to="/addPost">Publier un article</router-link>
  </nav>
</template>

<style scoped>
nav {
  background: #222;
  padding: 12px 20px;
  display: flex;
  gap: 20px;
  border-radius: 8px;
}

nav a {
  color: #f8f8f8;
  font-weight: 600;
  text-decoration: none;
  padding: 8px 12px;
  border-radius: 6px;
  transition: background 0.3s ease, color 0.3s ease;
}

nav a:hover {
  background: #f8f8f8;
  color: #222;
}
</style>
