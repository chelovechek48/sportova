import './style.css';
import { createApp } from 'vue';
import { createStore } from 'vuex';
import axios from 'axios';
import App from './App.vue';
import router from './router';
import ax from './assets/data/axios.json';

const store = createStore({
  state() {
    return {
      gallery: [],
    };
  },
  mutations: {
    load(state, data) {
      state.gallery = data;
    },
  },
  actions: {
    downloadGallery(context) {
      return new Promise((resolve, reject) => {
        // axios.get('/sportova/src/assets/data/axios.json')
        //   .then((response) => {
        //     console.log(response);
        //     const array = response.data;
        //     context.commit('load', array);
        //   }).catch(((err) => {
        //     alert(err.message);
        //   }));

        context.commit('load', ax);
      });
    },
  },
});

// const store = createStore({
//   state() {
//     return {
//       async getImagesPath() {
//         const imagesCollection = import.meta.glob('@images/*.*');
//         const imagesPath = await Promise.all(
//           Object.values(imagesCollection).map(async (image) => {
//             const module = await image();
//             return module.default;
//           }),
//         );
//         return imagesPath;
//       },
//     };
//   },
// });

const app = createApp(App);
app.use(store);
app.use(router);
app.mount('#app');
