<template>
  <div>
    <routeChange />
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
          <!-- <feature-song-card
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
          /> -->
        </section>
        <section class="news home-section">
          <h1 class="news-header">!uso News</h1>

          <news-card />
        </section>
      </div>
    </section>
    <!-- <button @click="auth(), testEnv()">Sign In</button>
     <a href="http://localhost:8080/home/auth/callback" @click="auth()">LOG IN XD</a> -->
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

  async fetch() {
    // http://localhost:8000/6289babceda0db001153a8d8
    // `http://localhost:8000/${getUserId}`
    const token = await this.$auth.strategy.token.get();
    // const getUserId = this.userdata.sub.replace('auth0|', '');
    // console.log(getUserId);
    const userDataFetch = await fetch(
      'http://localhost:8000/6289babceda0db001153a8d8',
      {
        headers: {
          Authorization: token,
        },
      }
    );
    const userDataFetched = await userDataFetch.json();
    // userDataFetched.forEach((user) => {
    //   this.userData.push(user);
    // });

    console.log(userDataFetched);
  },

  // async fetch() {
  //   const userDataFetch = await fetch('https://usobackend.onrender.com/');
  //   const userDataFetched = await userDataFetch.json();

  //   userDataFetched.forEach((user) => {
  //     this.userData.push(user);
  //   });

  //   console.log(this.userData);
  //   //  this.userDataFetch.forEach(user => {
  //   //     this.userData = Object.keys(user)

  //   //   });
  // },
  created() {
    this.getFeatureCards();
    console.log(process.env);
    /* this.getFeatureCards(); */
  },

  methods: {
    auth() {
      this.$auth.loginWith('auth0');
    },

    testEnv() {},

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
@keyframes filterChange {
  0% {
    filter: hue-rotate(0deg);
  }
  20% {
    filter: hue-rotate(45deg);
  }
  40% {
    filter: hue-rotate(115deg);
  }
  60% {
    filter: hue-rotate(200deg);
  }
  80% {
    filter: hue-rotate(333deg);
  }
  100% {
    filter: hue-rotate(0deg);
  }
}
@-o-keyframes filterChange {
  0% {
    filter: hue-rotate(0deg);
  }
  20% {
    filter: hue-rotate(45deg);
  }
  40% {
    filter: hue-rotate(115deg);
  }
  60% {
    filter: hue-rotate(200deg);
  }
  80% {
    filter: hue-rotate(333deg);
  }
  100% {
    filter: hue-rotate(0deg);
  }
}
@-moz-keyframes filterChange {
  0% {
    filter: hue-rotate(0deg);
  }
  20% {
    filter: hue-rotate(45deg);
  }
  40% {
    filter: hue-rotate(115deg);
  }
  60% {
    filter: hue-rotate(200deg);
  }
  80% {
    filter: hue-rotate(333deg);
  }
  100% {
    filter: hue-rotate(0deg);
  }
}
@-webkit-keyframes filterChange {
  0% {
    filter: hue-rotate(0deg);
  }
  20% {
    filter: hue-rotate(45deg);
  }
  40% {
    filter: hue-rotate(115deg);
  }
  60% {
    filter: hue-rotate(200deg);
  }
  80% {
    filter: hue-rotate(333deg);
  }
  100% {
    filter: hue-rotate(0deg);
  }
}

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

button {
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
  /* color: #b7ba91; */

  animation: filterChange 5s infinite ease 0s;
  color: #9cf5b9;
}

.home-section {
  padding: 7rem 0 0 0;
}
</style>
