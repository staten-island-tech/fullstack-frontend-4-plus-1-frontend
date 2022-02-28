<template>
  <div class="login-page">
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
    <div class="login-box">
      <h2>Login</h2>
    </div>
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
.login-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

.login-box {
  border: 1px solid white;
  margin: auto;
  width: 40rem;
  height: 50rem;
}
</style>
