<script setup>
import { useStore } from 'vuex';

const store = useStore();

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

const getSrcset = (type) => {
  const imageSources = Object.entries(props.src[type]);
  const srcsetArray = imageSources.map((imageData) => {
    const size = imageData[0];
    const path = store.state.getImage(imageData[1]);
    return `${path} ${size}`;
  });
  return srcsetArray.join(', ');
};

const imageTypesArray = Object.entries(props.src)
  .filter((source) => !(
    ['default', 'alt'].includes(source[0])
  ))
  .map((source) => source[0]);

</script>

<template>
  <picture>
    <source
      v-for="imageType in imageTypesArray"
      :key="imageType"
      :type="imageType"
      :srcset="getSrcset(imageType)"
    >
    <img
      class="image"
      :style="`
        aspect-ratio: ${aspectRatio};
        object-fit: ${objectFit};
      `"
      :src="store.state.getImage(props.src.default['1x'])"
      :alt="props.src.alt"
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
