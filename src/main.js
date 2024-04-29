import './style.css';
import { createApp } from 'vue';
import { createStore } from 'vuex';
import App from './App.vue';
import router from './router';

const store = createStore({
  state() {
    return {
      images: import.meta.glob('@images/*.*', { eager: true }),
      anchorHandler: (event) => {
        event.preventDefault();

        const newHash = event.target.getAttribute('href');
        window.location.hash = '';
        window.location.hash = newHash;

        const { offsetTop } = document.querySelector(newHash);
        const paddingTop = 12;

        const header = document.querySelector('.header');
        const headerHeight = header.clientHeight;

        window.scrollTo({
          top: offsetTop - paddingTop - headerHeight,
          behavior: 'smooth',
        });
      },
    };
  },
});

const app = createApp(App);
app.use(store);
app.use(router);
app.mount('#app');
