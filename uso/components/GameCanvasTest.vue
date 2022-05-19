<template>
  <div id="canvas__container" :style="{ width: canvasWidth + 'px' }">
    <canvas id="game__canvas" :style="{ width: canvasWidth + 'px' }">
      Canvas is not supported on your browser.
    </canvas>

    <div id="game__hitCombo__container" :style="{ width: canvasWidth + 'px' }">
      <h1
        id="game__combo"
        :key="comboVKey"
        :class="{ game__combo__on: comboOn, game__combo__reset: comboReset }"
      >
        {{ combo ? combo : missedCombo ? missedCombo : null }}
      </h1>
      <h1
        id="game__hitValue"
        :key="hitValueVKey"
        class="game__hitValue__on"
        :style="lastestHitStyle"
      >
        {{ displayedLatestHit }}
      </h1>
    </div>

    <div id="game__hp-bar__container">
      <div id="game__hp-bar" :style="{ height: health + '%' }"></div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */

export default {
  props: {
    beatmapData: {
      required: true,
      type: Object,
    },
    paused: {
      required: true,
      type: Boolean,
    },
    beatmapIntro: {
      required: true,
    },
  },
  data() {
    return {
      loaded: {
        keydrown: false,
      },
      areAllLoaded: false,
      started: false,

      // beatmaps data
      notes: [],

      score: 0,
      combo: 0,
      maxCombo: 0,
      scrollSpeed: 20,
      latestHit: null,
      totalHits: {
        320: 0,
        300: 0,
        200: 0,
        100: 0,
        50: 0,
        0: 0,
      },

      hitBonusValue: null,
      bonus: 100,

      missedCombo: 0,
      comboOn: false,
      comboReset: false,

      comboVKey: 0,
      hitValueVKey: 1,

      hitJudgement: {
        320: null,
        300: null,
        200: null,
        100: null,
        50: null,
        0: null,
      },

      allKeys: ['A', 'S', 'D', 'F', 'SPACE', 'H', 'J', 'K', 'L'],
      keys: [],
      allColors: ['#E1D5E7', '#DAE8FC', '#f7a5cf', '#FFE6CC', '#F8CECC'],
      // allColors: ['#E1D5E7', '#DAE8FC', '#C8FFE4', '#FFE6CC', '#F8CECC'],
      colors: [],
      /* circleColors: ['#dddcdc', '#f7a5cf', '#f7a5cf', '#dddcdc'], */

      numColumns: null,
      columnWidth: 100, // in px (we change this to rem later)
      canvasWidth: null,

      PIXIapp: null,
      PIXIticker: null,

      stage: null,
      stageWidth: null,
      stageColWidth: null,
      stageHeight: null,
      stageFPS: 60,
      // Stands for stageSetup
      ss: {
        setupContainer: null,
        columnContainers: [],
        columnBorders: [],
        targetCircles: [],
        targetCirclesGraphics: [],
      },
      notesToFallArray: [],
      remainingNotes: null,
      readyNotes: [],
      readySliders: [],

      hitPercent: 0.85,
      radius: 40,

      noteHitSound: null,
      music: null,
      songDuration: 0,
      volume: 0.1,
      pbVolProgress: 1,
      scale: 0,
      opacity: 1,
      pbdur: null,
      progressBarVol: null,
      health: 100,
    };
  },

  head() {
    return {
      script: [
        {
          src: '/lib/keydrown.min.js',
          callback: () => (this.loaded.keydrown = true),
        },
      ],
    };
  },

  computed: {
    dy() {
      return (
        (this.scrollSpeed * 1000 * this.stageHeight) /
        (this.stageFPS * (6860 * this.hitPercent + 6860))
      );
    },
    displayedLatestHit() {
      switch (this.latestHit) {
        case 320:
          return 300;
        case 0:
          return 'MISS';
        default:
          return this.latestHit;
      }
    },
    lastestHitStyle() {
      let color = null;
      switch (this.latestHit) {
        case 320:
          return {
            background:
              'linear-gradient(to top, red 32%, orange, yellow, green, blue, indigo 75%)',
            'background-clip': 'text',
            '-webkit-background-clip': 'text',
            '-webkit-text-fill-color': 'transparent',
          };
        case 300:
          color = '#f7d040';
          break;
        case 200:
          color = '#66c010';
          break;
        case 100:
          color = '#1151a7';
          break;
        case 50:
          color = '#6d747e';
          break;
        case 0:
          color = '#bf342f';
          break;
      }

      return { color };
    },
    accuracy() {
      const total = this.totalHits;
      const accuracy =
        (total['0'] * 0 +
          total['50'] * 50 +
          total['100'] * 100 +
          total['200'] * 200 +
          total['300'] * 300 +
          total['320'] * 300) /
        ((total['0'] +
          total['50'] +
          total['100'] +
          total['200'] +
          total['300'] +
          total['320']) *
          300);
      return isNaN(accuracy) ? 1 : accuracy;
    },
  },

  watch: {
    loaded: {
      handler() {
        // If ANY of the boolean values read false, the all scripts are NOT loaded.
        // If NO boolean values read false, then all scripts are loaded.
        if (!Object.values(this.loaded).some((bool) => !bool)) this.onLoad();
      },
      deep: true,
    },
    totalHits: {
      handler() {
        this.$emit('updateStats', this.score, this.accuracy);
      },
      deep: true,
    },
    remainingNotes(newValue) {
      if (newValue === 0) {
        if (this.combo > this.maxCombo) this.maxCombo = this.combo;
        setTimeout(() => {
          this.$emit('endGameParent', this.totalHits, this.maxCombo);
        }, 1000);
      }
    },
  },

  methods: {
    onLoad() {
      const t = this;

      t.notes = t.beatmapData.hitObjects;
      t.remainingNotes = t.notes.length;
      t.numColumns = t.beatmapData.columns;

      window.addEventListener('wheel', this.onScroll);

      t.keys = [
        ...t.allKeys.slice(-(Math.floor(t.numColumns / 2) + 5), -5),
        ...(t.numColumns % 2 ? [t.allKeys[4]] : []),
        ...t.allKeys.slice(5, Math.floor(t.numColumns / 2) + 5),
      ];

      t.colors = [
        ...t.allColors.slice(-(Math.floor(t.numColumns / 2) + 2), -2),
        ...(t.numColumns % 2 ? [t.allColors[4]] : []),
        ...t.allColors.slice(-(Math.floor(t.numColumns / 2) + 2), -2).reverse(),
      ];

      t.music = new Howl({
        src: [
          `/beatmaps/${this.beatmapData.metadata.BeatmapSetID}/${this.beatmapData.general.AudioFilename}`,
        ],
        volume: this.volume,
        preload: 'metadata',
        onload: () => (this.songLoaded = true),
      });

      t.music.seek(t.beatmapIntro / 1000);

      t.defaultHitNormal = new Howl({
        src: [`/beatmaps/defaultHitSound/normal-hitnormal.wav`],
        volume: t.volume,
        onload: () => (t.songLoaded = true),
      });
      t.defaultHitClapNormal = new Howl({
        src: [`/beatmaps/defaultHitSound/normal-hitclap.wav`],
        volume: t.volume,
        onload: () => (t.songLoaded = true),
      });
      t.defaultHitSoftNormal = new Howl({
        src: [`/beatmaps/defaultHitSound/soft-hitnormal.wav`],
        volume: 0.3,
        onload: () => (t.songLoaded = true),
      });
      t.defaultHitSoftClapNormal = new Howl({
        src: [`/beatmaps/defaultHitSound/soft-hitclap.wav`],
        volume: 0.08,
        onload: () => (t.songLoaded = true),
      });
      t.softSliderWhistle = new Howl({
        src: [`/beatmaps/defaultHitSound/soft-sliderwhistle.wav`],
        volume: 0.1,
        onload: () => (t.songLoaded = true),
      });

      /* ===============
          CANVAS SETUP
          =============== */

      const $canvas = document.querySelector('#game__canvas');

      t.canvasWidth = t.numColumns * t.columnWidth;

      // Sets the canvas width/height pixels = to canvas display size width/height
      t.stageWidth = $canvas.width = t.canvasWidth;
      t.stageHeight = $canvas.getBoundingClientRect().height;
      t.stageColWidth = t.stageWidth / t.numColumns;

      t.PIXIapp = new PIXI.Application({
        width: t.stageWidth,
        height: t.stageHeight,
        view: $canvas,
        backgroundColor: 0x181818,
      });

      /* ===============
          TICKER
          =============== */

      // prettier-ignore
      t.PIXIticker = new PIXI.Ticker.shared; // prettier OMEGALUL
      t.PIXIticker.autoStart = false;
      t.PIXIticker.stop();
    },
    startGame() {},
    onPauseKey(isPaused) {
      if (isPaused) {
        this.notesToFallArray.forEach((note) => note.pauseTimer());
        // createjs.Ticker.paused = true;
        this.music.pause();
      } else {
        this.notesToFallArray.forEach((note) => note.resumeTimer());
        // createjs.Ticker.paused = false;
        this.music.play();
      }
    },
    clamp(value, min, max) {
      return value > max ? max : value < min ? min : value;
    },
  },
};
</script>

<style scoped>
#canvas__container {
  height: 100%;

  display: flex;
  flex-direction: column-reverse;
}

#canvas__container > * {
  position: absolute;
  height: 100%;
}

#game__canvas {
  /* background-color: #181818; */
}

#game__hitCombo__container {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  color: #fff;
}

#game__hitCombo__container > h1 {
  line-height: 1;
  height: 10rem;
}

#game__combo {
  font-size: 9rem;
  font-weight: 400;
}

.game__combo__on {
  animation: comboOnAnimation 0.15s linear forwards;
}

@keyframes comboOnAnimation {
  50% {
    transform: scale(1.2);
  }

  100% {
    transform: scale(1);
  }
}

.game__combo__reset {
  animation: comboResetAnimation 0.2s ease-in forwards;
}

@keyframes comboResetAnimation {
  50% {
    opacity: 0.5;
  }

  100% {
    opacity: 0;
  }
}

#game__hitValue {
  font-size: 14.5rem;
  font-weight: 300;

  opacity: 0;
}

.game__hitValue__on {
  animation: hitValueAnimation 0.25s linear forwards;
}

@keyframes hitValueAnimation {
  8% {
    transform: scale(1.1);
    opacity: 1;
  }

  23% {
    transform: scale(1);
  }

  100% {
    filter: brightness(1.1);
    transform: scale(0.75);
    opacity: 0;
  }
}

#game__hp-bar__container {
  transform: rotate(180deg);
  height: 40rem;
  width: 2rem;

  position: relative;
  left: calc(100% + 1rem);
  bottom: 1rem;

  padding: 0.4rem;
  border-radius: 1rem;

  background-color: white;
}

#game__hp-bar {
  height: 0%;

  transition: height 0.15s linear;

  background-color: #8bff95;
  border-radius: 0.5rem;
  box-shadow: inset -0.1rem -0.1rem 1rem rgb(0 0 0 / 0.5);
}
</style>
