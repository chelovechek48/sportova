<script setup>
import BannerTemplate from '@components/BannerTemplate.vue';
import bannerItems from '@/assets/data/bannerData.json';
</script>

<template>
  <div>
    <section class="banner-list">
      <BannerTemplate
        v-for="(item, index) in bannerItems"
        :key="item.link"
        :class="index === 0 ? 'banner_large' : 'banner_small'"
        :item="item"
      />
    </section>
  </div>
</template>

<style lang="scss" scoped>
@use '@vars/breakpoints' as *;
@use '@vars/container';

.banner-list {
  display: grid;
  gap: container.$padding;

  @media (min-width: calc($tablet + 1px)) {
    grid-template-columns: 2fr 1fr;
  }
  @media (max-width: $tablet) and (min-width: calc($mobile + 1px)) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: $mobile) {
    grid-template-columns: 1fr;
  }

  >:nth-child(1) {
    @media (min-width: calc($tablet + 1px)) {
      grid-row-start: 1;
      grid-row-end: 3;
    }
    @media (max-width: $tablet) and (min-width: calc($mobile + 1px)) {
      grid-column-start: 1;
      grid-column-end: 3;
    }
  }
}
</style>
