<script setup>
import spritePath from '@icons/sprite.svg';

defineProps({
  iconId: {
    type: String,
    required: true,
  },
  viewBox: {
    type: String,
    required: false,
    default: null,
  },
  sprite: {
    type: String,
    required: false,
    default: spritePath,
  },
});
</script>

<template>
  <svg :viewBox="viewBox || '0 0 1 1'">
    <use :xlink:href="`${sprite}#${iconId}`" />
  </svg>
</template>

<style lang="scss" scoped>
@use '@vars/colors' as *;

svg {
  height: 100%;
}

:root svg {
  --color-blue: #{$blue};
  --color-blue-light: #{$blue-light};
  --color-red: #{$red};
  --color-gray-lightest: #{$gray-lightest};
  --color-gray-light: #{$gray-light};
}
</style>
