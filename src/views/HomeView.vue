<script setup>
import { onMounted, onUnmounted } from 'vue';
import { useStore } from 'vuex';
import BannerTemplate from '@components/BannerTemplate.vue';
import SliderTemplate from '@components/SliderTemplate.vue';
import SectionTemplate from '@components/SectionTemplate.vue';

import categoryData from '@/assets/json/category.json';
import bannerItems from '@/assets/json/banner.json';

const categoryList = [
  ...categoryData,
  {
    id: 'Каталог',
    text: 'Открыть каталог',
    icon: 'catalog',
  },
];

const store = useStore();
const handleScroll = () => {
  if (window.scrollY > 0) {
    store.state.isScrolled = true;
  } else {
    store.state.isScrolled = false;
  }
};
onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  store.state.isScrolled = true;
});
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
    <SliderTemplate
      category="Шведские стенки"
    />
    <SliderTemplate
      category="Уличные спортивные комплексы"
    />
    <SectionTemplate
      title="Каталог товаров"
      :items="categoryList"
    />
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
