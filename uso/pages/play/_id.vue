<template>
  <div>
    <div class="under-nav"></div>
    <h1 class="song-header">Song: {{ id }}</h1>
  </div>
</template>

<script>
export default {
  computed: {
    id() {
      return this.$route.params.id;
    },
  },
};
</script>

<style scoped>
.song-header {
  color: white;
}
</style>
