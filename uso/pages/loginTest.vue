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
        <input v-model="auth.email" class="login-textbox" type="text" />
      </div>
      <div class="login-group">
        <div class="password-text">
          <p>Password</p>
          <p id="show-password-btn">Show password</p>
        </div>
        <input v-model="auth.password" class="login-textbox" type="password" />
      </div>
      <input type="submit" value="Login" class="login-button" @click="login" />
    </div>
  </div>
  <!-- copy osu css layout for pfp and header -->
</template>

<script>
import OwnedCharacter from '../components/ownedCharacter.vue';
import user from '~/static/user.json';
import characters from '~/static/characters.json';

export default {
  components: {},
  layout: 'nonav',
  data() {
    return {
      snackbar: false,
      snackbarText: 'No error message',
      auth: {
        email: '',
        password: '',
      },
    };
  },

  methods: {
    login() {
      const that = this;
      this.$fire.auth
        .signInWithEmailAndPassword(this.auth.email, this.auth.password)
        .catch(function (error) {
          that.snackbarText = error.message;
          that.snackbar = true;
        })
        .then((user) => {
          // we are signed in
          this.$router.push('/');
        });
    },
  },
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
  align-items: center;
  min-height: 90.2vh;
  height: 100%;
  background-image: linear-gradient(
      rgba(13, 4, 66, 0.7),
      rgba(16, 51, 112, 0.8)
    ),
    /* url('~/assets/images/backgrounds/fleeting-colors.jpg'); */
      url('~/assets/images/backgrounds/chnBg.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
}
.cover-photo {
  width: var(--container-width);
  height: 32rem;
  margin-top: 4rem;
  background-image: linear-gradient(
      rgba(62, 54, 104, 0.7),
      rgba(62, 54, 104, 0.7)
    ),
    url('~/assets/images/backgrounds/yaeMiko.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center 25%;
}
.b {
  height: 4rem;
  width: 4rem;
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
  font-size: 4rem;
  /* align-items: center; */
}
.profile-picture {
  width: var(--pfp-size);
  height: var(--pfp-size);
  border-radius: var(--pfp-radius);
  overflow: hidden;
  align-self: flex-end;

  margin: -4rem 2rem 1.5rem 0;
}
.password-text {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

#collection-header {
  align-self: center;
  font-size: 5rem;
  font-weight: 500;
  text-transform: uppercase;
  margin: auto;
}

/*
.profile-titlebox {
  width: 55vw;

  background-color: rgb(8, 36, 83);
}
.profile-title {
  display: flex;
  align-items: center;
  font-size: 3.5rem;
  font-weight: 400;
  color: #f6f6f6;
  height: 5.5rem;
  margin: 0.5rem 1rem 0.5rem 3.5rem;
  padding-top: 0.5rem;
}
.profile-details {
  color: #fff;
  font-size: 15rem;
  overflow-x: auto;

  --content-width: 55vw;
  --beatmap-set-container-width: 45vw;
  --sidebar: 25rem;
  width: var(--content-width);
  display: flex;
  align-items: flex-start;
  padding: 1.25rem 2.5rem 2.5rem 2.5rem;
  background-image: linear-gradient(rgba(13, 4, 66, 0.7), rgba(13, 4, 66, 0.7)),
    url('~/assets/images/backgrounds/fleeting-colors.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  /* background-position: center center;
} */
</style>
