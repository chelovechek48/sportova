<template>
  <my-image :image-path-prop="imagePath" />
</template>

<script>
import MyImage from '@components/my-image.vue';

export default {
  components: {
    MyImage,
  },
  data() {
    return {
      imagePath: '/sportova/src/assets/images/стенка.jpg',
    };
  },
};
</script>
