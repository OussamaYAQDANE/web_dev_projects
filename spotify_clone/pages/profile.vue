<template>
  <div class="profile-page" v-if="user">
    <div class="profile-header">
      <img v-if="user.images && user.images.length" :src="user.images[0].url" alt="Profile Image" class="profile-image" />
      <div class="profile-info">
        <h1 class="profile-name">{{ user.display_name }}</h1>
        <p class="profile-email">{{ user.email }}</p>
        <p class="profile-followers">{{ user.followers?.total }} followers</p>
        <a :href="user.external_urls?.spotify" target="_blank" class="spotify-link">View on Spotify</a>
      </div>
    </div>
  </div>
  <div v-else class="loading">Loading profile...</div>
</template>

<script setup>
const { data: user, error } = await useFetch('/api/me');
</script>

<style scoped>
.profile-page {
  padding: 2rem;
  max-width: 600px;
  margin: 0 auto;
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 2rem;
  background: #181818;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
}

.profile-image {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #1DB954;
}

.profile-info {
  flex: 1;
}

.profile-name {
  font-size: 2rem;
  font-weight: bold;
  color: #fff;
  margin-bottom: 0.5rem;
}

.profile-email {
  color: #b3b3b3;
  margin-bottom: 0.5rem;
}

.profile-followers {
  color: #b3b3b3;
  margin-bottom: 1rem;
}

.spotify-link {
  display: inline-block;
  background: linear-gradient(90deg, #1DB954 0%, #1ED760 100%);
  color: #fff;
  padding: 0.5rem 1.5rem;
  border-radius: 999px;
  text-decoration: none;
  font-weight: 600;
  transition: filter 0.2s;
}

.spotify-link:hover {
  filter: brightness(1.15);
}

.loading {
  text-align: center;
  color: #b3b3b3;
  padding: 2rem;
}
</style> 