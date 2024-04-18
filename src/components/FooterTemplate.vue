<script setup>
import SvgTemplate from '@components/SvgTemplate.vue';
</script>

<template>
  <footer class="footer">
    <div class="footer__container page-container">
      <SvgTemplate
        class="footer__logo"
        icon-id="logo"
        view-box="0 0 571 136"
      />
      <address class="footer__address">
        <a href="tel:+79999999999">
          8 (999) 999-99-99
        </a>
        <a href="mailto:info@sportova.ru">
          info@sportova.ru
        </a>
      </address>
      <span class="footer__copyright">
        © ООО «Спортова», 2021
      </span>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
@use '@vars/breakpoints' as *;
@use '@vars/container';
@use '@vars/colors';

.footer {
  color: colors.$gray-lightest;
  background-color: colors.$gray-dark;
  padding-block: clamp(1rem, 2vw, 2rem);

  &__container {
    display: flex;
    align-items: center;
    @media (min-width: calc($tablet + 1px)) {
      justify-content: space-between;
    }
    @media (max-width: $tablet) {
      justify-content: center;
    }

    font-size: 1.125rem;
    gap: 1rem 3rem;
    flex-wrap: wrap;
    text-align: center;
  }

  &__logo {
    width: min(15rem, 90%);
    filter: brightness(300%) grayscale(100%);
  }

  &__address {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem 1.5rem;
  }
}
</style>
