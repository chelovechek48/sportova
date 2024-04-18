<script setup>
import { ref } from 'vue';

const props = defineProps({
  src: {
    type: Object,
    required: true,
  },
});

const imagesCollectionObject = ref(null);
(function getImagesCollection() {
  const obj = props.src;
  delete (obj.alt);
  const entries = Object.entries(obj);
  entries.forEach((el) => {
    const type = el[0];
    const optionArr = Object.entries(el[1]);
    optionArr.forEach((option) => {
      const path = option[1];
      const size = option[0];
      if (typeof path === 'object') {
        const value = ref(null);
        (async function gett() {
          const a = await path;
          value.value = a.default;
        }());
        obj[type][size] = value;
      } else {
        obj[type][size] = path;
      }
    });
  });
  imagesCollectionObject.value = obj;
}());

const sourcesCollectionArray = Object.entries(imagesCollectionObject.value)
  .filter((source) => !(
    ['default'].includes(source[0])
  ));

const getSrcSet = (set) => Object.entries(imagesCollectionObject.value[set]).map((image) => `${image[1]} ${image[0]}`);

</script>

<template>
  <picture>
    <source
      v-for="slide in sourcesCollectionArray"
      :key="slide[0]"
      :type="slide[0]"
      :srcset="getSrcSet(slide[0])"
    >
    <img
      class="image"
      :src="imagesCollectionObject.default['1x']"
      :alt="imagesCollectionObject.alt"
      loading="lazy"
    >
  </picture>
</template>

<style lang="scss" scoped>
.image {
  aspect-ratio: inherit;
  width: inherit;
  height: inherit;
  object-fit: inherit;
  object-position: inherit;
  border-radius: inherit;
}
</style>
