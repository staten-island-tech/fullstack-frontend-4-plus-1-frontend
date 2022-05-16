<template>
  <div>
       <routeChange/>
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
          <feature-song-card :v-for="song in featureSongs" />
        </section>
        <section class="news home-section">
          <h1 class="news-header">!USO NEWS</h1>
          
          <news-card />
        </section>
      </div>
    </section>
     <button @click="auth(), testEnv()">Sign In</button>
     <a  href="http://localhost:8080/home/auth/callback" @click="auth()">LOG IN XD</a>
  </div>

</template>

<script>
/* import axios from 'axios'; */

import FeatureSongCard from '../components/homepage/FeatureSongCard.vue';
import NewsCard from '../components/homepage/NewsCard.vue';

export default {
    auth: false,
  components: { FeatureSongCard, NewsCard },
  /* async asyncData({ $axios }) {
    const data = await $axios.$get('../assets/data/data.json');
    console.log(data);
  }, */
  data() {
    return {
      featureSongs: [],
    };
  },




  async fetch() {
    const userDataFetch = await fetch('https://usobackend.onrender.com/');
        const userDataFetched = await userDataFetch.json();
        
        userDataFetched .forEach(user => {
          this.userData.push(user)
        });

        console.log(this.userData)
      //  this.userDataFetch.forEach(user => {
      //     this.userData = Object.keys(user)

      //   });
  },
  created() {
    this.getFeatureCards();
    console.log(process.env)
  },

  methods: {
  
     auth() {
this.$auth.loginWith('auth0')
     },

     testEnv() {

     },

    getFeatureCards: async function getFeatureCards() {
      try {
        /* const data = await this.$axios.$get('data.json'); */
        const data = await fetch('../static/data.json');
        console.log(data + 'fetched data');
        this.featureSongs = data.json;
        console.log(this.featureSongs);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
.container {
  background-color: wheat;
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}
.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

button  {
  width: 10rem;
  height: 10rem;
  font-size: 4rem;
}

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
