<template>
  <div>
    <section class="landing"></section>
    <section class="home-main"></section>
  </div>
</template>

<script>
export default {}
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
  background-image: url('./assets/images/backgrounds/enkanomiya-blurred.jpg'); /* get this to work and continue coding this section */
}
</style>
