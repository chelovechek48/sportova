<template>
  <img
    :src="imagePath"
    alt="альтернативный текст"
  >
</template>

<script>
export default {
  props: {
    imagePathProp: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      imagePath: '',
    };
  },
  async mounted() {
    this.imagePath = (await import(this.imagePathProp)).default;
  },
};
</script>
