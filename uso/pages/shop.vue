<template>
  <div class="shop-page">
    <div class="under-nav"></div>
    <div class="wish__container">
      <div class="wishCards">
        <!-- <video
            id="wish-background"
            class="video-bg"
            autoplay
            muted
            loop
            playsinline
            disablePictureInPicture
            src="../assets/images/backgrounds/wish-background.mp4"
            type="video/mp4"
          ></video> -->
        <section class="data-bar">
          <h1 class="shop-heading">
            what does freedom really mean, when demanded of you by a god...?
          </h1>
          <!--  <p class="primogem-balance">{{ primogemBalance }}</p> -->
        </section>
        <section class="night-market">
          <div class="night-market-card-container">
            <night-market-card :load-roll="loadRoll" />
            <night-market-card :load-roll="loadRoll" />
            <night-market-card :load-roll="loadRoll" />
            <night-market-card :load-roll="loadRoll" />
            <night-market-card :load-roll="loadRoll" />
          </div>
          <button class="roll-button" @click="pressRoll()">wish!</button>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import NightMarketCard from '../components/NightMarketCard.vue';
export default {
  components: { NightMarketCard },
  data() {
    return {
      loadRoll: false,
      primogemBalance: 1600,
      /* skins: [
        {
          id: 1,
          name: 'Ganyu',
          rarity: 5,
          price: 3550,
          url: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pinterest.com%2Fpin%2F30117891247881979%2F&psig=AOvVaw3C76GQ1PJVbJFFJdn7Q0y4&ust=1647104609560000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCLiF8ZXEvvYCFQAAAAAdAAAAABAD',
        },
        {
          id: 2,
          name: 'Mari Setogaya',
          rarity: 5,
          price: 3550,
          url: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fbr.ifunny.co%2Fuser%2FDaniGaykk&psig=AOvVaw1GBj5GMdrUDu2tQOr3H9EU&ust=1647104673082000&source=images&cd=vfe&ved=0CAgQjRxqFwoTCKibtLrEvvYCFQAAAAAdAAAAABAD',
        },
        {
          id: 3,
          name: 'Average MC',
          rarity: 1,
          price: 875,
          url: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fm.facebook.com%2Fpermalink.php%3Fid%3D101202351522824%26story_fbid%3D180410030268722&psig=AOvVaw1cjyAjW584dPMv_qfG6WRu&ust=1647104808924000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCIia8PbEvvYCFQAAAAAdAAAAABAD',
        },
      ], */
    };
  },
  methods: {
    pressRoll() {
      this.loadRoll = !this.loadRoll;
    },
  },
};
</script>

<style scoped>
#wish-background {
  height: calc(100vh - 9.5rem);
  /* width: 100%; */
  z-index: -2;
  position: absolute;
  bottom: 0;
}

.shop-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.wish__container {
  display: flex;
  flex-direction: column;
  justify-content: center;

  min-height: 90.2vh;
  height: 100%;
  background-image: linear-gradient(
      rgba(20, 14, 54, 0.7),
      rgba(20, 14, 54, 0.7)
    ),
    url('~/assets/images/backgrounds/wishBg.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;

  /* linear-gradient(
      rgba(13, 4, 66, 0.7),
      rgba(16, 51, 112, 0.8)
    ), */
}

.wishCards {
  padding: 0 0 8.5rem 0;
}

.data-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: center;
  /* width: 70%; */
}

.data-bar > p {
  font-size: 4rem;
}

.shop-heading {
  align-self: center;
  margin: 3rem auto 0 auto;
  font-weight: 400;
  font-size: 6.5rem;
}

.primogem-balance {
  position: absolute;
  right: 16%;
}

.night-market {
  display: flex;
  flex-direction: column;
  /*  justify-content: center; */
  align-items: center;
}

.night-market-card-container {
  margin: 3rem auto;
  width: 85vw;
  /*   height: 80vh; */
  padding: 0 10rem;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.roll-button {
  font-size: 4rem;
  width: 15rem;
  height: 6rem;
  line-height: 28px;
  background: rgb(23, 23, 107);
  padding: 1rem 2rem 0.5rem 2rem;
  border-radius: 1rem;
  margin: 2rem;
  transition: all 200ms ease-in-out;
  cursor: url('~/assets/images/cursor/paimonCursor4.png'), auto;
}

.roll-button:hover {
  background: rgb(101, 101, 236);
  transform: scale(1.05);
}

.roll-button:active {
  background: rgb(177, 236, 238);
  color: rgb(23, 23, 107);
  transform: scale(0.85);
}

@media screen and (max-width: 1700px) {
  .night-market-card-container {
    width: 100%;
  }

  .night-market-card {
    height: 35.8rem;
    width: 23.3rem;
  }
}

@media screen and (max-width: 1600px) {
  .night-market-card-container {
    width: 100%;
  }
}

@media screen and (max-width: 1500px) {
  .night-market-card-container {
    width: 100%;
  }

  .night-market-card {
    height: 33.3rem;
    width: 21.8rem;
  }

  .shop-heading {
    font-size: 5.5rem;
  }
}

@media screen and (max-width: 1300px) {
  .night-market-card-container {
    width: 100%;
  }

  .night-market-card {
    height: 30.8rem;
    width: 19.3rem;
  }

  .shop-heading {
    font-size: 4.5rem;
  }
}

/* height: 37.8rem;
    width: 24.3rem; */
</style>
