<script setup>
import { useRoute } from 'vue-router';

const props = defineProps({
  lastPoint: {
    type: Object,
    required: false,
    default: null,
  },
});

const defaultBreadcrumbs = useRoute().meta.breadcrumbs;
const breadcrumbs = props.lastPoint
  ? [...defaultBreadcrumbs, props.lastPoint]
  : defaultBreadcrumbs;

</script>

<template>
  <ul class="breadcrumbs">
    <li
      class="breadcrumbs__item"
      v-for="item in breadcrumbs"
      :key="item.path"
    >
      <router-link :to="item.path">
        {{ item.text }}
      </router-link>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
@use '@vars/colors';

.breadcrumbs {
  display: flex;
  gap: 0.5rem;
  color: colors.$blue;

  &__item:not(:last-child) {
    &:after {
      content: '/';
      margin-left: 0.5rem;
    }
  }
}
</style>
