<template>
  <div>
    <section class="landing"></section>
    <section class="home-main">
      <div class="home-content-container">
        <feature-song-card />
        <feature-song-card />
        <feature-song-card />
        <feature-song-card />
      </div>
    </section>
  </div>
</template>

<script>
import FeatureSongCard from '../components/homepage/FeatureSongCard.vue'
export default {
  components: { FeatureSongCard },
}
</script>

<style scoped>
.landing {
  width: 100%;
  /* max-width: 100%; */
  height: calc(100vh - 2rem); /* SUBTRACT HEIGHT OF NAVBAR */
  background-image: url('./assets/images/backgrounds/landing-page-background-inazuma.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}

.home-main {
  width: 100%;
  height: 100vh;
  background-image: url('./assets/images/backgrounds/enkanomiya-blurred.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  background-attachment: fixed;
}

.home-content-container {
  width: 104rem;
  padding: 7rem 0;
  margin: auto;

  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
</style>
