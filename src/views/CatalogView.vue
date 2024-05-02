<script setup>
import { ref, onUpdated } from 'vue';
import { useRoute } from 'vue-router';
import BreadCrumbs from '@components/BreadCrumbs.vue';

const route = useRoute();

const category = ref(route.query.category);
onUpdated(() => {
  category.value = route.query.category;
});

</script>

<template>
  <section>
    <BreadCrumbs v-if="category" />
    <h2 class="catalog__title">
      {{ category }}
    </h2>
  </section>
</template>

<style lang="scss" scoped>
.catalog {
  &__title {
    font-size: 2rem;
    font-weight: 700;
    word-break: break-word;
  }
}
</style>
