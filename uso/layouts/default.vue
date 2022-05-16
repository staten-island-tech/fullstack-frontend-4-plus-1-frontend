<template>
  <div id="app">
    <NavBar />
    <Nuxt />
    <RouteChange />
  </div>
</template>

<script>
import NavBar from '~/components/NavBar.vue';

export default {
  components: {
    NavBar,
  },
};
</script>

<style></style>
