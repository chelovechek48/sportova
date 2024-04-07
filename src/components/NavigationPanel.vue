<script setup>
import { ref, defineEmits } from 'vue';
import LinkSvg from '@components/LinkSvg.vue';

const headerIsOpen = ref(false);

const emit = defineEmits(['changeScrollLocked']);

const pageWasScrolled = ref(false);
const handleScroll = () => {
  if (window.scrollY > 0) {
    pageWasScrolled.value = true;
  } else {
    pageWasScrolled.value = false;
  }
};
window.addEventListener('scroll', handleScroll);

const menuList = [
  { link: '', text: 'Шведские стенки' },
  { link: '', text: 'Уличные комплексы' },
  { link: '', text: 'Турники' },
  { link: '', text: 'Тяжелая атлетика' },
  { link: '', text: 'Турники' },
  { link: '', text: 'Турники' },
];

const toggleMenu = () => {
  headerIsOpen.value = !headerIsOpen.value;
  emit('changeScrollLocked');
};

</script>

<template>
  <header
    class="header"
    :class="`
      ${headerIsOpen ? 'header_opened' : 'header_closed'}
      ${pageWasScrolled ? 'header_scrolled' : 'header_no-scrolled'}
    `"
  >
    <div class="navigation">
      <div class="navigation__container page-container">
        <router-link
          class="header__logo"
          to="home"
        />
        <input
          class="header__search"
          type="search"
          name=""
          id=""
          placeholder="Поиск по сайту"
          @focus="addFocus"
        >
        <LinkSvg
          to="home"
          class="header__button"
          icon-id="favorites"
          view-box="0 0 1 1"
        />
        <LinkSvg
          to="home"
          class="header__button"
          icon-id="cart"
          view-box="0 0 1 1"
        />
        <button
          class="header__button header__burger header__burger_mobile"
          @click="toggleMenu"
        >
          <span class="header__burger-item" />
          <span class="header__burger-item" />
          <span class="header__burger-item" />
        </button>
      </div>
    </div>
    <div class="menu">
      <div class="menu__container page-container">
        <button
          class="menu__dropdown-button"
          @click="toggleMenu"
        >
          <div class="header__burger header__burger_desktop">
            <span class="header__burger-item" />
            <span class="header__burger-item" />
            <span class="header__burger-item" />
          </div>
          Каталог товаров
        </button>
        <nav>
          <ul class="menu__list">
            <li
              v-for="menuItem in menuList.slice(0, 4)"
              :key="menuItem.link"
            >
              <router-link
                class="menu__link"
                :to="menuItem.link"
              >
                {{ menuItem.text }}
              </router-link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
    <div class="menu__dropdown page-container">
      <button
        class="menu__background"
        tabindex="-1"
        @click="toggleMenu"
      />
      <nav class="menu__dropdown-list">
        <ul>
          <li
            v-for="menuItem in menuList"
            :key="menuItem.link"
          >
            <router-link
              class="menu__link"
              :to="menuItem.link"
            >
              {{ menuItem.text }}
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style lang="scss" scoped>
@use '@vars/breakpoints' as *;
@use '@vars/container';
@use '@vars/colors';

@mixin logo($height, $ratio, $ratio-fullsize: $ratio) {
  height: $height;
  aspect-ratio: $ratio;
  background-size: calc($height * $ratio-fullsize) $height;
}

.navigation,
.header__logo {
  transition: all 250ms 100ms ease;
}

.navigation {
  $background-color: colors.$white;
  background-color: $background-color;
  box-shadow: var(--scroll-width) 0 0 0 $background-color;

  @media (max-width: $tablet) {
    padding-block: 0.75rem;
  }

  &__container {
    display: flex;
    align-items: center;
    gap: clamp(0.75rem, 1.5vw, 1rem);
  }
}

.header {
  $icon-height: 1.5rem;
  $button-padding: 0.75rem;

  position: sticky;
  top: 0;

  &__button,
  &__search {
    background-color: #fff;
    border-radius: 0.75rem;
    box-shadow: 0 0 0 1px #dedfe7;
    height: $icon-height;
    box-sizing: content-box;
  }
  &__button {
    flex-shrink: 0;
    color: colors.$gray;
    padding: $button-padding;
  }
  &__search {
    @media (min-width: calc($mobile + 1px)) {
      width: 100%;
      flex-grow: 1;
    }
    @media (max-width: $mobile) {
      width: 0;
      flex-grow: 0;
      padding-right: 0;
      transition: 0s;
      &:focus {
        position: absolute;
        width: calc(100vw - (container.$padding + $icon-height) * 2 - $button-padding);
        padding-right: $button-padding;
      }
    }

    font-size: 1rem;
    padding:
      $button-padding
      $button-padding
      $button-padding
      calc($button-padding * 2 + $icon-height);

    background-image: url('@icons/sprite.svg#search-view');
    background-repeat: no-repeat;
    background-size: $icon-height;
    background-position: $button-padding center;

    &::placeholder {
      color: colors.$gray;
      opacity: 1;
    }
  }

  &__burger {
    aspect-ratio: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: var(--burger-gap);

    &-item {
      flex: 0 0 1px;
      width: 100%;
      transition: all 250ms ease;
    }
    @media (min-width: calc(45rem + 1px)) {
      --burger-gap: 5px;
      &_mobile {
        display: none;
      }
      &_desktop {
        height: 1rem;
      }
      &-item {
        background-color: #fff;
      }
    }
    @media (max-width: calc(45rem + 1px)) {
      --burger-gap: 0.5rem;
      &-item {
        background-color: colors.$gray;
      }
      &_desktop {
        display: none;
      }
    }
  }

  &__logo {
    background-image: url('@icons/sprite.svg#logo-view');
    background-repeat: no-repeat;

    @media (min-width: calc($tablet + 1px)) {
      margin-right: 2rem;
    }

    @media (max-width: 45rem) {
      margin-right: auto;
      @include logo($height: 3.25rem, $ratio: calc(212 / 231), $ratio-fullsize: calc(571 / 136));
    }
  }
}

.menu {
  @media (min-width: calc(45rem + 1px)) {
    color: #fff;
    background-color: colors.$blue;
    box-shadow: var(--scroll-width) 0 0 0 colors.$blue;

    &__container {
      display: flex;
      gap: 1rem;
      overflow-x: auto;
    }
    &__list {
      display: flex;
    }
  }
  @media (max-width: 45rem) {
    display: none;
  }

  &__link {
    width: 100%;
    padding: 1rem;
    white-space: nowrap;
    transition: all 100ms ease;
    &:hover {
      background-color: colors.$blue-active;
    }
  }

  &__dropdown {
    z-index: -1;
    position: absolute;
    top: 100%;
    left: calc( (100vw - min( 100vw, container.$width + var(--scroll-width) )) / 2 );
    max-height: calc(100vh - 100%);
    max-height: calc(100dvh - 100%);

    display: flex;
    padding-bottom: 0.75rem;

    transition: all 250ms ease;

    &-list {
      color: #fff;
      transition: all 250ms ease;
      background-color: rgba(#000, 0.75);
      overflow: auto;

      @media (max-width: 45rem) {
        width: calc(100vw - container.$padding * 2);
      }
    }

    &-button {
      @media (min-width: calc(45rem + 1px)) {
        flex-shrink: 0;
        font-size: inherit;
        background-color: colors.$blue-active;
        padding: 1rem;

        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
      @media (max-width: 45rem) {
        display: none;
      }
    }
  }

  &__background {
    z-index: -1;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(#000, 0.5);
    cursor: default;
  }
}

.header {
  &_closed {
    .menu {
      &__dropdown {
        opacity: 0;
        visibility: hidden;

        &-list {
          transform: translateY(-100%);
        }
      }
      &__background {
        pointer-events: none;
      }
    }
  }
  &_opened {
    .header__burger {
      &-item {
        &:nth-child(1) {
          transform: translateY(calc(var(--burger-gap) + 100%)) rotate(45deg);
        }
        &:nth-child(2) {
          width: 0;
          opacity: 0;
        }
        &:nth-child(3) {
          transform: translateY(calc(0px - (var(--burger-gap) + 100%))) rotate(-45deg);
        }
      }
    }
    .menu {
      &__dropdown {
        opacity: 1;
        visibility: visible;

        &-list {
          transform: translateY(0);
        }
      }
    }
  }

  &_scrolled {
    .navigation {
      @media (min-width: calc($tablet + 1px)) {
        padding-block: 0.75rem;
      }
    }
    .header__logo {
      @media (min-width: calc($tablet + 1px)) {
        @include logo($height: 3.75rem, $ratio: calc(212 / 231), $ratio-fullsize: calc(571 / 136));
      }
      @media (max-width: $tablet) and (min-width: calc(45rem + 1px)) {
        @include logo($height: 3.75rem, $ratio: calc(212 / 231), $ratio-fullsize: calc(571 / 136));
      }
    }
  }
  &_no-scrolled {
    .navigation {
      @media (min-width: calc($tablet + 1px)) {
        padding-block: 2rem;
      }
    }
    .header__logo {
      @media (min-width: calc($tablet + 1px)) {
        @include logo($height: 4.5rem, $ratio: calc(571 / 136));
      }
      @media (max-width: $tablet) and (min-width: calc(45rem + 1px)) {
        @include logo($height: 3.75rem, $ratio: calc(571 / 136));
      }
    }
  }
}

</style>
