<template>

  <div class="nav">

    <nuxt-link to="/" class="uso-logo">
      <img src="~/assets/images/navigation/osu-white.svg">
    </nuxt-link>

      <nav class="uso-nav">

        <nuxt-link to="/">home</nuxt-link>
        <nuxt-link to="/play">beatmaps</nuxt-link>
        <nuxt-link to="/leaderboard">rankings</nuxt-link>
        <nuxt-link to="/community">community</nuxt-link>
        <nuxt-link to="/help">help</nuxt-link>
        
      </nav>

      <nuxt-link to="/login">
        <img src="~/assets/images/navigation/nav-avatar.png" class="uso-login">
      </nuxt-link>

  </div>

</template>

<style scoped>

.uso-logo {
   width: 4.7rem;

  /* font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 1.5em;
  color: #39b982;
  text-decoration: none; */
}

.nav {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 6.2rem;
  background-image: url("~/assets/images/navigation/nav-bg.png");
}

.nav .nav-item {
  box-sizing: border-box;
  margin: 0 5px;
  color: rgba(0, 0, 0, 0.5);
  text-decoration: none;
}

.nav .nav-item.router-link-exact-active {
  color: #39b982;
  border-bottom: solid 2px #39b982;
}

.nav a {
  display: inline-block;
  color: white;
}

.uso-login {
  border-radius: 50%;
  width: 4.2rem;
}

</style>
