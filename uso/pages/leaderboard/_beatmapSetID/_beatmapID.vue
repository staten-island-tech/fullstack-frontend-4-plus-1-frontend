<template>
  <div>
    <div class="under-nav"></div>

    <h1>Song Leaderboard: {{ beatmapSetID }} | {{ beatmapID }}</h1>
  </div>
</template>

<script>
export default {
  computed: {
    beatmapSetID() {
      return this.$route.params.beatmapSetID;
    },
    beatmapID() {
      return this.$route.params.beatmapID;
    },
  },
};
</script>

<style></style>
