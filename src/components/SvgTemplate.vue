<script setup>
import { defineProps } from 'vue';
import sprite from '@icons/sprite.svg';

defineProps({
  id: {
    type: String,
    required: true,
  },
  viewBox: {
    type: String,
    required: false,
    default: null,
  },
});
</script>

<template>
  <svg :viewBox="viewBox || '0 0 1 1'">
    <use :xlink:href="`${sprite}#${id}`" />
  </svg>
</template>

<style lang="scss" scoped>
svg {
  width: 100%;
  height: 100%;
}
</style>
