<template>
  <div
    class="night-market-card"
    :class="{ flipped: flipCard }"
    @click="flipCard = true"
  >
    <div class="val-bg" :class="cardBg"></div>
    <div class="card-front">
      <p>
        {{ activeCharacter.title }}
      </p>
      <img :src="activeCharacter.image_url" alt="" />
      <img
        src="`../assets/images/night-market-${cardBg}-rim.png`"
        alt=""
        class="card-rim"
      />
    </div>
  </div>
</template>

<script>
import characters from '~/static/characters.json';

export default {
  data() {
    return {
      cardRarity: null,
      cardBg: null,
      flipCard: false,
      characters,
      charasBest: {},
      charasGreat: {},
      charasGood: {},
      charasBad: {},
      activeArray: {},
      activeCharacter: {},
    };
  },
  created() {
    this.chooseBg();
    this.loadCharacters();
    this.chooseCharacter();
  },
  methods: {
    chooseBg() {
      let cardRarity = 0;
      let cardBg = null;

      const bgNum = Math.floor(Math.random() * 10);

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
      /* switch statement */
      this.cardRarity = cardRarity;
      this.cardBg = cardBg;
    },
    loadCharacters() {
      const characters = this.characters;
      const charactersBest = characters.slice(0, 200);
      const charactersGreat = characters.slice(200, 400);
      const charactersGood = characters.slice(400, 600);
      const charactersBad = characters.slice(600, 1000);

      this.charasBest = charactersBest;
      this.charasGreat = charactersGreat;
      this.charasGood = charactersGood;
      this.charasBad = charactersBad;
    },
    chooseCharacter() {
      const cardRarity = this.cardRarity;
      if (cardRarity === 1) {
        this.activeArray = this.charasBad;
      }
      if (cardRarity === 2 || cardRarity === 3) {
        this.activeArray = this.charasGood;
      }
      if (cardRarity === 4) {
        this.activeArray = this.charasGreat;
      }
      if (cardRarity === 5) {
        this.activeArray = this.charasBest;
      }

      const activeArray = this.activeArray;
      const charaNumber = Math.floor(Math.random() * activeArray.length);
      this.activeCharacter = activeArray[charaNumber];
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
.card-rim {
  z-index: 99;
  height: 40rem;
  width: 30rem;
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
