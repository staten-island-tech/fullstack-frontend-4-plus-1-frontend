<template>
  <div class="settings__page">
    <div class="under-nav"></div>
    <section class="landing">
      <video
        id="landing-video"
        class="video-bg"
        autoplay
        muted
        loop
        playsinline
        disablePictureInPicture
        src="../assets/images/backgrounds/landing-narukami-shrine.mp4"
        type="video/mp4"
      ></video>
    </section>

    <div class="settings__container">
      <h1 id="settings__title">settings.</h1>
      <form class="settings__form">
        <section class="settings__section">
          <header>
            <h2 id="sounds__title">sfx/sounds</h2>
            <h3 id="sounds__subTitle">adjust your volume settings</h3>
            <button class="btn" @click="patch()">update</button>
          </header>

          <fieldset class="settings__field">
            <div class="fieldset-item">
              <picture aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path
                    d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"
                  ></path>
                </svg>
              </picture>
              <div class="input-stack">
                <label id="media-volume" for="media-volume" aria-hidden="true">
                  master volume ~
                </label>
                <input
                  name="media-volume"
                  aria-labelledby="media-volume"
                  type="range"
                  :value="volume1"
                  min="0"
                  max="100"
                  style="--track-fill: 30%"
                />
                <p id="rangeValue">3</p>
              </div>
            </div>

            <div class="fieldset-item">
              <picture aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path
                    d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"
                  ></path>
                </svg>
              </picture>
              <div class="input-stack">
                <label id="media-volume" for="media-volume" aria-hidden="true">
                  music volume ~
                </label>
                <input
                  name="media-volume"
                  aria-labelledby="media-volume"
                  type="range"
                  value="3"
                  max="10"
                  style="--track-fill: 30%"
                  oninput="rangeValue.innerText = this.value"
                />
                <p id="rangeValue">3</p>
              </div>
            </div>

            <div class="fieldset-item">
              <picture aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path
                    d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"
                  ></path>
                </svg>
              </picture>
              <div class="input-stack">
                <label id="media-volume" for="media-volume" aria-hidden="true">
                  hitsounds volume ~
                </label>
                <input
                  name="media-volume"
                  aria-labelledby="media-volume"
                  type="range"
                  value="3"
                  max="10"
                  style="--track-fill: 30%"
                  oninput="rangeValue.innerText = this.value"
                />
                <p id="rangeValue">3</p>
              </div>
            </div>

            <div class="fieldset-item">
              <picture aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path
                    d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"
                  ></path>
                </svg>
              </picture>
              <div class="input-stack">
                <label id="media-volume" for="media-volume" aria-hidden="true">
                  scroll speed ~
                </label>
                <input
                  name="media-volume"
                  aria-labelledby="media-volume"
                  type="range"
                  value="3"
                  max="10"
                  style="--track-fill: 30%"
                  oninput="rangeValue.innerText = this.value"
                />
                <p id="rangeValue">3</p>
              </div>
            </div>
          </fieldset>
        </section>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      userdata: this.$auth.user,
      masterVolume: 0.5,
    };
  },
  watch: {
    // volume1(newValue) {
    //   if (this.volume1 > 100) this.volume1 = 100;
    //   else if (this.volume1 < 0) this.volume1 = 0;
    // },
  },
  methods: {
    async patch() {
      const getUserId = this.userdata.sub.replace('auth0|', '');
      console.log(getUserId);
      try {
        const token = await this.$auth.strategy.token.get();
        fetch(`http://localhost:8000/update/${getUserId}`, {
          method: 'PATCH',
          body: JSON.stringify({
            A: '3',
            username: 'wx346xcs',
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: token,
          },
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>

* {
  font-family: 'Dongle', sans-serif;
  margin: 0;
  padding: 0;
}

#rangeValue {
  color: #0d0c36;
}

.settings__page {
  min-height: 100vh;
  height: 100%;
  /* background-image: linear-gradient(rgba(4, 22, 54, 0.7), rgba(11, 4, 48, 0.7)),
    url('~/assets/images/backgrounds/fleeting-colors.jpg'); 
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed; */
}

.landing {
  width: 100%;
  /* height: calc(100vh - 9.5rem); */
}

.btn {
  height: 4.5rem;
  width: 11rem;
  font-size: 3rem;
  margin-left: auto;
  color: #f0f1ff;
  background-color: #6847dd;
  border-radius: 12px;
  cursor: url('~/assets/images/cursor/paimonCursor4.png'), auto;
  transition: all 300ms;
}

.btn:hover {
  transform: translate(0, -7%);
  background: #c850cc;
}

.btn:active {
  transform: scale(.8);
  background: #14127c;

}

.video-bg {
  position: absolute;
  width: 100%;
  height: calc(100vh - 9.5rem);
  object-fit: cover;
  object-position: 50% 25%;
  z-index: -1;
}

/* setting styles */

#settings__title {
  font-size: 7.5rem;
  font-weight: 500;
  line-height: 4rem;
  text-shadow: 4px 4px 6px rgba(0, 0, 0, 0.8);
}

#sounds__title {
  font-size: 4.5rem;
  font-weight: 400;
  text-shadow: 4px 4px 6px rgba(0, 0, 0, 0.8);
}

#sounds__subTitle {
  font-size: 2.5rem;
  font-weight: 400;
  font-style: italic;
  text-shadow: 4px 4px 6px rgba(0, 0, 0, 0.8);
}

.settings__container {
  display: grid;
  gap: 3rem;
  /* align-content: center;
  justify-content: center; */
  place-content: center;
  padding: 10.5rem;
}

.settings__form {
  max-width: 90vw;
  /* display: grid; */
  gap: 3rem 6rem;
  --repeat: auto-fit;
  grid-template-columns: repeat(auto-fit, minmax(min(10ch, 100%), 35ch));
  align-items: flex-start;
}

.settings__section {
  display: grid;
  gap: 1.5rem;
}

.settings__field {
  width: 45rem;
  height: 47.5rem;
  border: 1px solid #b3b3da;
  background: #b3b3da;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 1px;
  border-radius: 1rem;
  overflow: hidden;
  transition: box-shadow 0.3s ease;
}

.fieldset-item {
  background: #ecedff;
  display: grid;
  grid-template-columns: 2rem 1fr;
  gap: 1.75rem;
  padding: 1.5rem 2rem 1.5rem 1.5rem;
}

.fieldset-item > picture {
  -webkit-clip-path: circle(40%);
  clip-path: circle(40%);
  display: inline-grid;
  align-content: center;
  justify-content: center;
  place-content: center;
  background: #ecedff fixed;
}

.fieldset-item svg {
  fill: #283394;
  height: 3.75rem;
  padding-right: 3.5rem;
}

.fieldset-item > :is(.input-stack, label) {
  display: grid;
  gap: 0.5rem;
}

.fieldset-item > .input-stack > label {
  display: contents;
  font-style: italic;
  font-size: 2.75rem;
  color: #000;
  text-shadow: 2px 4px 1px rgba(255, 255, 255, 0.8);
}

input[type='range'] {
  --track-height: 0.5ex;
  --track-fill: 0%;
  --thumb-size: 3ex;
  --thumb-offset: -1.25ex;
  --thumb-highlight-size: 0px;
  display: block;
  width: 100%;
  margin: 1ex 0;
  outline-offset: 5px;
  cursor: url('~/assets/images/cursor/paimonCursor4.png'), auto;
}

.ryanisgoodatvideogames {
  height: 10rem;
  color: black;
  font-size: 5rem;
}
</style>
