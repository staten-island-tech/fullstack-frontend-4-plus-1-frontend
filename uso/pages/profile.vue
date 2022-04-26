<template>
  <div class="login-page">
    <nuxt-link to="/home" class="uso__logo">
      <img
        class="uso__logo--hover"
        src="~/assets/images/navigation/osu-white.svg"
        alt="logo"
      />
    </nuxt-link>
    <video
      id="login-video"
      class="video-bg"
      autoplay
      muted
      loop
      playsinline
      disablePictureInPicture
      src="../assets/images/backgrounds/landing-seirai-island.mp4"
      type="video/mp4"
    ></video>
    <div class="login-box">
      <h1>Profile</h1>
      <div class="login-group">
        <p>Username</p>
        <input class="login-textbox" type="text" />
      </div>
      <div class="login-group">
        <div class="password-text">
          <p>Password</p>
          <p id="show-password-btn">Show password</p>
        </div>
        <input class="login-textbox" type="password" />
      </div>
      <input type="submit" value="Login" class="login-button" />
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  layout: 'nonav',
};
</script>

<style scoped>
/* .uso__navbar,
.uso__navbar--body {
  display: none;
} */

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
.login-group {
  width: 100%;
  margin-bottom: 2rem;
}
.login-textbox {
  color: black;
  line-height: 29px;
  padding: 5px 10px;
  width: 100%;
  overflow: hidden;
}
.login-button {
  height: 4.2rem;
  width: 100%;
  color: black;
}

.password-text {
  display: flex;
  justify-content: space-between;
}
#show-password-btn {
  font-size: 2.5rem;
  cursor: pointer;
}
</style>
