<template>
  <div class="feature-card">
    <!-- <img
      src="~/assets/images/yoru-ni-kakeru.jpg"
      alt="Yoru ni Kakeru"
      class="feature-card-img"
    /> -->
    <h3 class="card-header">
      {{ cardType }}: {{ cardTitle }} - {{ cardArtist }}
    </h3>
  </div>
</template>

<script>
export default {
  name: 'FeatureSongCard',
  data() {
    return {
      cardType: 'Featured Map',
      cardTitle: 'Yoru ni Kakeru',
      cardArtist: 'YOASOBI',
    }
  },
}
</script>

<style scoped>
.feature-card {
  width: 48rem;
  height: 27rem;
  margin: 1rem;
  background: linear-gradient(
      360deg,
      #000000 0%,
      rgba(0, 0, 0, 0.491594) 24.73%,
      rgba(0, 0, 0, 0) 100%
    ),
    url('~/assets/images/yoru-ni-kakeru.jpg');
  border-radius: 1.2rem;
  background-size: cover;
}
.card-header {
  position: absolute;
  bottom: 3rem;
  color: white;
  z-index: 3;
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
