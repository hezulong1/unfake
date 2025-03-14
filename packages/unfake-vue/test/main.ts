import { createApp } from 'vue';
import { setupRouter } from './routes';
import App from './App.vue';

const router = setupRouter();

createApp(App)
  .use(router)
  .mount('#app');
