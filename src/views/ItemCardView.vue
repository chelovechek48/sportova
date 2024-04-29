<script setup>
import { ref, onMounted, onUpdated } from 'vue';
import { useRoute } from 'vue-router';

// import BreadCrumbs from '@components/BreadCrumbs.vue';
import ProductPage from '@components/ProductPage.vue';
import SliderTemplate from '@components/SliderTemplate.vue';

import products from '@/assets/json/products.json';

const route = useRoute();

const getProduct = () => products.find((item) => item.id === route.query.id);

const product = ref(getProduct());

const pageSrollTo = (position) => {
  window.scrollTo({
    top: position,
    behavior: 'smooth',
  });
};

onMounted(() => {
  pageSrollTo(0);
});
onUpdated(() => {
  product.value = getProduct();
});

</script>

<template>
  <section>
    <!-- <BreadCrumbs /> -->
    <ProductPage :item="product" />
    <SliderTemplate
      title="Похожие товары"
      :category="product.category"
    />
  </section>
</template>

<style lang="scss" scoped>

</style>
