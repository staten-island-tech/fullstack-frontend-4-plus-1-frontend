<template>
  <div>
    <nav-bar />
    <h1>Song Leaderboard: {{ id }}</h1>
  </div>
</template>

<script>
import NavBar from '../../components/NavBar.vue';

export default {
  components: { NavBar },
  computed: {
    id() {
      return this.$route.params.id;
    },
  },
};
</script>

<style></style>
