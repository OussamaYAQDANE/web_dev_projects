<template>
  <aside class="sidebar">
    <div class="logo">
      <NuxtLink to="/" class="logo-link">
        <h1>Musicly</h1>
      </NuxtLink>
    </div>

    <nav class="main-nav">
      <ul>
        <li>
          <NuxtLink to="/profile" class="nav-link" active-class="active">
            <span class="icon">👤</span>
            <span>Profile</span>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/" class="nav-link" active-class="active">
            <span class="icon">🏠</span>
            <span>Accueil</span>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/search" class="nav-link" active-class="active">
            <span class="icon">🔍</span>
            <span>Rechercher</span>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/library" class="nav-link" active-class="active">
            <span class="icon">📚</span>
            <span>Bibliothèque</span>
          </NuxtLink>
        </li>
      </ul>
    </nav>

    <div class="library-section">
      <div class="section-header">
        <h2>Votre Bibliothèque</h2>
      </div>
      <nav class="library-nav">
        <ul>
          <li>
            <NuxtLink to="/playlists" class="nav-link" active-class="active">
              <span class="icon">📑</span>
              <span>Playlists</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/liked-songs" class="nav-link" active-class="active">
              <span class="icon">❤️</span>
              <span>Titres likés</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/albums" class="nav-link" active-class="active">
              <span class="icon">💿</span>
              <span>Albums</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/artists" class="nav-link" active-class="active">
              <span class="icon">🎤</span>
              <span>Artistes</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/podcasts" class="nav-link" active-class="active">
              <span class="icon">🎧</span>
              <span>Podcasts</span>
            </NuxtLink>
          </li>
        </ul>
        <div class="user-menu">
          <NuxtLink v-if="!user || user.error" to="/login" class="login-button">
            Login
          </NuxtLink>
          <button v-else @click="handleLogout" class="logout-button">
            <span class="logout-icon">🚪</span>
            <span class="logout-text">Logout</span>
          </button>
        </div>
      </nav>
    </div>
  </aside>
</template>

<script setup>
const { data: user } = await useFetch("/api/me");

const handleLogout = async () => {
  await $fetch('/api/auth/logout', { method: 'POST' });
  window.location.href = '/login';
};
</script>

<style scoped>
.sidebar {
  width: 280px;
  height: 100%;
  background-color: #000000;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  border-right: 1px solid #282828;
}

.logo {
  padding: 0.5rem;
}

.logo-link {
  text-decoration: none;
  color: #ffffff;
  font-size: 1.5rem;
  font-weight: bold;
}

.main-nav ul,
.library-nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem;
  color: #b3b3b3;
  text-decoration: none;
  font-weight: 500;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.nav-link:hover,
.nav-link.active {
  color: #ffffff;
  background-color: #282828;
}

.icon {
  font-size: 1.25rem;
}

.section-header {
  padding: 0.75rem;
  color: #b3b3b3;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.library-section {
  flex: 1;
  border-top: 1px solid #282828;
  padding-top: 1rem;
}

.logout-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(90deg, #1DB954 0%, #1ED760 100%);
  color: #fff;
  font-weight: bold;
  font-size: 1rem;
  border: none;
  padding: 0.6rem 1.4rem;
  border-radius: 999px;
  box-shadow: 0 2px 8px rgba(29, 185, 84, 0.15);
  cursor: pointer;
  transition: all 0.2s cubic-bezier(.4,0,.2,1);
  outline: none;
}

.logout-button .logout-icon {
  font-size: 1.2rem;
  display: flex;
  align-items: center;
}

.logout-button .logout-text {
  letter-spacing: 0.03em;
}

.logout-button:hover {
  filter: brightness(1.15);
  transform: scale(1.05);
  box-shadow: 0 4px 16px rgba(29, 185, 84, 0.25);
}
</style> 