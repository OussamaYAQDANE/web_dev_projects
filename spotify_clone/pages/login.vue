<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-card">
        <h1 class="title">Welcome to Musicly</h1>
        <p class="subtitle">Connect with Spotify to get started</p>
        <div v-if="error" class="error-message">
          {{ getErrorMessage(error) }}
        </div>
        <button @click="loginWithSpotify" class="login-button" :disabled="loading">
          {{ loading ? 'Connecting...' : 'Login with Spotify' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const error = ref(route.query.error);
const loading = ref(false);

const loginWithSpotify = async () => {
  try {
    loading.value = true;
    const response = await $fetch('/api/auth/login');
    window.location.href = response.url;
  } catch (err) {
    console.error('Failed to initiate login:', err);
    error.value = 'failed_to_connect';
  } finally {
    loading.value = false;
  }
};

const getErrorMessage = (errorCode) => {
  const errorMessages = {
    state_mismatch: 'Security verification failed. Please try again.',
    no_code: 'No authorization code received from Spotify.',
    token_exchange_failed: 'Failed to complete authentication with Spotify.',
    authentication_failed: 'Authentication failed. Please try again.',
    failed_to_connect: 'Failed to connect to Spotify. Please try again.',
  };
  return errorMessages[errorCode] || 'An unknown error occurred. Please try again.';
};
</script>

<style scoped>
.login-page {
  min-height: calc(100vh - 140px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.login-container {
  background-color: #121212;
  padding: 3rem;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid #282828;
  max-width: 400px;
  width: 100%;
}

.title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #ffffff;
}

.subtitle {
  color: #b3b3b3;
  margin-bottom: 2rem;
  font-size: 1.1rem;
}

.error-message {
  color: #ff4444;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
  padding: 0.75rem;
  background-color: rgba(255, 68, 68, 0.1);
  border-radius: 4px;
}

.login-button {
  background-color: #1DB954;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 4px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 200px;
}

.login-button:hover:not(:disabled) {
  background-color: #1ed760;
  transform: scale(1.02);
}

.login-button:disabled {
  background-color: #1a1a1a;
  cursor: not-allowed;
  opacity: 0.7;
}
</style>