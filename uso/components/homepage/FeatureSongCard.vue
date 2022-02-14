<template>
  <NuxtLink :to="cardRoute">
    <div
      class="feature-card"
      :style="{
        backgroundImage: featureCardStyle,
      }"
    >
      <!-- <img
      src="~/assets/images/yoru-ni-kakeru.jpg"
      alt="Yoru ni Kakeru"
      class="feature-card-img"
    /> -->
      <h2 class="card-header">
        {{ cardType }}: {{ cardTitle }} - {{ cardArtist }}
      </h2>
    </div>
  </NuxtLink>
</template>

<script>
export default {
  name: 'FeatureSongCard',
  props: {
    cardType: { type: String, default: 'Featured Map' },
    cardTitle: { type: String, default: '' },
    cardArtist: { type: String, default: '' },
    cardRoute: { type: String, default: '/play/song-not-found' },
    cardImg: {
      type: String,
      default:
        'https://steamuserimages-a.akamaihd.net/ugc/1758061978083459138/795D1B88F10FBF6BA70A54F2477DF95A8D1A36C6/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false',
    },
  },

  data() {
    return {};
  },
  computed: {
    featureCardStyle() {
      return `linear-gradient(360deg, #000000 0%, rgba(0, 0, 0, 0.491594) 24.73%, rgba(0, 0, 0, 0) 100%), url(${this.cardImg});`;
    },
  },
  watch: {
    $route() {
      /* location.reload(); */
      /* this.$nuxt.refresh(); */
    } /* USE THIS.ROUTER.PUSH TO TRY TO REFRESH PAGE */,
  },
};
</script>

<style scoped>
.feature-card {
  width: 50rem;
  height: 27rem;
  margin: 1rem;
  /*   background: linear-gradient(
      360deg,
      #000000 0%,
      rgba(0, 0, 0, 0.491594) 24.73%,
      rgba(0, 0, 0, 0) 100%
    ),
    url('~/assets/images/yoru-ni-kakeru.jpg'); */
  border-radius: 1.2rem;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 2rem 2rem 1.6rem 2rem;
}
.card-header {
  z-index: 0;
} /* MAKE THIS SHOW AND WORK ON THE REST OF THE SECTION */

/* .feature-card-img {
  width: 100%;
  height: 100%;
  border-radius: 1.2rem;
  z-index: -1;
}
.feature-card-gradient {
  background: linear-gradient(
    360deg,
    #000000 0%,
    rgba(0, 0, 0, 0.491594) 24.73%,
    rgba(0, 0, 0, 0) 100%
  );
} */
</style>
