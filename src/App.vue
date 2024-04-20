<script setup>
import { onMounted, reactive, computed } from 'vue';
import { useStore } from 'vuex';

import NavigationPanel from '@components/NavigationPanel.vue';
import SubscribeTemplate from '@components/SubscribeTemplate.vue';
import FooterTemplate from '@components/FooterTemplate.vue';

const store = useStore();
const status = reactive({
  downloaded: false,
});
const h1 = reactive('Картинная галерея');

onMounted(() => {
  store
    .dispatch('downloadGallery')
    .then(() => {
      console.log('Галерея загружена.');
      status.downloaded = true;
    })
    .catch((err) => console.log(err));
});
const gallery = computed(() => store.state.gallery);

// window.addEventListener('load', () => {
//   const windowWidth = window.innerWidth || document.documentElement.clientWidth;
//   const documentWidth = document.documentElement.scrollWidth;
//   const scrollbarWidth = windowWidth - documentWidth;
//   const root = document.querySelector(':root');
//   root.style.setProperty('--scroll-width', `${scrollbarWidth}px`);
// });

// const lockScroll = () => {
//   document.body.classList.toggle('scroll-locked');
// };

</script>

<template>
  <div class="page">
    {{ h1 }}
    <ul>
      <li
        v-for="item in gallery"
        :key="item.id"
      >
        <div>
          <img
            :src="item.imgSrc"
          >
        </div>
      </li>
    </ul>
    <!-- <NavigationPanel @changeScrollLocked="lockScroll" />
    <router-view class="router page-container" />
    <SubscribeTemplate />
    <FooterTemplate /> -->
  </div>
</template>

<style lang="scss">
@forward '@styles';
@use '@vars/container';
@use '@vars/colors';

:root {
  --scroll-width: 0;
}
body {
  background-color: colors.$gray-background;
  &.scroll-locked {
    overflow: hidden;
    padding-right: var(--scroll-width);
  }
}

.page {
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
}
.page-container {
  width: 100%;
  max-width: container.$width;
  margin-inline: auto;
  padding-inline: container.$padding;
}

.router {
  flex: 1 1 100%;
  padding-block: container.$padding;
  // min-height: 3000px;

  display: flex;
  flex-direction: column;
  gap: 2rem;
}
</style>
