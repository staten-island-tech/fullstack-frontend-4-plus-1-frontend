<template>
  <div>
    <div class="under-nav"></div>
    <h1>Shop</h1>
    <section class="night-market">
      <div class="night-market-card-container">
        <night-market-card :load-roll="loadRoll" />
        <night-market-card :load-roll="loadRoll" />
        <night-market-card :load-roll="loadRoll" />
        <night-market-card :load-roll="loadRoll" />
        <night-market-card :load-roll="loadRoll" />
      </div>
      <button class="roll-button" @click="pressRoll()">Wish</button>
    </section>
  </div>
</template>

<script>
import NightMarketCard from '../components/NightMarketCard.vue';
export default {
  components: { NightMarketCard },
  data() {
    return {
      loadRoll: false,
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
.night-market {
  display: flex;
  flex-direction: column;
  /*  justify-content: center; */
  align-items: center;
}

.night-market-card-container {
  margin: 3rem auto;
  width: 80%;
  /*   height: 80vh; */
  padding: 0 10rem;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.roll-button {
  font-size: 4rem;
  line-height: 28px;
  background: red;
  padding: 1rem 2rem 0.5rem 2rem;
  border-radius: 1rem;
  margin: 2rem;
}
.roll-button:hover {
  background: rgb(240, 0, 0);
}
.roll-button:active {
  background: rgb(160, 0, 0);
  color: rgb(223, 223, 223);
}
</style>
