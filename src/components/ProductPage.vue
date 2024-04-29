<script setup>
import { useStore } from 'vuex';
import ImgTemplate from '@components/ImgTemplate.vue';
import SvgTemplate from '@components/SvgTemplate.vue';

const { state } = useStore();

defineProps({
  item: {
    type: Object,
    required: true,
  },
});

</script>

<template>
  <article class="product">
    <ImgTemplate
      class="product__image product_background"
      :src="item.image"
    />
    <div class="product__shortly-wrapper">
      <div class="product__shortly product_section">
        <h2 class="product__title">
          {{ item.title }}
        </h2>
        <p class="product__description product__description_short">
          {{ item.description }}
        </p>
        <ul class="product__parameters">
          <li
            v-for="(parameter, index) in Object.entries(item.parameters).slice(0, 4)"
            :key="index"
            class="product__parameters-item"
          >
            <span class="product__parameters-key">
              {{ parameter[0] }}
            </span>
            <span class="product__parameters-value">
              {{ parameter[1] }}
            </span>
          </li>
          <li>
            <a
              class="product__parameters-show"
              href="#parameters"
              @click="state.anchorHandler($event)"
            >
              Смотреть ещё...
            </a>
          </li>
        </ul>
        <span class="product__price">
          {{ item.price }}
        </span>
        <ul class="product__button-list">
          <button
            class="product__button product__button-cart"
            :data-price="item.price"
          >
            В корзину
          </button>
          <button class="product__button product__button-favorites">
            В избранное
            <SvgTemplate
              class="product__button-icon"
              icon-id="favorites"
              view-box="0 0 22 19"
            />
          </button>
        </ul>
      </div>
    </div>
    <div
      class="product_background product_section product__parameters-wrapper"
      id="parameters"
    >
      <h3 class="product__title">
        Характеристики
      </h3>
      <ul class="product__parameters">
        <li
          v-for="(parameter, index) in Object.entries(item.parameters)"
          :key="index"
          class="product__parameters-item"
        >
          <span class="product__parameters-key">
            {{ parameter[0] }}
          </span>
          <span class="product__parameters-value">
            {{ parameter[1] }}
          </span>
        </li>
      </ul>
    </div>
    <div class="product_background product_section product__description-wrapper">
      <h3 class="product__title">
        Описание
      </h3>
      <p class="product__description">
        {{ item.description }}
      </p>
    </div>
  </article>
</template>

<style lang="scss" scoped>
@use '@vars/breakpoints' as *;
@use '@vars/colors';

.product {
  display: grid;
  // grid-template-columns: repeat(auto-fit, minmax(min(100%, $grid-item-width), 1fr));
  gap: clamp(0.75rem, 2vw, 1.5rem) clamp(1.5rem, 3vw, 2.5rem);

  &__image {
    grid-area: image;
  }
  &__shortly-wrapper {
    grid-area: shortly;
  }
  &__parameters-wrapper {
    grid-area: parameters;
  }
  &__description-wrapper {
    grid-area: description;
  }

  @media (min-width: calc($mobile + 1px)), (min-height: calc($tablet-portrait + 1px)) {
    &__shortly &__price {
      color: colors.$red;
      font-size: 3rem;
      font-weight: 900;
    }
  }
  @media (max-width: $mobile), (max-height: $tablet-portrait) {
    &__shortly &__price {
      display: none;
    }
  }

  @media (min-width: calc($tablet + 1px)) {
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      "image       shortly"
      "description shortly"
      "parameters  shortly";

    &__shortly &__description {
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  }
  @media (max-width: $tablet) and (min-width: calc($mobile + 1px)) {
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      "image       shortly"
      "description shortly"
      "parameters  parameters";

    &__shortly &__description {
      display: none;
    }
  }
  @media (max-width: $mobile) {
    grid-template-columns: 1fr;
    grid-template-areas:
      "image"
      "shortly"
      "parameters";

    &__description-wrapper {
      display: none;
    }

    &__shortly &__parameters {
      display: none;
    }
  }

  &_background {
    border-radius: 0.75rem;
    background-color: #fff;
    padding: clamp(1rem, 2vw, 2rem);
    &:target {
      @keyframes targetEffect {
        0% {
          outline: dashed 3px;
          outline-offset: 0.25rem;
          outline-color: rgba(colors.$blue, 0.0);
        }
        50% {
          outline-color: rgba(colors.$blue, 0.5);
        }
        100% {
          outline: dashed 3px;
          outline-offset: 0.25rem;
          outline-color: rgba(colors.$blue, 0.0);
        }
      }
      animation: targetEffect ease 4s 0.5s;
    }
  }
  &_section {
    display: grid;
    gap: 0.75rem;
  }

  &__image {
    aspect-ratio: 4 / 3;
    object-fit: contain;
  }

  &__title {
    font-size: 2rem;
    font-weight: 700;
    word-break: break-word;
  }

  &__shortly {
    position: sticky;
    @media (min-width: calc($tablet-portrait + 1px)) {
      top: 9.5rem;
    }
    @media (max-width: $tablet-portrait) {
      top: 5rem;
    }
  }

  &__description {
    font-size: 1rem;
    line-height: 1.5em;
  }

  &__parameters {
    display: grid;
    gap: 0.75rem;

    &-item {
      display: flex;
      flex-wrap: wrap;
      gap: 0.25rem 2rem;
    }

    &-key {
      flex: 0 1 10rem;
      color: colors.$gray;
      &::after {
        content: ':';
      }
    }
    &-value {
      flex: 1 1 18rem;
      font-weight: 500;
    }

    &-show {
      color: colors.$blue;
    }
  }

  &__button {
    &-list {
      display: flex;
      justify-content: flex-end;
      flex-wrap: wrap-reverse;
      gap: 0.75rem;
      position: sticky;
      bottom: 0.5rem;
      pointer-events: none;
    }
    pointer-events: all;

    font-size: 1.25rem;
    font-weight: 500;
    white-space: nowrap;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.4em;
    color: colors.$white;
    background-color: colors.$orange;
    background-image: linear-gradient(90deg, colors.$orange, darken(colors.$orange, 10));
    border-radius: 0.75rem;
    padding: 0.75rem clamp(0.75rem, 1vw, 1rem);

    &-cart {
      flex: 1 1 50%;
      @media (max-width: $mobile), (max-height: $tablet-portrait) {
        &:after {
          content: 'за 'attr(data-price);
        }
      }
    }
    &-favorites {
      @media (min-width: calc($tablet + 1px)) {
        flex: 1 1 0;
      }
      @media (max-width: $tablet) {
        font-size: 0;
      }
    }

    &-icon {
      width: 2rem;
    }

  }
}
</style>
