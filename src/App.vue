<script setup>
import { useStore } from 'vuex';

import NavigationPanel from '@components/NavigationPanel.vue';
import SubscribeTemplate from '@components/SubscribeTemplate.vue';
import FooterTemplate from '@components/FooterTemplate.vue';

const store = useStore();

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
    <img
      :src="store.state.getImage('girl-on-the-stairs@1x.webp')"
      alt=""
    >
    <!-- <img
      :src="store.state.getPath('girl-on-the-stairs@1x.webp')"
      alt=""
    > -->
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
