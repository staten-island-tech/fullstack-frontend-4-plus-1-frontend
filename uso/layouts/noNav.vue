<template>
  <div id="app">
    <Nuxt />
  </div>
</template>

<script>
export default {
  data() {
    return {
      page: this.$route.name,
    };
  },

  watch: {
    $route(to, from) {
      if (to.name !== 'play') {
        // if you're going to somewhere else than `wallpaper`
        // the `return` will end the execution and not go further
        this.music.stop();
      }
    },
  },
};
</script>

<style></style>
