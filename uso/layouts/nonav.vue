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

  head() {
    return {
      script: [
        {
          src: '/lib/howler.min.js',
          callback: () => this.$store.commit('setHowlerLoaded', true),
        },
      ],
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
