<script setup>
import NavigationPanel from '@components/NavigationPanel.vue';
import SubscribeTemplate from '@components/SubscribeTemplate.vue';
import FooterTemplate from '@components/FooterTemplate.vue';

const lockScroll = () => {
  document.body.classList.toggle('scroll-locked');
};

</script>

<template>
  <div class="page">
    <NavigationPanel @changeScrollLocked="lockScroll" />
    <router-view class="router page-container" />
    <SubscribeTemplate />
    <FooterTemplate />
  </div>
</template>

<style lang="scss">
@forward '@styles';
@use '@vars/container';
@use '@vars/colors';

body {
  background-color: colors.$gray-background;
  &.scroll-locked {
    overflow: hidden;
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
