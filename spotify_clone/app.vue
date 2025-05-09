<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

body {
  background-color: #000000;
  color: #ffffff;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  line-height: 1.5;
}

#__nuxt {
  height: 100%;
  width: 100%;
}

/* Custom Scrollbar Styling */
::-webkit-scrollbar {
  width: 12px;
  height: 12px;
}

::-webkit-scrollbar-track {
  background: #121212;
  border-radius: 6px;
}

::-webkit-scrollbar-thumb {
  background: #282828;
  border-radius: 6px;
  border: 3px solid #121212;
}

::-webkit-scrollbar-thumb:hover {
  background: #404040;
}

/* Firefox Scrollbar Styling */
* {
  scrollbar-width: thin;
  scrollbar-color: #282828 #121212;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.no-scrollbar {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
</style>