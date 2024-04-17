<script setup>

</script>

<template>
  <aside class="subscribe">
    <div class="subscribe__container page-container">
      <div class="subscribe__text">
        <h2 class="subscribe__title">
          Редкие, но очень полезные письма!
        </h2>
        <p class="subscribe__paragraph">
          Подпишись и получи промокод на скидку! Его можно применить ко всем товарам в магазине
        </p>
      </div>
      <form
        class="subscribe__form"
        action=""
      >
        <input
          class="subscribe__input"
          type="email"
          name=""
          id=""
          placeholder="Ваш e-mail"
        >
        <button
          class="subscribe__button"
          type="submit"
        >
          Подписаться
        </button>
      </form>
    </div>
  </aside>
</template>

<style lang="scss" scoped>
@use '@vars/container';
@use '@vars/colors';

.subscribe {
  color: #fff;
  background-color: colors.$blue;
  padding-block: clamp(1rem, 4vw, 4.5rem);

  &__container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1.25rem;
    flex-wrap: wrap;
  }

  &__text {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    flex: 1 1 25rem;
  }
  &__title {
    font-size: 2rem;
    font-weight: 700;
  }
  &__paragraph {
    font-size: 1.125rem;
  }

  &__form {
    display: flex;
    flex-wrap: wrap;
    gap: container.$padding;
    flex: 1 1 25rem;
  }

  &__input {
    background-color: colors.$blue-dark;
    flex: 1 1 65%;
    &::placeholder {
      color: colors.$white;
      opacity: 1;
    }
  }
  &__button {
    background-color: colors.$orange;
    background-image: linear-gradient(90deg, colors.$orange, darken(colors.$orange, 10));
    flex: 1 1 0;
  }
  &__input,
  &__button {
    padding: 1rem clamp(container.$padding, 3vw, 1.5rem);
    border-radius: 0.75rem;
    font-size: 1.125rem;
    width: 100%;
  }
}
</style>
