<template>
  <div id="game-index">
    <div class="game-image-container">
      <img
        :src="`/beatmaps/${$store.state.beatmapData.metadata.BeatmapSetID}/${$store.state.beatmapData.events[0][2]}`"
      />
    </div>
    <button
      v-if="areAllLoaded && !started && songLoaded"
      class="game-start-button"
      @click="init"
    >
      START
    </button>
    <div
      class="canvas-container"
      :style="{ width: canvasWidth + 'px', height: canvasHeight + 'px' }"
    >
      <canvas
        id="canvas"
        :style="{ width: canvasWidth + 'px', height: canvasHeight + 'px' }"
        >Canvas is not supported on your browser.</canvas
      >
    </div>
    <div class="statistics-container">
      <h1>{{ Math.floor(score) }}</h1>
      <h1>x{{ combo }}</h1>
      <h1>
        {{ accuracy ? `${Math.round(accuracy * 10000) / 100}%` : '100%' }}
      </h1>
      <h1 :style="lastestHitStyle">{{ displayedLatestHit }}</h1>
    </div>
    <div class="progress-bar-container">
      <div id="myProgress">
        <div id="myBar"></div>
      </div>
    </div>
  </div>
</template>

<script>
/* global createjs:false, Howl:false */
/* eslint-disable */

export default {
  layout: 'noNav',

  data() {
    return {
      loaded: {
        createjs: false,
        keydrown: false,
        howler: false,
      },
      areAllLoaded: false,
      started: false,
      songLoaded: false,

      score: 0,
      combo: 0,
      scrollSpeed: 15,
      latestHit: null,
      totalHits: {
        0: 0,
        50: 0,
        100: 0,
        200: 0,
        300: 0,
        320: 0,
      },
      hitBonusValue: null,
      bonus: 100,

      keys: ['d', 'f', 'j', 'k'],

      numColumns: 4,
      columnWidth: 100, // in px (we change this to rem later)
      canvasHeight: 700, // in px (we change this to rem later)

      circleColors: ['#FFE6CC', '#E1D5E7', '#DAE8FC', '#F8CECC'],
      /* circleColors: ['#dddcdc', '#f7a5cf', '#f7a5cf', '#dddcdc'], */
      radius: 40,

      stage: null,
      stageWidth: null,
      stageColWidth: null,
      stageHeight: null,
      stageFPS: 60,
      music: null,

      columnContainers: [],
      loader: null,
      targetCircles: [],
      circles: null,
      firstVal: 0,
      beatmapData: {},
      notes: [],
      beatmapIntro: 23597,
      syncOffset: 0,
      oneButtonClick: true,
    };
  },

  head() {
    return {
      script: [
        {
          src: '/lib/createjs.min.js',
          callback: () => (this.loaded.createjs = true),
        },
        {
          src: '/lib/keydrown.min.js',
          callback: () => (this.loaded.keydrown = true),
        },
        {
          src: '/lib/howler.min.js',
          callback: () => (this.loaded.howler = true),
        },
      ],
    };
  },

  computed: {
    canvasWidth() {
      return this.numColumns * this.columnWidth;
    },
    dy() {
      return (
        (this.scrollSpeed * 1000 * this.canvasHeight) /
        (this.stageFPS * (6860 * (650 / 700) + 6860))
      );
    },
    displayedLatestHit() {
      switch (this.latestHit) {
        case 320:
        case 300:
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
      return { color: color };
    },
    accuracy() {
      const total = this.totalHits;
      const accuracy =
        (total['50'] * 50 +
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
      return isNaN(accuracy) ? null : accuracy;
    },
  },

  watch: {
    loaded: {
      handler(newValue, oldValue) {
        const t = this;

        // If ANY of the boolean values read false, the all scripts are NOT loaded.
        // If NO boolean values read false, then all scritps are loaded.
        t.areAllLoaded = !Object.values(t.loaded).some((bool) => !bool);

        if (t.areAllLoaded) {
          t.beatmapData = t.$store.state.beatmapData;
          t.notes = t.beatmapData.hitObjects;
          t.beatmapIntro = t.notes[0].time < 3000 ? 0 : t.notes[0].time - 3000;

          t.music = new Howl({
            src: [
              `/beatmaps/${t.beatmapData.metadata.BeatmapSetID}/${t.beatmapData.general.AudioFilename}`,
            ],
            volume: 0.1,
            onload: function () {
              t.songLoaded = true;
            },
          });
          t.music.seek(t.beatmapIntro / 1000);
        }
      },
      deep: true,
    },
    $route() {
      // this.music.stop();
      this.console.log('hi');
    },
  },

  mounted() {},

  methods: {
    init() {
      const t = this;

      t.started = true;
      t.music.play();
      t.songDuration = t.music.duration();

      let i = 0;

      /* ===============
          PROGRESS BAR
          =============== */

      const $progressBar = document.getElementById('myBar');

      function progressBar() {
        let bar = 0;
        let id = setInterval(function () {
          bar++;
          $progressBar.style.height = bar + '%';
          if (bar >= 100) {
            clearInterval(id);
          }
        }, (t.songDuration * 1000) / 100);
      }

      progressBar();

      /* ===============
          CANVAS SETUP
          =============== */

      const $canvas = document.querySelector('#canvas');

      // Sets the canvas width/height pixels = to canvas display size width/height
      $canvas.width = $canvas.offsetWidth;
      $canvas.height = $canvas.offsetHeight;

      t.stage = new createjs.Stage('canvas');
      t.stageWidth = t.stage.canvas.width;
      t.stageColWidth = t.stageWidth / t.numColumns;
      t.stageHeight = t.stage.canvas.height;

      /* ===============
          TICKER
          =============== */

      // I think we have to add sound when we click the route

      createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
      // Each tick is run 1/60 times per second
      createjs.Ticker.framerate = t.stageFPS;
      // Automatically updates the stage every tick (aka frame)
      createjs.Ticker.addEventListener('tick', t.stage);

      /* ===============
          BACKGROUND
          =============== */

      const background = new createjs.Shape();

      // Draws the gray background on the canvas
      background.graphics
        .beginFill('#D3D3D3')
        .drawRect(0, 0, t.stageWidth, t.stageHeight);

      // "Mounts" the background to the stage
      t.stage.addChild(background);

      /* ===============
          COLUMN CONTAINER
          =============== */

      for (let i = 0; i < t.numColumns; i++) {
        // Creates a new column container for each column
        t.columnContainers.push(new createjs.Container());

        // Sets the x-offset for each container based off the column index and column width
        t.columnContainers[i].x = i * t.columnWidth;

        // "Mounts" the container to the stage
        t.stage.addChild(t.columnContainers[i]);
      }

      /* ===============
          COLUMN BORDERS
          =============== */

      // Creates a graphic which is then used as a template for the shape (which we mount onto the canvas)
      const borderGraphic = new createjs.Graphics()
        .beginStroke('Black')
        .drawRect(0, 0, t.stageColWidth, t.stageHeight);

      t.columnContainers.forEach((container) => {
        const columnBorder = new createjs.Shape(borderGraphic);

        // Adds the child to the specific container which automatically "mounts" the border lines to the stage because the columnContainer was already "mounted"
        container.addChild(columnBorder);
      });

      /* ===============
          TARGET CIRCLES
          =============== */

      const circleGraphic = new createjs.Graphics()
        .beginStroke('Black')
        .beginFill('Gray')
        .drawCircle(50, t.stageHeight - 50, t.radius);

      t.columnContainers.forEach((container) => {
        const targetCircle = new createjs.Shape(circleGraphic);

        t.targetCircles.push(targetCircle);

        container.addChild(targetCircle);
      });

      /* ===============
            KEY PRESSES
          =============== */

      /* kd.D.down(function () {
        t.columnContainers[0].children.forEach((circle) => {
          const diffFromTargetCircle = Math.abs(circle.y - 700);

          if (circle.y >= 610 && circle.name === 'thisSlider') {
            if (t.firstVal === 0) {
              firstValY = diffFromTargetCircle;
              console.log(firstValY);
              t.firstVal = 1;
            }
            if (firstValY >= 0 && firstValY <= 6) {
              scoreMultplier = 300;
            } else if (firstValY >= 6 && firstValY <= 12) {
              scoreMultplier = 200;
            } else if (firstValY >= 12 && firstValY <= 20) {
              scoreMultplier = 100;
            } else if (firstValY >= 20 && firstValY <= 30) {
              scoreMultplier = 50;
            } else {
              scoreMultplier = 1;
            }
          }
        });

        // console.log(circle.y);
      }); */

      /*       kd.D.up(function () {
        t.columnContainers[0].children.forEach((circle) => {
          const diffFromTargetCircle = Math.abs(circle.y - 700);
          if (circle.y >= 610 && circle.name === 'Slider') {
            lastValY = diffFromTargetCircle;

            let sliderCombo = (lastValY - t.firstValY) / 10;
            let sliderScore = sliderCombo * scoreMultplier;
            console.log(sliderScore);
            console.log(sliderCombo);
            console.log(scoreMultplier);
            this.score += Math.round(sliderScore);
            this.combo += Math.round(sliderCombo);
          }
        });

        // console.log(circle.y);
      });

      kd.run(function () {
        kd.tick();
      }); */

      document.addEventListener('keydown', function (e) {
        // KEYPRESSES FOR NOTES: For each column, if the key press is equal to the key associated with that column, loop through each of the circles. If they are past a certain y-value, remove it from the specific container therefore "dismounting" it from the stage.
        for (let i = 0; i < t.numColumns; i++) {
          if (e.key === t.keys[i]) {
            t.columnContainers[i].children.forEach((circle) => {
              const msFromTargetCircle =
                (Math.abs(circle.y - 700) * 1000) / (t.dy * t.stageFPS);
              const OD = t.beatmapData.difficulty.OverallDifficulty;

              if (
                msFromTargetCircle <= Math.floor(170 - 3 * OD) + 0.5 &&
                circle.name === 'thisCircle'
              ) {
                createjs.Tween.removeTweens(circle);
                t.columnContainers[i].removeChild(circle);
                t.combo += 1;

                let hitBonusValue = 0;

                switch (true) {
                  case msFromTargetCircle <= 16.5:
                    t.latestHit = 320;
                    t.totalHits['320']++;
                    hitBonusValue = 32;
                    t.bonus += 2;
                    break;
                  case msFromTargetCircle <= Math.floor(64 - 3 * OD) + 0.5:
                    t.latestHit = 300;
                    t.totalHits['300']++;
                    hitBonusValue = 32;
                    t.bonus += 1;
                    break;
                  case msFromTargetCircle <= Math.floor(97 - 3 * OD) + 0.5:
                    t.latestHit = 200;
                    t.totalHits['200']++;
                    hitBonusValue = 16;
                    t.bonus -= 8;
                    break;
                  case msFromTargetCircle <= Math.floor(127 - 3 * OD) + 0.5:
                    t.latestHit = 100;
                    t.totalHits['100']++;
                    hitBonusValue = 8;
                    t.bonus -= 24;
                    break;
                  case msFromTargetCircle <= Math.floor(151 - 3 * OD) + 0.5:
                    t.latestHit = 50;
                    t.totalHits['50']++;
                    hitBonusValue = 4;
                    t.bonus += 44;
                    break;
                  case msFromTargetCircle <= Math.floor(170 - 3 * OD) + 0.5:
                    t.latestHit = 0;
                    t.totalHits['0']++;
                    t.bonus = 0;

                    t.combo = 0;
                    break;
                }

                if (t.bonus > 100) t.bonus = 100;
                if (t.bonus < 0) t.bonus = 0;

                const baseScore =
                  ((1000000 * 0.5) / t.notes.length) * (t.latestHit / 320);

                const bonusScore =
                  ((1000000 * 0.5) / t.notes.length) *
                  ((hitBonusValue * Math.sqrt(t.bonus)) / 320);

                t.score += bonusScore + baseScore;
              }
            });
          }
        }
      });

      /* ===============
              NOTES
          =============== */

      let sliderHeight;

      t.notes.forEach((note) => {
        sliderHeight = (t.dy * t.stageFPS * (note.endTime - note.time)) / 1000;

        const circleGraphic = new createjs.Graphics()
          .beginStroke('Black')
          .beginFill(t.circleColors[note.columnIndex])
          .drawCircle(50, -t.radius, t.radius);

        const sliderGraphic = new createjs.Graphics()
          .beginStroke('Black')
          .beginFill(t.circleColors[note.columnIndex])
          .drawRoundRectComplex(
            10,
            -(sliderHeight + 2 * t.radius),
            80,
            sliderHeight + 2 * t.radius,
            40,
            40,
            40,
            40
          );

        const thisCircle = new createjs.Shape(circleGraphic);
        const thisSlider = new createjs.Shape(sliderGraphic);

        thisCircle.cache(
          50 - t.radius,
          -2 * t.radius,
          2 * t.radius + 30,
          2 * t.radius + 30
        );

        // thisCircle.cache(0, -85, 120, 120);

        thisCircle.name = 'thisCircle';
        thisSlider.name = 'thisSlider';

        if (note.type === 'note') {
          setTimeout(() => {
            t.columnContainers[note.columnIndex].addChild(thisCircle);

            animateCircle();

            function animateCircle() {
              createjs.Tween.get(thisCircle, {
                useTicks: true,
                onChange: onChange,
                onComplete: animateCircle,
              }).to({ y: thisCircle.y + t.dy }, 1);
            }
            function onChange() {
              // noteType = true;
              // If it reaches offscreen then ...
              if (thisCircle.y > t.canvasHeight + 2 * t.radius) {
                // Remove tweens on the object
                createjs.Tween.removeTweens(thisCircle);

                // Reset combo
                t.latestHit = 0;
                t.totalHits['0']++;
                t.bonus = 0;

                t.combo = 0;

                // Remove circle from stage
                t.columnContainers[note.columnIndex].removeChild(thisCircle);
              }
            }
          }, note.time - t.beatmapIntro + t.syncOffset - (6860 * (650 / 700) + 6860) / t.scrollSpeed);
        } else if (note.type === 'hold') {
          setTimeout(() => {
            t.columnContainers[note.columnIndex].addChild(thisSlider);

            animateSlider();

            function animateSlider() {
              /*
                useTicks: uses update ticks (60 fps) instead of ms
                onChange: runs ths function when the position is changed (thus this function is run every tick)
                onComplete: runs this function when animation is done
              */
              createjs.Tween.get(thisSlider, {
                useTicks: true,
                onChange: onChange,
                onComplete: animateSlider,
              }).to({ y: thisSlider.y + t.dy }, 1);
            }
            function onChange() {
              if (thisSlider.y - sliderHeight > t.canvasHeight + 2 * t.radius) {
                // Remove tweens on the object
                createjs.Tween.removeTweens(thisSlider);

                t.latestHit = 0;
                t.bonus = 0;

                t.combo = 0;

                // Remove circle from stage
                t.columnContainers[note.columnIndex].removeChild(thisSlider);
              }
            }
          }, note.time - t.beatmapIntro + t.syncOffset - (6860 * (650 / 700) + 6860) / t.scrollSpeed);
        } else {
          console.log(`Invalid note type: ${note.type}`);
        }
      });
    },
  },
};
</script>

<style scoped>
#myProgress {
  width: 1vw;
  height: 100vh;
  background-color: #ddd;
}

#myBar {
  transition: all 0.5s ease-in;
  width: 100%;
  height: 0%;
  background-color: #04aa6d;
}
.button {
  height: 20vh;
  width: 20vw;
  background-color: gray;
  font-size: 3rem;
}

#game-index {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}

.game-start-button {
  height: 20vh;
  width: 20vw;
  background-color: gray;
  font-size: 3rem;
}

.game-image-container {
  position: absolute;

  width: 100%;
  height: 100%;
  overflow: hidden;

  opacity: 0.5;

  z-index: -100;
}

.game-image-container > img {
  width: 100%;
}

.statistics-container {
  min-width: 35rem;
  height: 30rem;

  padding: 1rem 2rem;

  background-color: rgba(128, 128, 128, 0.8);

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

.statistics-container > h1 {
  font-size: 7rem;
}
</style>
