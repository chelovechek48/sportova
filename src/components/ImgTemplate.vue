<script setup>
import { ref } from 'vue';

const props = defineProps({
  src: {
    type: Object,
    required: true,
  },
  aspectRatio: {
    type: String,
    required: false,
    default: '1 / 1',
  },
  objectFit: {
    type: String,
    required: false,
    default: 'cover',
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

const getSrcSet = (set) => Object.entries(imagesCollectionObject.value[set]).map((image) => `${image[1]} ${image[0]}`);

const sourcesCollectionArray = imagesCollectionObject.value
  ? Object.entries(imagesCollectionObject.value)
    .filter((source) => !(
      ['default'].includes(source[0])
    ))
  : null;

</script>

<template>
  <picture v-if="imagesCollectionObject">
    <source
      v-for="slide in sourcesCollectionArray"
      :key="slide[0]"
      :type="slide[0]"
      :srcset="getSrcSet(slide[0])"
    >
    <img
      class="image"
      :style="`
        aspect-ratio: ${aspectRatio};
        object-fit: ${objectFit};
      `"
      :src="imagesCollectionObject.default['1x']"
      :alt="imagesCollectionObject.alt"
      loading="lazy"
    >
  </picture>
</template>

<style lang="scss" scoped>
.image {
  width: 100%;
  height: 100%;
  object-position: center;
}
</style>
