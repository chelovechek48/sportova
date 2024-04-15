<script setup>
import { defineProps, ref, onUpdated } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const props = defineProps({
  src: {
    type: Object,
    required: true,
  },
});

onUpdated(() => {
  console.log('update');
});

const imagesCollectionObject = ref(props.src);
const imagesCollectionArray = Object.entries(imagesCollectionObject.value)
  .filter((source) => !(
    (['alt'].indexOf(source[0])) + 1
  ));
const sourcesCollectionArray = imagesCollectionArray
  .filter((source) => !(
    (['default'].indexOf(source[0])) + 1
  ));

(async function getImagesCollectionObject() {
  const imagesPath = await store.state.getImagesPath();
  const setImagesUrl = (image, option) => {
    if (image.includes('@images')) {
      const filenameRegex = /^(.+?)(\.[^.]+)?$/;
      const filenameSplit = image.match(filenameRegex);
      const filename = {
        title: filenameSplit[1].split('/').pop(),
        extension: filenameSplit[2],
      };

      const imageUrl = imagesPath.find((path) => {
        const isEqual = (path.includes(filename.title) && path.includes(filename.extension));
        return isEqual;
      });
      imagesCollectionObject.value[option.type][option.size] = imageUrl;
      imagesCollectionObject.value.loaded = true;
    }
  };
  imagesCollectionArray.forEach((imageArray) => {
    const imagesArray = Object.entries(imageArray[1]);
    imagesArray.forEach((imageData) => {
      const imageType = imageArray[0];
      const imageSize = imageData[0];
      const option = {
        type: imageType,
        size: imageSize,
      };
      const imagePath = imageData[1];
      setImagesUrl(imagePath, option);
    });
  });
}());

const getSrcSet = (set) => {
  const string = [];
  Object.entries(set).forEach((image) => {
    string.push(`${image[1]} ${image[0]}`);
  });
  return string;
};

</script>

<template>
  <picture>
    <source
      v-for="(slide, index) in sourcesCollectionArray"
      :key="index"
      :type="slide[0]"
      :srcset="imagesCollectionObject.loaded
        ? getSrcSet(imagesCollectionObject[slide[0]])
        : null"
    >
    <img
      class="image"
      :src="imagesCollectionObject.loaded
        ? imagesCollectionObject['default']['1x']
        : null"
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
