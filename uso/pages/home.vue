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
        disablePictureInPicture
        src="../assets/images/backgrounds/landing-narukami-shrine-2.mp4"
        type="video/mp4"
      ></video>
    </section>
    <section class="home-main">
      <div class="home-content-container">
        <section class="feature-songs home-section">
          <!-- <feature-song-card :v-for="song in featureSongs" /> -->

          <feature-song-card
            card-title="Six Trillion Years and Overnight Story"
            card-artist="kemu feat. IA"
            card-route="beatmaps"
            card-img="/beatmaps/1213119/rkc.jpg"
          />
          <feature-song-card
            card-title="Jingle Bells"
            card-artist="Altria Pendragon (Santa Alter) (CV : Ayako Kawasumi)"
            card-route="beatmaps"
            card-img="/beatmaps/689134/BG.jpg"
          />
          <feature-song-card
            card-title="Goodbye Moonmen"
            card-artist="The Living Tombstone feat. Fart"
            card-route="beatmaps"
            card-img="/beatmaps/1249137/mJGRHh3.jpg"
          />
          <feature-song-card
            card-title="Yoru ni Kakeru"
            card-artist="YOASOBI"
            card-route="/beatmaps"
          />
          <feature-song-card
            card-title="Unravel"
            card-artist="Toru Kitajima"
            card-route="/beatmaps"
            card-img="https://i.pinimg.com/736x/47/50/49/47504980e845df1adc7677e8fa09e44c--kaneki-wallpaper-tokyo-ghoul.jpg"
          />
          <feature-song-card
            card-title="Brave Shine"
            card-artist="Aimer"
            card-route="/beatmaps"
            card-img="https://images5.alphacoders.com/470/thumb-1920-470240.jpg"
          />
          <feature-song-card
            card-title="Dawn Blue"
            card-artist="Mori Calliope"
            card-route="/beatmaps"
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
/* import axios from 'axios'; */
import FeatureSongCard from '../components/homepage/FeatureSongCard.vue';
import NewsCard from '../components/homepage/NewsCard.vue';

export default {
  components: { FeatureSongCard, NewsCard },
  /* async asyncData({ $axios }) {
    const data = await $axios.$get('../assets/data/data.json');
    console.log(data);
  }, */

  data() {
    return {
      featureSongs: [
        {
          cardType: 'Featured Map',
          cardTitle: 'Yoru ni Kakeru',
          cardArtist: 'YOASOBI',
          cardRoute: '/beatmaps',
          cardImg:
            'https://steamuserimages-a.akamaihd.net/ugc/1758061978083459138/795D1B88F10FBF6BA70A54F2477DF95A8D1A36C6/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false',
        },
      ],
    };
  },
  created() {
    /* this.getFeatureCards(); */
  },
  methods: {
    /* getFeatureCards: async function getUser() {
      try {
        const response = await axios.get('/user?ID=12345');
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    }, */
    getFeatureCards: async function getFeatureCards() {
      /*  try {
        const data = await this.$axios.$get('data.json');
        const data = await fetch('../static/data.json');
        console.log(data + 'fetched data');
        this.featureSongs = data.json;
        console.log(this.featureSongs);
      } catch (error) {
        console.log(error);
      } */
    },
  },
};
</script>

<style scoped>
.under-nav {
  height: 9.5rem;
}

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
      rgba(16, 51, 112, 0.8),
      rgba(16, 51, 112, 0.7)
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
