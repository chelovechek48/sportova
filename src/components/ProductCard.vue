<script setup>
import { ref } from 'vue';
import ImgTemplate from '@components/ImgTemplate.vue';
import SvgTemplate from '@components/SvgTemplate.vue';

defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const buttonIsActive = ref('-1');

</script>

<template>
  <router-link
    class="card"
    :to="{ name: 'item', query: { id: item.id }}"
    @focusin="buttonIsActive = '0'"
    @focusout="buttonIsActive = '-1'"
  >
    <ImgTemplate
      class="card__image"
      :src="item.image"
    />
    <header class="card__title">
      {{ item.title }}
    </header>
    <div class="card__bottom">
      <span class="card__price">
        {{ item.price }}
      </span>
      <button
        class="card__button"
        :tabindex="buttonIsActive"
      >
        <SvgTemplate
          icon-id="favorites"
          view-box="0 0 22 19"
        />
      </button>
      <button
        class="card__button card__button-cart"
        :tabindex="buttonIsActive"
      >
        <SvgTemplate
          icon-id="cart"
          view-box="0 0 22 19"
        />
      </button>
    </div>
  </router-link>
</template>

<style lang="scss" scoped>
@use '@vars/colors';

.card {
  background-color: colors.$white;
  border-radius: 0.75rem;
  padding: 1.25rem;

  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  &__image {
    aspect-ratio: 1;
    object-fit: contain;
  }

  &__title {
    font-size: 1rem;
  }

  &__bottom {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  &__price {
    font-size: 1.25rem;
    font-weight: 500;
    margin-right: auto;
  }

  &__button {
    height: 2.5rem;
    padding: 0.5rem;

    display: flex;
    align-items: center;
    border-radius: 0.75rem;

    color: #000;
    background-color: rgba(#000, 0.1);

    &-cart {
      &::before {
        content: '+';
        font-size: 1.125rem;
      }
    }
  }
}
</style>
