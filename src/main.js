import './style.css';
import { createApp } from 'vue';
import { createStore } from 'vuex';
import App from './App.vue';
import router from './router';

const store = createStore({
  state() {
    return {
      async getImagesPath() {
        const imagesCollection = import.meta.glob('@images/*.*');
        const imagesPath = await Promise.all(
          Object.values(imagesCollection).map(async (image) => {
            const module = await image();
            return module.default;
          }),
        );
        return imagesPath;
      },
    };
  },
});

const app = createApp(App);
app.use(store);
app.use(router);
app.mount('#app');
