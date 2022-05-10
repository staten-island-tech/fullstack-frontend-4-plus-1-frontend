<template>
  <div class="uso__navbar--body">
    <nav class="uso__navbar">
      <div class="uso__logolinks--container">
        <nuxt-link to="/home" class="uso__logo">
          <img
            class="uso__logo--hover"
            src="~/assets/images/navigation/osu-white.svg"
            alt="logo"
          />
        </nuxt-link>

        <ul class="uso__navbar--links">
          <li>
            <nuxt-link to="/home" class="uso__links">home</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/beatmaps" class="uso__links">beatmaps</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/leaderboard" class="uso__links"
              >leaderboard</nuxt-link
            >
          </li>
          <li>
            <nuxt-link to="/shop" class="uso__links">shop</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/help" class="uso__links">help</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/play" class="uso__links">game</nuxt-link>
          </li>
        </ul>
      </div>

      <div class="uso__avatar--container">
        <div class="uso__avatar">
          <div class="uso__circle">
            <nuxt-link to="/" class="uso__button"></nuxt-link>
          </div>
          <div class="uso__circle">
            <nuxt-link to="/aboutUs" class="uso__button"
            ><img src="~/assets/images/navigation/paimon2.png" class="nav-shop-btns"
            /></nuxt-link>
          </div>
          <div class="uso__circle">
            <nuxt-link to="/shop" class="uso__button"
              ><img src="~/assets/images/primogem.png" class="nav-shop-btns"
            /></nuxt-link>
          </div>

          <nuxt-link to="/profile" class="uso__avatar--img">
            <img
              src="~/assets/images/navigation/nav-avatar.png"
              class="uso__login"
            />
          </nuxt-link>
        </div>
      </div>

      <div class="uso__navburger">
        <div class="uso__navline1"></div>
        <div class="uso__navline2"></div>
        <div class="uso__navline3"></div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  /* eslint-disable */
  name: 'NavBar',

  data() {
    return {
      page: this.$route.name,
    };
  },

  head() {
    return {
      script: [
        {
          src: '/lib/howler.min.js',
        },
      ],
    };
  },

  watch: {
    $route(to, from) {
      if (to.name !== 'play') {
        // if you're going to somewhere else than `wallpaper`
        // the `return` will end the execution and not go further
        console.log('yes1');
        Howler.volume(0);
      } else {
        console.log('yes refresh yo');
      }
    },
  },

  mounted() {
    const animateNav = () => {
      const navBurger = document.querySelector('.uso__navburger');
      const navLinks = document.querySelector('.uso__navbar--links');
      const navbarLinks = document.querySelectorAll('.uso__navbar--links li');

      navBurger.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');

        navbarLinks.forEach((link, index) => {
          if (link.style.animation) {
            link.style.animation = '';
          } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${
              index / 7 + 1.5
            }s`;
          }
        });

        navBurger.classList.toggle('toggle');
      });
    };

    animateNav();
  },

  methods: {},
};
</script>

<style scoped>
/* Keyframes */

/* @keyframes navLinkFade {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 3;
    transform: translateY(0px);
  }
} */

@keyframes pulse {
  to {
    transform: scale(1.2);
  }
}

@keyframes filterChange {
  0% {
    filter: hue-rotate(0deg);
  }
  20% {
    filter: hue-rotate(45deg);
  }
  40% {
    filter: hue-rotate(115deg);
  }
  60% {
    filter: hue-rotate(200deg);
  }
  80% {
    filter: hue-rotate(333deg);
  }
  100% {
    filter: hue-rotate(0deg);
  }
}
@-o-keyframes filterChange {
  0% {
    filter: hue-rotate(0deg);
  }
  20% {
    filter: hue-rotate(45deg);
  }
  40% {
    filter: hue-rotate(115deg);
  }
  60% {
    filter: hue-rotate(200deg);
  }
  80% {
    filter: hue-rotate(333deg);
  }
  100% {
    filter: hue-rotate(0deg);
  }
}
@-moz-keyframes filterChange {
  0% {
    filter: hue-rotate(0deg);
  }
  20% {
    filter: hue-rotate(45deg);
  }
  40% {
    filter: hue-rotate(115deg);
  }
  60% {
    filter: hue-rotate(200deg);
  }
  80% {
    filter: hue-rotate(333deg);
  }
  100% {
    filter: hue-rotate(0deg);
  }
}
@-webkit-keyframes filterChange {
  0% {
    filter: hue-rotate(0deg);
  }
  20% {
    filter: hue-rotate(45deg);
  }
  40% {
    filter: hue-rotate(115deg);
  }
  60% {
    filter: hue-rotate(200deg);
  }
  80% {
    filter: hue-rotate(333deg);
  }
  100% {
    filter: hue-rotate(0deg);
  }
}

/* Body */

.uso__navbar--body {
  position: fixed;
  width: 100%;
  background-image: linear-gradient(
      rgba(13, 4, 66, 0.7),
      rgba(16, 51, 112, 0.8)
    ),
    url('~/assets/images/navigation/nav-bg.jpg');
  filter: hue-rotate(0deg);
  z-index: 99;

  z-index: 99;
  /* linear-gradient(rgba(13, 4, 66, 0.7), rgba(20, 4, 66, 0.7)) */

  /* filter: hue-rotate(255deg) saturate(.6); */

  /*
    -webkit-animation: filterChange 5s infinite ease 0s;;
    -moz-animation: filterChange 5s infinite ease 0s;;
    -o-animation: filterChange 5s infinite ease 0s;;
     animation: filterChange 5s infinite ease 0s;
  */

  /*
    Filter Notes:
      20deg = yellow
      45deg = brown
      115deg = green
      200deg = blue
      255deg = indigo
      333deg = purple
  */
}

/* Navigation Bar Flex-Setup */

.uso__navbar {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 6.25rem;
  padding: 0 25%;
}

/* Navigation Leftside [logo, links] */

.uso__logolinks--container {
  display: contents;
}

/* Navigation Leftside */

.uso__logolinks--container {
  display: contents;
}

.uso__navbar {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 9.5rem;
  padding: 0.7rem 25%;
}

.uso__logo {
  cursor: pointer;
  width: 7.1rem;
  display: flex;
  align-items: center;
  transform: scaleX(-1);
  border-radius: 50%;
}

.uso__logo--hover {
  transition: all 0.1s ease-in;
  width: 7.1rem;
  border-radius: 50%;
}

.uso__logo--hover:hover {
  background-image: url('~/assets/images/navigation/osu-pink.svg');
  transform: scale(1.07);
  animation: filterChange 4s infinite ease 0s, pulse 0.2s infinite alternate;
}

.uso__navbar--links {
  display: flex;
  justify-content: space-around;
  margin-right: auto;
  padding-top: 0.5rem;
}

.uso__navbar--links li {
  padding: 0 1.5rem;
  list-style: none;
}

.uso__navbar--links a {
  color: #e6eaec;
  font-size: 28px;
  font-weight: 300;
  text-decoration: none;
  transition: all 200ms ease-in;
}

.uso__navbar--links a:hover {
  color: #ffffff;
  border-bottom: 0.1rem solid #ffffff;
}

/* Navigation Rightside [circles, login avatar] */

.uso__avatar--container {
  padding-left: 22.5%;
}

.uso__avatar--container {
  padding-left: 9rem;
}

.uso__avatar {
  display: flex;
  flex: none;
}

.uso__circle {
  display: flex;
  align-items: center;
  flex: none;
  margin-top: 0.5rem;
}

.uso__button {
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
  border: 3px solid hsla(0, 0%, 100%, 0.25);
  font-size: 16px;
  color: #edf0f1;
  margin: 0 3px;
  transition: all 200ms ease-in-out;
}

.uso__button:hover {
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
  border: 3px solid rgba(230, 228, 255, 0.7);
  font-size: 16px;
  color: #edf0f1;
  margin: 0 3px;
}

.uso__avatar--img {
  display: flex;
  align-items: center;
  transition: all 100ms ease-in;
}

.uso__avatar--img:hover {
  transform: scale(1.07);
}

.uso__login {
  border-radius: 50%;
  width: 5.7rem;
  margin: 0 0.5rem;
}

/* Navigation Hamburger Menu */

.uso__navburger {
  display: none;
  cursor: pointer;
}

.uso__navburger div {
  width: 22.5px;
  height: 3px;
  margin: 5px;
  background-color: #edf0f1;
  transition: all 0.3s ease-in-out;
}

.toggle .uso__navline1 {
  transform: rotate(-45deg) translate(-5px, 6px);
}

.toggle .uso__navline2 {
  opacity: 0;
}

.toggle .uso__navline3 {
  transform: rotate(45deg) translate(-5px, -6px);
}

.nav-shop-btns {
  height: 100%;
  width: 100%;
  opacity: 0.8;
}

.nav-shop-btns:hover {
  opacity: 1;
}

/* Mobile Responsive */

@media screen and (max-width: 900px) {
  .uso__navbar {
    background-color: rgb(75, 55, 225);
    background-image: none;
    height: 4.5rem;
    padding: 0 2.5rem;
  }

  .uso__logo {
    width: 3.8rem;
    margin-right: auto;
    z-index: 9999;
  }

  .uso__logo--hover {
    width: 3.8rem;
    display: flex;
    align-items: center;
  }

  .uso__navbar--links {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    height: 30vh;
    top: 8vh;
    background-color: rgb(100, 80, 240);
    width: 100%;
    transform: translateY(-130%);
    /* transition: 0.2s ease-in-out; */
  }

  .uso__circle {
    display: none;
  }

  .uso__button {
    width: 35px;
    height: 35px;
    border: 2px solid #edf0f1;
  }

  .uso__avatar--img {
    display: flex;
    align-items: center;
    padding-right: 35px;
  }

  .uso__login {
    width: 3.25rem;
    margin-left: 0;
    z-index: 9999;
  }

  .nav-active {
    transform: translateY(-11%);
  }

  .uso__navburger {
    display: block;
    z-index: 9999;
  }

  .uso__navbar--links a {
    font-size: 26px;
  }

  .uso__navbar--links {
    padding-left: 0;
  }

  .under-nav {
    height: 0;
  }
}
</style>
