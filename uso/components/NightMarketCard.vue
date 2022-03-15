<template>
  <div class="night-market-card">
    <div class="val-bg" :class="cardBg"></div>
    <div class="card-front">
      <h1>Name</h1>
    </div>
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
      let cardBg = null;

      const bgNum = Math.floor(Math.random() * 10);
      console.log(bgNum);

      if (bgNum >= 0 && bgNum < 4) {
        cardRarity = 1;
        cardBg = 'bad';
      }
      if (bgNum >= 4 && bgNum < 6) {
        cardRarity = 2;
        cardBg = 'ok';
      }
      if (bgNum >= 6 && bgNum < 8) {
        cardRarity = 3;
        cardBg = 'ok';
      }
      if (bgNum >= 8 && bgNum < 9) {
        cardRarity = 4;
        cardBg = 'good';
      }
      if (bgNum >= 9 && bgNum < 10) {
        cardRarity = 5;
        cardBg = 'great';
      }

      this.cardRarity = cardRarity;
      this.cardBg = cardBg;
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

.bad {
  background-image: url('./assets/images/night-market-bad.png');
}
.ok {
  background-image: url('./assets/images/night-market-ok.png');
}
.good {
  background-image: url('./assets/images/night-market-good.png');
}
.great {
  background-image: url('./assets/images/night-market-great.png');
}

.night-market-card {
  height: 36.3rem;
  width: 24.3rem;
  background: white;

  position: relative;
  transition: transform 0.8s ease-out;
  transform-style: preserve-3d;
}
.night-market-card:active {
  transform: rotateY(180deg);
}

.card-front,
.val-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden; /* Safari */
  backface-visibility: hidden;
}
.val-bg:hover {
  opacity: 0.97;
}

.card-front {
  transform: rotateY(180deg);
  background-color: #171717;
}
</style>
