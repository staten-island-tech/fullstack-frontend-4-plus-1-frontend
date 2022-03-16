<template>
  <div
    class="night-market-card"
    :class="{ flipped: flipCard }"
    @click="flipCard = true"
  >
    <div class="val-bg" :class="cardBg"></div>
    <div class="card-front">
      <p v-for="character in charactersList" :key="character">
        {{ character.title }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cardRarity: null,
      cardBg: null,
      flipCard: false,
      charactersList: {},
    };
  },
  created() {
    this.chooseBg();
    this.fetchData();
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
    async fetchData() {
      try {
        const response = await fetch(
          'https://api.jikan.moe/v3/top/characters/1'
        );

        const data = await response.json();
        this.charactersList = data.top;
      } catch (error) {
        console.log(error);
        alert('Error');
      }
    },
    /* getCharacters () {
async function  () {
    try {
fetch('https://api.jikan.moe/v3/top/characters/1')
    } catch (error) {
        console.log(error)
    }
}
    }, */
    /* flipCard() {
      document.querySelector('.night-market-card').style.transform =
        'rotateY(180deg)';
    }, */
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

.flipped {
  transform: rotateY(180deg);
  transition: 0.8s ease-in-out;
  /*   animation-name: cardFlip;
  animation-duration: 1s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards; */
}

/* @keyframes cardFlip {
  10% {
  }
  20% {
    transform: rotateY(20deg);
  }
  30% {
    transform: rotateY(30deg);
  }
  40% {
    transform: rotateY(40deg);
  }
  50% {
    transform: rotateY(50deg);
  }
  60% {
    transform: rotateY(80deg);
  }
  70% {
    transform: rotateY(100deg);
  }
  80% {
    transform: rotateY(130deg);
  }
  90% {
    transform: rotateY(160deg);
  }
  100% {
    transform: rotateY(180deg);
  
}*/
</style>
