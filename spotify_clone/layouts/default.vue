
<template>
  <div class="app-container">
   
    <div v-if="!user || user.error" class="login-banner" >
      <p style="display: inline-block">Please log in to access all features</p>
      <NuxtLink to="/login" class="login-button">Login with Spotify</NuxtLink>
    </div>

    <Sidebar />
    <main class="main-content" :class="{ 'has-banner': !user || user.error }">
      <slot />
    </main>

  </div>
</template>

<script setup>

const { data: user, error: userError } = await useFetch("/api/me");

</script>

<style scoped>

.login-banner {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #1DB954;
  color: white;
  padding: 0.75rem;
  text-align: center;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.login-banner .login-button {
  background-color: white;
  color: #1DB954;
  padding: 0.5rem 1rem;
  border-radius: 500px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s ease;
}

.login-banner .login-button:hover {
  transform: scale(1.05);
  background-color: #f0f0f0;
}


.main-content.has-banner {
  padding-top: 3.5rem; 
}

.app-container {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: 1fr auto;
  height: 100vh;
  background-color: #000000;
}

.main-content {
  overflow-y: auto;
  padding: 1rem 2rem;
  background: linear-gradient(to bottom, #1a1a1a, #000000);
  position: relative;
}

.top-bar {
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(10px);
  z-index: 10;
}

.nav-controls {
  display: flex;
  gap: 1rem;
}

.nav-button {
  background-color: rgba(0, 0, 0, 0.7);
  border: none;
  color: #ffffff;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s ease;
}

.nav-button:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.user-menu {
  display: flex;
  align-items: center;
}

.logout-button {
  background: none;
  border: none;
  color: #b3b3b3;
  font-size: 0.9rem;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 500px;
  transition: all 0.2s ease;
}

.logout-button:hover {
  color: #ffffff;
  background-color: rgba(255, 255, 255, 0.1);
}

.player-container {
  grid-column: 1 / -1;
  height: 90px;
  background-color: #181818;
  border-top: 1px solid #282828;
}

.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  background-color: #000000;
  color: #ffffff;
}

.navbar {
  background-color: #121212;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #282828;
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
  gap: 2rem;
}

.nav-left, .nav-right {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.brand {
  font-size: 1.5rem;
  font-weight: bold;
  color: #1DB954;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.nav-link {
  color: #ffffff;
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: all 0.2s ease;
  background: none;
  border: none;
  font-size: 1rem;
  cursor: pointer;
}

.nav-link:hover {
  background-color: #282828;
  color: #1DB954;
}

.search-container {
  flex: 1;
  max-width: 600px;
  position: relative;
}

.search-input-wrapper {
  position: relative;
  width: 100%;
}

.search-input {
  width: 100%;
  padding: 0.75rem 1rem;
  background-color: #282828;
  border: none;
  border-radius: 20px;
  color: #ffffff;
  font-size: 0.875rem;
  transition: all 0.2s ease;
}

.search-input:focus {
  outline: none;
  background-color: #404040;
}

.search-input::placeholder {
  color: #b3b3b3;
}

.search-results {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 0.5rem;
  background-color: #282828;
  border-radius: 8px;
  max-height: 400px;
  overflow-y: auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.search-result-item {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  gap: 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.search-result-item:hover {
  background-color: #404040;
}

.track-thumbnail {
  width: 40px;
  height: 40px;
  border-radius: 4px;
  object-fit: cover;
}

.track-info {
  flex: 1;
  min-width: 0;
}

.track-name {
  font-weight: 500;
  margin-bottom: 0.25rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.track-artist {
  font-size: 0.75rem;
  color: #b3b3b3;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.play-preview-btn {
  background: none;
  border: none;
  color: #1DB954;
  font-size: 1.25rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.play-preview-btn:hover {
  background-color: rgba(29, 185, 84, 0.1);
}

.footer {
  background-color: #121212;
  color: #b3b3b3;
  text-align: center;
  padding: 1rem;
  border-top: 1px solid #282828;
  font-size: 0.875rem;
  width: 100%;
}

/* Modify the login button in the top bar */
.login-button {
  background: none;
  border: none;
  color: #1DB954;
  font-size: 0.9rem;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 500px;
  transition: all 0.2s ease;
  text-decoration: none;
  display: inline-block;
}

.login-button:hover {
  color: #ffffff;
  background-color: #1DB954;
}
</style>
