<template>
  <div class="night-market-card">
    <button @click="chooseBg">Random Bg</button>
  </div>
</template>

<script>
export default {
  methods: {
    chooseBg() {
      let cardRarity = 0;
      const bgNum = Math.floor(Math.random() * 10);
      console.log(bgNum);

      if (bgNum >= 0 && bgNum < 5) {
        cardRarity = 1;
      }
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
