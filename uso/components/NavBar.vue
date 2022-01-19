<template class="uso-layout uso-layout--body">

  <header class="uso-nav">

    <div class="uso-logo">
        <nuxt-link to="/" class="uso-home">
              <img class="uso-logo--hover" :src="require('@/assets/images/osu-white.svg')" alt="logo">
        </nuxt-link>
    </div> 

    <nav class="uso-nav">

      <ul class="nav__links">
        <li class="nav__links-menu">

          <nuxt-link class="menu-list" to="/">home</nuxt-link>
          <nuxt-link class="menu-list" to="/community">beatmaps</nuxt-link>
          <nuxt-link class="menu-list" to="/play">rankings</nuxt-link>
          <nuxt-link class="menu-list" to="/leaderboard">community</nuxt-link> 
          <nuxt-link class="menu-list" to="/help">help</nuxt-link> 

        </li>
      </ul>

    </nav>

        <div class="nav__colgroup nav__avatar-container">

            <!-- <div class="nav__col">
                <a href="https://osu.ppy.sh/wiki/Twitter" 
                    class="nav-button nav-button--social" 
                    title="Twitter">
                    <span class="fab fa-twitter">♬</span>
                </a>
            </div>
        
            <div class="nav__col">
                <a href="https://osu.ppy.sh/home/support" 
                    class="nav-button nav-button--support" 
                    title="support the game">
                    <span class="fas fa-heart">♬</span>
                </a>
            </div>
        
            <div class="nav__col">
                <a href="https://osu.ppy.sh/home/support" 
                    class="nav-button nav-button--support" 
                    title="support the game">
                    <span class="fas fa-heart">♬</span>
                </a>
            </div> -->

            <div class="nav__col nav__col--avatar">
                    <nuxt-link class="avatar avatar--nav avatar--guest" to="/login"></nuxt-link> 
                  </div>
          </div>
   
  </header>

</template>

<style scoped>

/* ROOTS, Fonts, CSS Variables, Animations */

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&display=swap');

:root {
    --base-hue: 200;
    --base-hue-deg: 200deg;
}
  
:root {
    --hsl-p: var(--base-hue),100%,50%;
    --hsl-h1: var(--base-hue),100%,70%;
    --hsl-h2: var(--base-hue),50%,45%;
    --hsl-c1: var(--base-hue),40%,100%;
    --hsl-c2: var(--base-hue),40%,90%;
    --hsl-l1: var(--base-hue),40%,80%;
    --hsl-l2: var(--base-hue),40%,75%;
    --hsl-l3: var(--base-hue),40%,70%;
    --hsl-l4: var(--base-hue),40%,50%;
    --hsl-d1: var(--base-hue),20%,35%;
    --hsl-d2: var(--base-hue),20%,30%;
    --hsl-d3: var(--base-hue),20%,25%;
    --hsl-d4: var(--base-hue),20%,20%;
    --hsl-d5: var(--base-hue),20%,15%;
    --hsl-d6: var(--base-hue),20%,10%;
    --hsl-f1: var(--base-hue),10%,60%;
    --hsl-b1: var(--base-hue),10%,40%;
    --hsl-b2: var(--base-hue),10%,30%;
    --hsl-b3: var(--base-hue),10%,25%;
    --hsl-b4: var(--base-hue),10%,20%;
    --hsl-b5: var(--base-hue),10%,15%;
    --hsl-b6: var(--base-hue),10%,10%;
    --c-saturation-1: 100%;
    --c-saturation-2: 80%;
    --c-saturation-3: 60%;
    --c-lightness-1: 70%;
    --c-lightness-2: 60%;
    --c-lightness-3: 50%;
    --colour-pink-hue: 333;
    --hsl-pink-1: var(--colour-pink-hue),var(--c-saturation-1),var(--c-lightness-1);
    --hsl-pink-2: var(--colour-pink-hue),var(--c-saturation-2),var(--c-lightness-2);
    --hsl-pink-3: var(--colour-pink-hue),var(--c-saturation-3),var(--c-lightness-3);
    --colour-purple-hue: 255;
    --hsl-purple-1: var(--colour-purple-hue),var(--c-saturation-1),var(--c-lightness-1);
    --hsl-purple-2: var(--colour-purple-hue),var(--c-saturation-2),var(--c-lightness-2);
    --hsl-purple-3: var(--colour-purple-hue),var(--c-saturation-3),var(--c-lightness-3);
    --colour-blue-hue: 200;
    --hsl-blue-1: var(--colour-blue-hue),var(--c-saturation-1),var(--c-lightness-1);
    --hsl-blue-2: var(--colour-blue-hue),var(--c-saturation-2),var(--c-lightness-2);
    --hsl-blue-3: var(--colour-blue-hue),var(--c-saturation-3),var(--c-lightness-3);
    --colour-green-hue: 125;
    --hsl-green-1: var(--colour-green-hue),var(--c-saturation-1),var(--c-lightness-1);
    --hsl-green-2: var(--colour-green-hue),var(--c-saturation-2),var(--c-lightness-2);
    --hsl-green-3: var(--colour-green-hue),var(--c-saturation-3),var(--c-lightness-3);
    --colour-lime-hue: 90;
    --hsl-lime-1: var(--colour-lime-hue),var(--c-saturation-1),var(--c-lightness-1);
    --hsl-lime-2: var(--colour-lime-hue),var(--c-saturation-2),var(--c-lightness-2);
    --hsl-lime-3: var(--colour-lime-hue),var(--c-saturation-3),var(--c-lightness-3);
    --colour-orange-hue: 45;
    --hsl-orange-1: var(--colour-orange-hue),var(--c-saturation-1),var(--c-lightness-1);
    --hsl-orange-2: var(--colour-orange-hue),var(--c-saturation-2),var(--c-lightness-2);
    --hsl-orange-3: var(--colour-orange-hue),var(--c-saturation-3),var(--c-lightness-3);
    --colour-red-hue: 360;
    --hsl-red-1: var(--colour-red-hue),var(--c-saturation-1),var(--c-lightness-1);
    --hsl-red-2: var(--colour-red-hue),var(--c-saturation-2),var(--c-lightness-2);
    --hsl-red-3: var(--colour-red-hue),var(--c-saturation-3),var(--c-lightness-3);
    --colour-darkorange-hue: 20;
    --hsl-darkorange-1: var(--colour-darkorange-hue),var(--c-saturation-1),var(--c-lightness-1);
    --hsl-darkorange-2: var(--colour-darkorange-hue),var(--c-saturation-2),var(--c-lightness-2);
    --hsl-darkorange-3: var(--colour-darkorange-hue),var(--c-saturation-3),var(--c-lightness-3);
}

@keyframes pulse {
	to {transform: scale(1.1);}
}

/* BODY, HTML, LAYOUT */

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body, html {
    height: 100%;
}

body {
    font-family: 'Inter', sans-serif;
    font-weight: 200;
    font-size: 62.5;
    line-height: 1.25;
    position: static;
    color: #fff;
    background-color: #fff;
    margin: 0;
}

.uso-layout {
    display: flex;
    flex-direction: column;
    transition: filter 0.5s ease-in-out, opacity 0.5s ease-in-out;
}

.uso-layout--body {
    background-color: hsl(var(--hsl-b6));
}

/* COLGROUPS */

.nav__colgroup {
    display: flex;
    flex: none;
}
  
.nav__col {
    display: flex;
    align-items: center;
    flex: none;
}
  
.nav__col--menu {
    align-items: stretch;
    position: relative;
}
  
.nav__col--avatar {
    margin-left: 6px;
}

/* LI, A, BUTTON, HEADER */

li, a, button {
    font-family: 'Inter', sans-serif;
    font-weight: 500;
    font-size: 15px;
    color: #dadddd;
    text-decoration: none;
}

.uso-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 9px 24%;
    background-image: url("../assets/images/nav-bg.png");
    background-repeat: no-repeat;


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

.nav-header__menu-bg {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    height: 310px;
    background-color: rgba(17,17,17,.9);
    transition-duration: 0s;
    border-bottom: 1px solid hsl(var(--hsl-h1));
    visibility: hidden;
}

/* USO LOGO */

.uso-logo {
    transition: all 0.3s ease 0s;
}

.uso-logo:hover {
    transform: scale(1.1);
}

.uso-logo--hover {
    cursor: pointer;
    width: 75px;
    height: 100%;
    transform: scaleX(-1);
}

.uso-logo--hover:hover {
    background-image: url("../assets/images/osu-pink.svg");
}

/* LINKS, ICON */

.nav__links {
    list-style: none;
}

.nav__links li {
    display: inline-block;
    padding: 0px 10px;
}

.nav__links li a {
    transition: all 0.3s ease 0s;
}

.nav__links li a:hover {
    color: #fff;
}

.menu-list {
    padding: 8px;
}

#search-icon {
    font-size: 18px;
}

/* CONTAINER, LOGIN */

.login {
    border-radius: 50%;
}

.nav__avatar-container {
    margin-left: auto;
}

.nav-button {
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

.avatar--nav {
    width: 60px;
    height: 60px;
    box-shadow: none;
    border-radius: 50%;
    overflow: hidden;
    transition: width .3s,height .3s;
    position: relative;
}
  
.avatar--guest {
    background-image: url("../assets/images/nav-avatar.png");
}
  
.avatar {
    outline: none;
    border: none;
    padding: 0;
    margin: 0;
    /* background: none; */
    -webkit-appearance: none;
    -moz-appearance: none;
    box-shadow: 0 1px 3px rgb(0 0 0 / 25%);
    border-radius: 40px;
    width: 66px;
    height: 66px;
    flex: none;
    background-color: #333;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: 50%;
    display: block;
    cursor: pointer;
  }

</style>
