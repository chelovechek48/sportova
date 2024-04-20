import './style.css';
import { createApp } from 'vue';
import { createStore } from 'vuex';
import App from './App.vue';
import router from './router';

const store = createStore({
  state() {
    return {
      images: import.meta.glob('@images/*.*', { eager: true }),
      getImage(imageName) {
        const imageNameWithPath = `/src/assets/images/${imageName}`;
        return this.images[imageNameWithPath].default;
      },
    };
  },
});

const app = createApp(App);
app.use(store);
app.use(router);
app.mount('#app');
