<script setup>
import { defineProps } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Keyboard } from 'swiper/modules';

import products from '@/assets/data/productsData.json';
import ProductCard from '@components/ProductCard.vue';

defineProps({
  category: {
    type: String,
    required: true,
  },
});

let swiper;

const focusActiveSlide = () => {
  const { activeIndex } = swiper;
  const prevSlide = swiper.slides[activeIndex - 1];
  const nextSlide = swiper.slides[activeIndex + 1];

  const prevLink = prevSlide ? prevSlide.querySelector('.slider__item') : null;
  const nextLink = nextSlide ? nextSlide.querySelector('.slider__item') : null;

  const prevLinkButtons = prevLink ? prevLink.querySelectorAll('.card__button') : [];
  const nextLinkButtons = nextLink ? nextLink.querySelectorAll('.card__button') : [];

  const valid = [
    swiper.el,
    prevLink, ...prevLinkButtons,
    nextLink, ...nextLinkButtons,
  ];
  const focusedElement = document.activeElement;
  const swiperHasFocus = valid.includes(focusedElement);

  if (swiperHasFocus) {
    const activeLink = swiper.slides[activeIndex].querySelector('.slider__item');
    activeLink.focus();
  }
};

const keyboardEnable = () => {
  swiper.keyboard.enable();
  swiper.autoplay.stop();
};
const keyboardDisable = () => {
  swiper.keyboard.disable();
  swiper.autoplay.start();
};

const containerWidth = 1280;
</script>

<template>
  <Swiper
    class="slider"
    tag="section"
    tabindex="0"
    @swiper="swiper = $event"
    @slideChangeTransitionStart="focusActiveSlide"
    @focusin="keyboardEnable"
    @focusout="keyboardDisable"
    @mouseover="keyboardEnable"
    @mouseout="keyboardDisable"

    :modules="[ Autoplay, Keyboard ]"
    :autoplay="{
      delay: 2500,
    }"
    :keyboard="{
      enabled: false,
      onlyInViewport: true,
    }"

    :breakpoints="{
      0: {
        slidesPerView: 'auto',
      },
      [containerWidth]: {
        slidesPerView: 4,
      }
    }"
    space-between="16"
    :loop="true"
  >
    <h2 class="slider__title">
      {{ category }}
    </h2>
    <Swiper-slide
      class="slider__slide"
      v-for="product in products.filter(product => product.category === category)"
      :key="product.link"
    >
      <ProductCard
        class="slider__item"
        tabindex="-1"
        :item="product"
      />
    </Swiper-slide>
  </Swiper>
</template>

<style lang="scss" scoped>
@use '@vars/container';
@use '@vars/colors';

.slider {
  padding: container.$padding;
  margin: calc(0px - container.$padding);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  &__title {
    font-size: 2rem;
    font-weight: 700;
    order: -1;
  }

  &__slide {
    @media (max-width: container.$width) {
      width: min(100%, clamp(15rem, 25vw, 18rem));
    }
  }
}
</style>
