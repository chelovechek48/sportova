<script setup>
import { defineProps } from 'vue';
import spritePath from '@icons/sprite-category.svg';
import SvgTemplate from '@components/SvgTemplate.vue';

defineProps({
  title: {
    type: String,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <section class="section">
    <h2 class="section__title">
      {{ title }}
    </h2>
    <ul class="section__list">
      <router-link
        class="section__link"
        v-for="item in items"
        :key="item.link"
        :to="item.link"
      >
        <SvgTemplate
          class="section__image"
          :icon-id="item.icon"
          view-box="0 0 1 1"
          :sprite="spritePath"
        />
        {{ item.text }}
      </router-link>
    </ul>
  </section>
</template>

<style lang="scss" scoped>
@use '@vars/breakpoints' as *;
@use '@vars/colors';

.section {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  &__title {
    font-size: 2rem;
    font-weight: 700;
    order: -1;
  }

  &__list {
    width: 100%;
    display: grid;
    gap: clamp(0.75rem, 3vw, 1rem);
    @media (min-width: calc($tablet + 1px)) {
      grid-template-columns: repeat(4, 1fr);
    }
    @media (max-width: $tablet) and (min-width: calc($mobile + 1px)) {
      grid-template-columns: repeat(3, 1fr);
    }
    @media (max-width: $mobile) {
      grid-template-columns: repeat(auto-fill, minmax(8rem, 1fr));
    }
  }

  &__image {
    aspect-ratio: 4 / 3;
    height: auto;
  }

  &__link {
    font-size: 1.25rem;
    font-weight: 500;
    text-align: center;
    word-break: break-word;

    padding: clamp(0.75rem, 2.5vw, 2rem);
    background-color: #fff;
    border-radius: 0.75rem;

    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
}
</style>
