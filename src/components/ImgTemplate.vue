<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const props = defineProps({
  src: {
    type: Object,
    required: true,
  },
});

const imagesCollectionObject = ref(null);

(function get() {
  const obj = props.src;
  delete (obj.alt);
  const entries = Object.entries(obj);
  entries.forEach((el) => {
    const type = el[0];
    const option = el[1];
    const size = Object.keys(option)[0];
    const value = ref(false);
    (async function gett() {
      const a = await Object.values(option)[0];
      value.value = a.default;
    }());
    obj[type][size] = value;
  });
  imagesCollectionObject.value = obj;
}());

const imagesCollectionArray = Object.entries(imagesCollectionObject.value)
  .filter((source) => !(
    ['alt'].includes(source[0])
  ));
const sourcesCollectionArray = imagesCollectionArray
  .filter((source) => !(
    ['default'].includes(source[0])
  ));

// (async function getImagesCollectionObject() {
//   const imagesPath = await store.state.getImagesPath();
//   const setImagesUrl = (image, option) => {
//     if (image.includes('@images')) {
//       const filenameRegex = /^(.+?)(\.[^.]+)?$/;
//       const filenameSplit = image.match(filenameRegex);
//       const filename = {
//         title: filenameSplit[1].split('/').pop(),
//         extension: filenameSplit[2],
//       };

//       const imageUrl = imagesPath.find((path) => {
//         const isEqual = (path.includes(filename.title) && path.includes(filename.extension));
//         return isEqual;
//       });
//       imagesCollectionObject.value[option.type][option.size] = imageUrl;
//       isLoaded.value = true;
//     }
//   };
//   imagesCollectionArray.forEach((imageArray) => {
//     const imagesArray = Object.entries(imageArray[1]);
//     imagesArray.forEach((imageData) => {
//       const imageType = imageArray[0];
//       const imageSize = imageData[0];
//       const option = {
//         type: imageType,
//         size: imageSize,
//       };
//       const imagePath = imageData[1];
//       setImagesUrl(imagePath, option);
//     });
//   });
// }());

const getSrcSet = (set) => Object.entries(set).map((image) => {
  console.log(set);
  return `${image[1]} ${image[0]}`;
});

</script>

<template>
  <picture v-show="imagesCollectionObject">
    <source
      v-for="(slide, index) in sourcesCollectionArray"
      :key="index"
      :type="slide[0]"
      :srcset="imagesCollectionObject
        ? getSrcSet(imagesCollectionObject[slide[0]])
        : null"
    >
    <img
      class="image"
      :src="imagesCollectionObject
        ? imagesCollectionObject.default['1x']
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
