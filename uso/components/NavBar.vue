<template>

  <div class="uso-nav">

    <div class="uso--logo-container">

    <nuxt-link to="/" class="uso-logo">
      <img class="uso--logo-hover" src="~/assets/images/navigation/osu-white.svg" alt="logo">
    </nuxt-link>

      <nav class="uso--nav-links">

        <nuxt-link to="/" class="uso-links">home</nuxt-link>
        <nuxt-link to="/play" class="uso-links">beatmaps</nuxt-link>
        <nuxt-link to="/leaderboard" class="uso-links">rankings</nuxt-link>
        <nuxt-link to="/community" class="uso-links">community</nuxt-link>
        <nuxt-link to="/help" class="uso-links">help</nuxt-link>
        
      </nav>

      </div>

      <div class="uso--avatar-container">

        <div class="uso-avatar">

          <div class="uso-circle"><nuxt-link to="/login" class="uso-button"></nuxt-link></div>
          <div class="uso-circle"><nuxt-link to="/login" class="uso-button"></nuxt-link></div>
          <div class="uso-circle"><nuxt-link to="/login" class="uso-button"></nuxt-link></div>

          <nuxt-link to="/login" class="uso-avatar">
            <img src="~/assets/images/navigation/nav-avatar.png" class="uso-login">
          </nuxt-link>

      </div>
      
      </div>

      <!-- <div class="uso-avatar">

        <div class="uso-circle"><nuxt-link to="/login" class="uso-button"></nuxt-link></div>
        <div class="uso-circle"><nuxt-link to="/login" class="uso-button"></nuxt-link></div>
        <div class="uso-circle"><nuxt-link to="/login" class="uso-button"></nuxt-link></div>

        <nuxt-link to="/login" class="uso-avatar">
          <img src="~/assets/images/navigation/nav-avatar.png" class="uso-login">
        </nuxt-link>

      </div> -->

      <div class="uso--hb-menu">
        <span class="hb-bar"></span>
        <span class="hb-bar"></span>
        <span class="hb-bar"></span>
      </div>

  </div>

</template>


<script>

export default {
  name: 'NavBar',

  mounted (){
    const hamburger = document.querySelector(".uso--hb-menu");
    const navMenu = document.querySelector(".uso--nav-links");

    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
    })

    document.querySelectorAll(".uso--nav-links").forEach(n => n.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    }))
  }
}

</script>

<style scoped>

/* navigation components, list */

.uso-nav {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 6.1rem;
  background-image: url("~/assets/images/navigation/nav-bg.png");

  filter: hue-rotate(0deg);
    /* filter: hue-rotate(var(--base-hue-deg)) saturate(.6); */
    /* filter: hue-rotate(255deg) saturate(.6); */

    /* -webkit-animation: filterChange 5s infinite ease 0s;;
    -moz-animation: filterChange 5s infinite ease 0s;;
    -o-animation: filterChange 5s infinite ease 0s;;
     animation: filterChange 5s infinite ease 0s; */
    
    /* Filter Notes:
        20deg = yellow
        45deg = brown
        115deg = green
        200deg = blue
        255deg = indigo
        333deg = purple
    */
}

.uso-nav a {
  display: inline-block;
  color: #EDF0F1;
  font-weight: 300;
  text-decoration: none;
}

.uso-links {
  font-size: 1.6rem;
}

.uso-links:hover {
  text-decoration: underline;
}

.uso--nav-links {
  margin-right: auto;
}

.uso--nav-links .uso-links {
  display: inline-block;
  padding: 0px 14px;
}

/* uso hamburger menu */

.uso--hb-menu {
  display: none;
  cursor: pointer;
}

.hb-bar {
  display: block;
  width: 25px;
  height: 3px;
  margin: 5px auto;
  transition: all 0.3s ease-in-out;
  background-color: #fff;
}

@media(max-width: 992px){

  .uso-nav {
    padding: 0 5%;
  }

  .uso--hb-menu {
    display: block;
    padding-bottom: 1rem;
    margin-left: auto;
  }

  .uso--hb-menu.active .hb-bar:nth-child(2){
    opacity: 0;
  }

  .uso--hb-menu.active .hb-bar:nth-child(1){
    transform: translateY(8px) rotate(45deg);
  }

  .uso--hb-menu.active .hb-bar:nth-child(3){
    transform: translateY(-8px) rotate(-45deg);
  }

  .uso--nav-links {
    position: fixed;
    left: -100%;
    top: 70px;
    gap: 0;
    flex-direction: column;
    background-color: #262626;
    width: 100%;
    text-align: center;
    transition: 0.3s;
  }

  .uso--nav-links.active {
    left: 0;
  }

  .uso-links {
    margin: 16px 0;
  }

  .uso--logo-hover {
    display: none;
  }

  .uso--avatar-container {
    display: none;
  }
  
}

/* uso logo */

.uso--logo-container {
  display: flex;
  align-items: center;
  padding-right: 5.5rem;
}

.uso-logo {
  margin-right: 0.5rem;
  transition: all 150ms ease 0s;
}

.uso-logo:hover {
    transform: scale(1.07);
}

.uso--logo-hover {
   width: 4.8rem;
   cursor: pointer;
   transform: scaleX(-1);
}

.uso--logo-hover:hover {
    background-image: url("~/assets/images/navigation/osu-pink.svg");
}

/* avatar container */

.uso--avatar-container {
  padding-left: 5.5rem;
}

.uso-avatar {
  display: flex;
  flex: none;
}
  
.uso-circle {
  display: flex;
  align-items: center;
  flex: none;
}

.uso-button {
  outline: none;
  border: none;
  padding: 0;
  background: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  border-radius: 50%;
  width: 42px;
  height: 42px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border: 3px solid hsla(0,0%,100%,.25);
  font-size: 16px;
  color: #fff;
  margin: 0 3px;
}

.uso-login {
  border-radius: 50%;
  width: 4.1rem;
  margin-left: 0.5rem;
}

</style>
