<template>
  <div>
    <div class="under-nav"></div>
      <section class="landing"></section>
      <section class="home-main">
        <div class="home-content-container">
          <section class="feature-songs">
            <feature-song-card />
            <feature-song-card />
          </section>
          <section class="news">
            <h1 class="news-header">!USO NEWS</h1>
            <news-card />
          </section>
        </div>
      </section>
  </div>
</template>

<script>
import FeatureSongCard from '../components/homepage/FeatureSongCard.vue'
import NewsCard from '../components/homepage/NewsCard.vue'
export default {
  components: { FeatureSongCard, NewsCard },
}
</script>

<style scoped>

.under-nav {
  height: 9.5rem;
}

.landing {
  width: 100%;
  /* max-width: 100%; */
  height: calc(100vh - 9.5rem);
  background-image: url('./assets/images/backgrounds/landing-page-background-inazuma.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}
.home-main {
  width: 100%;
  height: auto;
  padding-bottom: 5rem;
  /* height: calc(100vh - 9.5rem); */
  /*   background-image: url('./assets/images/backgrounds/enkanomiya-blurred.jpg'); */
  background-image: linear-gradient(
      rgba(39, 15, 112, 0.7),
      rgba(39, 15, 112, 0.6)
    ),
    url('~/assets/images/navigation/nav-bg.jpg');
  /*  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center; */
  background-attachment: fixed;
}
.home-content-container {
  width: 104rem;
  margin: auto;
}
.feature-songs {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.news-header {
  color: #b7ba91;
}
.home-section {
  padding: 7rem 0 0 0;
}
</style>
