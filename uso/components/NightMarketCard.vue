<template>
  <div
    class="night-market-card"
    :class="{ flipped: flipCard }"
    @click="flipCard = true"
  >
    <div class="val-bg" :class="cardBg"></div>
    <div class="card-front">
      <div class="card-gradient"></div>
      <p class="chara-name">{{ charaName }}</p>
      <img :src="activeCharacter.image_url" alt="" class="chara-img" />
      <img :src="rimSrc" alt="" class="card-rim" />
    </div>
  </div>
</template>

<script>
import characters from '~/static/characters.json';

export default {
  props: {
    loadRoll: Boolean,
  },
  data() {
    return {
      cardRarity: null,
      cardBg: null,
      flipCard: false,
      characters,
      charasMythical: {},
      charasBest: {},
      charasGreat: {},
      charasGood: {},
      charasBad: {},
      activeArray: {},
      activeCharacter: {},
      charaName: {},
    };
  },

  computed: {
    rimSrc() {
      return require(`../assets/images/night-market-${this.cardBg}-rim.png`);

      /* /_nuxt/assets/images/night-market-bad-rim.png */
      /* ../assets/images/night-market-bad-rim.png */
    },
  },
  watch: {
    loadRoll(loadRoll) {
      this.flipCard = false;
      setTimeout(() => {
        this.getRoll();
      }, 800);
    },
  },
  created() {
    this.getRoll();
  },

  methods: {
    chooseBg() {
      let cardRarity = 0;
      let cardBg = null;

      const bgNum = Math.floor(Math.random() * 100);

      if (bgNum >= 0 && bgNum < 40) {
        cardRarity = 1;
        cardBg = 'bad';
      }
      if (bgNum >= 40 && bgNum < 60) {
        cardRarity = 2;
        cardBg = 'ok';
      }
      if (bgNum >= 60 && bgNum < 80) {
        cardRarity = 3;
        cardBg = 'ok';
      }
      if (bgNum >= 80 && bgNum < 90) {
        cardRarity = 4;
        cardBg = 'good';
      }
      if (bgNum >= 90 && bgNum < 99) {
        cardRarity = 5;
        cardBg = 'great';
      }
      if (bgNum === 99) {
        cardRarity = 6;
        cardBg = 'great';
      }
      /* switch statement */
      this.cardRarity = cardRarity;
      this.cardBg = cardBg;
    },
    loadCharacters() {
      const characters = this.characters;
      const charactersMythical = characters.slice(0, 1);
      const charactersBest = characters.slice(1, 201);
      const charactersGreat = characters.slice(201, 401);
      const charactersGood = characters.slice(401, 601);
      const charactersBad = characters.slice(601, 1001);

      this.charasMythical = charactersMythical;
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
      if (cardRarity === 6) {
        this.activeArray = this.charasMythical;
      }

      const activeArray = this.activeArray;
      const charaNumber = Math.floor(Math.random() * activeArray.length);
      this.activeCharacter = activeArray[charaNumber];
    },
    getCharaName() {
      if (this.activeCharacter.title.includes(',')) {
        const charaName = this.activeCharacter.title.split(', ');
        this.charaName = charaName[1] + ' ' + charaName[0];
      } else {
        this.charaName = this.activeCharacter.title;
      }
    },
    getRoll() {
      this.chooseBg();
      this.loadCharacters();
      this.chooseCharacter();
      this.getCharaName();
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
  height: 37.8rem;
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
.val-bg {
  background-size: 99.4% 99.8%;
}
.val-bg:hover {
  opacity: 0.97;
}

.card-front {
  transform: rotateY(180deg);
  background-color: #171717;
}
.card-gradient {
  position: absolute;
  height: 100%;
  width: 100%;
  background: linear-gradient(
    360deg,
    #000000 0%,
    rgba(0, 0, 0, 0.491594) 24.73%,
    rgba(0, 0, 0, 0) 100%
  );
}
.chara-name {
  position: absolute;
  bottom: 0%;
  font-size: 4rem;
  padding: 1rem 1.4rem;
}
.chara-img {
  width: 100%;
  height: 100%;
  z-index: -1;
}
.card-rim {
  z-index: 99;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0%;
  left: 0%;
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
