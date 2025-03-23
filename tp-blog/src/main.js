import { createApp } from "vue";
import App from "./App.vue";
import router from "./router"; // Import du routeur global

const app = createApp(App);
app.use(router); // Utilisation de Vue Router
app.mount("#app"); // Montre l’application sur l’élément #app dans index.html
