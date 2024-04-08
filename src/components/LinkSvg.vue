<script setup>
import { defineProps } from 'vue';
import SvgTemplate from './SvgTemplate.vue';

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
});
</script>

<template>
  <router-link>
    <SvgTemplate
      :icon-id="iconId"
      :view-box="viewBox"
    />
  </router-link>
</template>

<style lang="scss" scoped>

</style>
