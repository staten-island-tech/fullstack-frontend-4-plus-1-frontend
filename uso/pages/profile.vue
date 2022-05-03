<template>
  <div>
    <div class="under-nav"></div>

    <div id="profile-body">
      <div class="profile-container">
        <div class="cover-photo"></div>

        <div class="profile-details">
          <img 
          :src="user[0].image"
            class="profile-picture"
          ></img>
      
            <h1 class="profile-title">{{user[0].username}}</h1>
     
        </div>
      </div>
    </div>
  </div>
  <!-- copy osu css layout for pfp and header -->
</template>

<script>
import user from '~/static/user.json';

export default {
  data() {
    return {
      user,
    };
  },
  /* created() {
    console.log(user);
  }, */
};
</script>

<style lang="css" scoped>
#profile-body {
  --container-width: 55vw;
  --pfp-size: 120px;
  --pfp-radius: 40px;
  /* width: 100%; */
}

.profile-container {
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

.profile-details {
  width: var(--container-width);
  background-image: linear-gradient(rgba(13, 4, 66, 0.7), rgba(13, 4, 66, 0.7)),
    url('~/assets/images/backgrounds/fleeting-colors.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;

  display: flex;
    align-items: center;
    padding: 0 5rem;
}
.profile-picture {
  width: var(--pfp-size);
  height: var(--pfp-size);
  border-radius: var(--pfp-radius);
  overflow: hidden;
  align-self: flex-end;
}

.profile-title {
  font-size: 6rem;
    /* line-height: 7rem; */
    font-weight: 400;
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
