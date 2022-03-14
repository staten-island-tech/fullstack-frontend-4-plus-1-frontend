<template>
  <div class="night-market-card" :class="cardRarity">
    <h1>{{ cardRarity }}</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cardRarity: null,
      cardBg: null,
    };
  },
  created() {
    this.chooseBg();
  },
  methods: {
    chooseBg() {
      let cardRarity = 0;

      const bgNum = Math.floor(Math.random() * 10);
      console.log(bgNum);

      if (bgNum >= 0 && bgNum < 4) {
        cardRarity = 1;
      }
      if (bgNum >= 4 && bgNum < 6) {
        cardRarity = 2;
      }
      if (bgNum >= 6 && bgNum < 8) {
        cardRarity = 3;
      }
      if (bgNum >= 8 && bgNum < 9) {
        cardRarity = 4;
      }
      if (bgNum >= 9 && bgNum < 10) {
        cardRarity = 5;
      }

      this.cardRarity = cardRarity;
      this.$forceUpdate();
    },
  },
};
</script>

<style scoped>
button {
  height: 2.8rem;
  font-size: 2.8rem;
}
</style>
