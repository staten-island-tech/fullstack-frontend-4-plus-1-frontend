<template>
  <div id="app">
    <NavBar />
    <Nuxt />
  </div>
</template>

<script>
import NavBar from '~/components/NavBar.vue';

export default {
  components: {
    NavBar,
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
};
</script>

<style></style>
