<script setup>
import { defineProps } from 'vue';
import ImgTemplate from '@components/ImgTemplate.vue';

const imagesCollection = import.meta.glob('@images/*.*');

defineProps({
  item: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <router-link
    class="banner"
    :to="item.link"
  >
    <ImgTemplate
      class="banner__image"
      :images-path="imagesCollection"
      :src="item.image"
    />
    <h2 class="banner__title">
      {{ item.title }}
    </h2>
    <p class="banner__description">
      {{ item.description }}
    </p>
    <div class="banner__button">
      {{ item.button }}
    </div>
  </router-link>
</template>

<style lang="scss" scoped>
@use '@vars/breakpoints' as *;
@use '@vars/colors';

.banner {
  position: relative;
  color: colors.$white;
  background-color: rgba(#000, 0.25);

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  border-radius: 0.75rem;
  overflow: hidden;

  &_large {
    @media (min-width: calc($tablet + 1px)) {
      padding: 3rem;
    }
    @media (max-width: $tablet) {
      padding: clamp(1rem, 4vw, 2rem);
    }
  }
  &_small {
    padding: clamp(1rem, 4vw, 2rem);
  }

  &__image {
    position: absolute; top: 0; left: 0; width: 100%; height: 100%;
    z-index: -1;
    background-color: colors.$white;
    object-fit: cover;
    object-position: right top;
  }

  &__title {
    line-height: 1.25em;
    font-weight: 800;
  }
  &_large &__title {
    font-size: clamp(1.5rem, 5vw, 3rem);
  }
  &_small &__title {
    font-size: 1.25rem;
  }

  &__description {
    @media (min-width: $mobile) {
      width: 70%;
    }
    font-size: 1rem;
    line-height: 1.5em;
  }

  &__button {
    font-size: 1rem;
    font-weight: 500;
    margin-top: auto;
  }
  &_large &__button {
    color: colors.$white;
    background-color: colors.$orange;
    padding: 1rem 2rem;
    border-radius: 0.75rem;
  }
  &_small &__button {
    color: colors.$white;
  }
}
</style>
