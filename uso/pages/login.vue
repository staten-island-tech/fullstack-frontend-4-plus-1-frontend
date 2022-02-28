<template>
  <div>
    <video
      id="login-video"
      class="video-bg"
      autoplay
      muted
      loop
      playsinline
      src="../assets/images/backgrounds/landing-seirai-island.mp4"
      type="video/mp4"
    ></video>
  </div>
</template>

<script>
export default {
  components: {},
};
</script>

<style scoped>
.uso__navbar {
  display: none;
}
.video-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  -o-object-fit: cover;
  object-fit: cover;
  -o-object-position: 50% 80%;
  object-position: 50% 25%;
  z-index: -1;
}
</style>
