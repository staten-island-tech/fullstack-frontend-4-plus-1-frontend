<template>
  <div>
    <div class="under-nav"></div>
    <section class="landing">
      <video
        id="landing-video"
        class="video-bg"
        autoplay
        muted
        loop
        playsinline
        src="../assets/images/backgrounds/landing-narukami-shrine-2.mp4"
        type="video/mp4"
      ></video>
    </section>
    <section class="home-main">
      <div class="home-content-container">
        <section class="feature-songs home-section">
          <feature-song-card
            card-title="Yoru ni Kakeru"
            card-artist="YOASOBI"
            card-route="/play/YOASOBI-yoru-ni-kakeru"
            card-img="https://steamuserimages-a.akamaihd.net/ugc/1758061978083459138/795D1B88F10FBF6BA70A54F2477DF95A8D1A36C6/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false"
          />
          <feature-song-card
            card-title="Unravel"
            card-artist="Toru Kitajima"
            card-route="/play/toru-kitajima-unravel"
            card-img="https://i.pinimg.com/736x/47/50/49/47504980e845df1adc7677e8fa09e44c--kaneki-wallpaper-tokyo-ghoul.jpg"
          />
          <feature-song-card
            card-title="Brave Shine"
            card-artist="Aimer"
            card-route="/play/aimer-brave-shine"
            card-img="https://images5.alphacoders.com/470/thumb-1920-470240.jpg"
          />
          <feature-song-card
            card-title="Dawn Blue"
            card-artist="Mori Calliope"
            card-route="/play/mori-calliope-dawn-blue"
            card-img="https://images.alphacoders.com/111/thumb-1920-1113744.png"
          />
        </section>
        <section class="news home-section">
          <h1 class="news-header">!USO NEWS</h1>
          <news-card />
        </section>
      </div>
    </section>
  </div>
</template>

<script>
import FeatureSongCard from '../components/homepage/FeatureSongCard.vue';
import NewsCard from '../components/homepage/NewsCard.vue';
export default {
  components: { FeatureSongCard, NewsCard },
  updated() {
    /*     this.$forceUpdate();
    vm.$forceUpdate(); */
  },
};
</script>

<style scoped>
.landing {
  width: 100%;
  /* max-width: 100%; */

  height: calc(100vh - 9.5rem);
  /*   background-image: url('./assets/images/backgrounds/landing.png');

  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center; */
}

.home-main {
  width: 100%;
  height: auto;
  padding-bottom: 5rem;
  /* height: calc(100vh - 9.5rem); */
  /*   background-image: url('./assets/images/backgrounds/enkanomiya-blurred.jpg'); */

  background-image: linear-gradient(
      rgba(18, 47, 96, 0.972),
      rgba(18, 47, 96, 0.6)
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
