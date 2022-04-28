<template>
  <div>
    <div class="under-nav"></div>

    <div id="profile-body">
      <div class="profile-container">
        <div class="cover-photo"></div>
        <div class="profile-titlebox">
          <h1 class="profile-title">♬ rankings</h1>
        </div>
        <div class="profile-main-body"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.under-nav {
  height: 9.5rem;
}

.profile-body {
  width: 100vw;
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

.cover-photo {
  width: 55vw;
  height: 32rem;
  margin-top: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2.5rem;
  background-image: linear-gradient(
      rgba(62, 54, 104, 0.7),
      rgba(62, 54, 104, 0.7)
    ),
    url('~/assets/images/backgrounds/yaeMiko.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center 25%;
}

.profile-main-body {
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
  /* background-position: center center; */
}
</style>
