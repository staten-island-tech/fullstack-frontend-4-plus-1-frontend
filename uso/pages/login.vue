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
      <h1>Login</h1>
      <p>Username</p>
      <input class="login-textbox" type="text" />
      <p>Password</p>
      <input class="login-textbox" type="text" />
      <input type="submit" value="Login" class="login-button" />
    </div>
  </div>
</template>

<script>
export default {
  components: {},
};
</script>

<style scoped>
.uso__navbar,
.uso__navbar--body {
  display: none;
}
.login-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.video-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 25%;
  z-index: -1;
}

.login-box {
  /* border: 1px solid white; */
  background: rgba(66, 50, 89, 0.9);
  margin: auto;
  width: 50rem;
  height: 50rem;
  padding: 5rem;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
}
.login-textbox {
  height: 4.2rem;
  width: 100%;
  color: black;
  outline: 4px #c4a2f2;

  padding: 5px 12px;
  font-size: 2.8rem;
  line-height: 20px;

  vertical-align: middle;

  background-repeat: no-repeat;
  background-position: right 8px center;
  /*  border: 1px solid var(--color-border-default); */
  border-radius: 4px;
  outline: none;
}
.login-button {
  height: 4.2rem;
  width: 100%;
  color: black;
}
</style>
