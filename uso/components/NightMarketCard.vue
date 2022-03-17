<template>
  <div
    class="night-market-card"
    :class="{ flipped: flipCard }"
    @click="flipCard = true"
  >
    <div class="val-bg" :class="cardBg"></div>
    <div class="card-front">
      <p v-for="character in charasBest" :key="character">
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
      charasBest: {},
      charasGreat: {},
      charasGood: {},
      charasBad: {},
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
        const response50 = await fetch(
          'https://api.jikan.moe/v3/top/characters/1'
        );
        const response100 = await fetch(
          'https://api.jikan.moe/v3/top/characters/2'
        );
        const response150 = await fetch(
          'https://api.jikan.moe/v3/top/characters/3'
        );
        const response200 = await fetch(
          'https://api.jikan.moe/v3/top/characters/4'
        );
        const response250 = await fetch(
          'https://api.jikan.moe/v3/top/characters/5'
        );
        const response300 = await fetch(
          'https://api.jikan.moe/v3/top/characters/6'
        );
        const response350 = await fetch(
          'https://api.jikan.moe/v3/top/characters/7'
        );
        const response400 = await fetch(
          'https://api.jikan.moe/v3/top/characters/8'
        );
        const response450 = await fetch(
          'https://api.jikan.moe/v3/top/characters/9'
        );
        const response500 = await fetch(
          'https://api.jikan.moe/v3/top/characters/10'
        ); /*
        const response550 = await fetch(
          'https://api.jikan.moe/v3/top/characters/11'
        );
        const response600 = await fetch(
          'https://api.jikan.moe/v3/top/characters/12'
        );
        const response650 = await fetch(
          'https://api.jikan.moe/v3/top/characters/13'
        );
        const response700 = await fetch(
          'https://api.jikan.moe/v3/top/characters/14'
        );
        const response750 = await fetch(
          'https://api.jikan.moe/v3/top/characters/15'
        );
        const response800 = await fetch(
          'https://api.jikan.moe/v3/top/characters/16'
        );
        const response850 = await fetch(
          'https://api.jikan.moe/v3/top/characters/17'
        );
        const response900 = await fetch(
          'https://api.jikan.moe/v3/top/characters/18'
        );
        const response950 = await fetch(
          'https://api.jikan.moe/v3/top/characters/19'
        );
        const response1000 = await fetch(
          'https://api.jikan.moe/v3/top/characters/20'
        ); */

        const data50 = await response50.json();
        const data100 = await response100.json();
        const data150 = await response150.json();
        const data200 = await response200.json();
        const data250 = await response250.json();
        const data300 = await response300.json();
        const data350 = await response350.json();
        const data400 = await response400.json();
        const data450 = await response450.json();
        const data500 = await response500.json();
        /* const data550 = await response550.json();
        const data600 = await response600.json();
        const data650 = await response650.json();
        const data700 = await response700.json();
        const data750 = await response750.json();
        const data800 = await response800.json();
        const data850 = await response850.json();
        const data900 = await response900.json();
        const data950 = await response950.json();
        const data1000 = await response1000.json(); */

        this.charasBest = data50.top.concat(data100.top);
        this.charasGreat = data150.concat(data200);
        this.charasGood = data250.concat(
          data300,
          data350,
          data400,
          data450,
          data500
        ); /* 
        this.charasBad = data550.concat(
          data600,
          data650,
          data700,
          data750,
          data800,
          data850,
          data900,
          data950,
          data1000
        ); */
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
