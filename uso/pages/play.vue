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
    <div class="canvas-container" :style="{ width: canvasWidth + 'px' }">
      <canvas id="canvas" :style="{ width: canvasWidth + 'px' }"
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
  layout: 'nonav',

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
      scrollSpeed: 10,
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

      hitJudgement: {
        320: null,
        300: null,
        200: null,
        100: null,
        50: null,
        0: null,
      },

      keys: ['d', 'f', 'j', 'k'],
      circleColors: ['#FFE6CC', '#E1D5E7', '#DAE8FC', '#F8CECC'],
      /* circleColors: ['#dddcdc', '#f7a5cf', '#f7a5cf', '#dddcdc'], */

      numColumns: 4,
      columnWidth: 100, // in px (we change this to rem later)
      hitPercent: 0.8,
      radius: 40,

      stage: null,
      stageWidth: null,
      stageColWidth: null,
      stageHeight: null,
      stageFPS: 60,
      music: null,
      beatmapIntro: null,

      // Stands for stageSetup
      ss: {
        setupContainer: null,
        columnContainers: [],
        columnBorders: [],
        targetCircles: [],
      },
      beatmapData: {},
      notes: [],
      readyNotes: [],
      readyHolds: [],
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
        (this.scrollSpeed * 1000 * this.stageHeight) /
        (this.stageFPS * (6860 * this.hitPercent + 6860))
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
        if (!Object.values(t.loaded).some((bool) => !bool)) {
          t.beatmapData = t.$store.state.beatmapData;
          t.notes = t.beatmapData.hitObjects;
          t.beatmapIntro = t.notes[0].time < 2000 ? 0 : t.notes[0].time - 2000;

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

          /* ===============
              PROGRESS BAR
              =============== */

          const $progressBar = document.getElementById('myBar');
          t.songDuration = t.music.duration();

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
              SETUP CONTAINER & BACKGROUND
              =============== */

          t.ss.setupContainer = new createjs.Container();
          t.ss.setupContainer.name = 'setupContainer';

          t.stage.addChild(t.ss.setupContainer);
          t.stage.setChildIndex(t.ss.setupContainer, 0);

          const background = new createjs.Shape();

          // Draws the gray background on the canvas
          background.graphics
            .beginFill('#D3D3D3')
            .drawRect(0, 0, t.stageWidth, t.stageHeight);

          background.name = 'background';

          t.ss.setupContainer.addChild(background);

          /* ===============
              STAGE SETUP
              =============== */

          for (let i = 0; i < t.numColumns; i++) {
            // Creates a new column container for each column
            t.ss.columnContainers.push(new createjs.Container());

            // Sets the x-offset for each container based off the column index and column width
            t.ss.columnContainers[i].x = i * t.stageColWidth;
            t.ss.columnContainers[i].name = `columnContainer${i}`;

            // "Mounts" the container to the stage
            t.stage.addChild(t.ss.columnContainers[i]);

            ////////////////////////////////////////

            const borderGraphic = new createjs.Graphics()
              .beginStroke('Black')
              .drawRect(i * 100, 0, t.stageColWidth, t.stageHeight);

            const columnBorder = new createjs.Shape(borderGraphic);

            columnBorder.name = `border${i}`;

            t.ss.columnBorders.push(columnBorder);
            t.ss.setupContainer.addChild(columnBorder);

            ////////////////////////////////////////

            const circleGraphic = new createjs.Graphics()
              .beginStroke('Black')
              .beginFill('Gray')
              .drawCircle(
                i * 100 + t.stageColWidth / 2,
                t.hitPercent * t.stageHeight,
                t.radius
              );

            const targetCircle = new createjs.Shape(circleGraphic);

            targetCircle.name = `targetCircle${i}`;

            t.ss.targetCircles.push(targetCircle);
            t.ss.setupContainer.addChild(targetCircle);

            ////////////////////////////////////////

            t.readyNotes.push([]);
            t.readyHolds.push([]);
          }

          t.areAllLoaded = true;
        }
      },
      deep: true,
    },
    $route() {
      // this.music.stop();
      // this.console.log('hi');
    },
  },

  methods: {
    init() {
      const t = this;

      t.started = true;
      t.music.play();

      /* ===============
            KEY PRESSES
          =============== */

      /* kd.D.down(function () {
        t.ss.columnContainers[0].children.forEach((circle) => {
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
        t.ss.columnContainers[0].children.forEach((circle) => {
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

      const OD = t.beatmapData.difficulty.OverallDifficulty;

      t.hitJudgement = {
        320: 16.5,
        300: Math.floor(64 - 3 * OD) + 0.5,
        200: Math.floor(97 - 3 * OD) + 0.5,
        100: Math.floor(127 - 3 * OD) + 0.5,
        50: Math.floor(151 - 3 * OD) + 0.5,
        0: Math.floor(170 - 3 * OD) + 0.5,
      };

      document.addEventListener('keydown', function (e) {
        // KEYPRESSES FOR NOTES: For each column, if the key press is equal to the key associated with that column, loop through each of the circles. If they are past a certain y-value, remove it from the specific container therefore "dismounting" it from the stage.
        const columnI = t.keys.findIndex((key) => key === e.key);
        t.readyNotes[columnI].forEach((thisCircle, i) => {
          if (thisCircle === null) return;

          if (thisCircle.msFromAbs() <= t.hitJudgement['0']) {
            let hitBonusValue = 0;

            switch (true) {
              case thisCircle.msFromAbs() <= t.hitJudgement['320']:
                t.latestHit = 320;
                t.totalHits['320']++;
                hitBonusValue = 32;
                t.bonus += 2;
                break;
              case thisCircle.msFromAbs() <= t.hitJudgement['300']:
                t.latestHit = 300;
                t.totalHits['300']++;
                hitBonusValue = 32;
                t.bonus += 1;
                break;
              case thisCircle.msFromAbs() <= t.hitJudgement['200']:
                t.latestHit = 200;
                t.totalHits['200']++;
                hitBonusValue = 16;
                t.bonus -= 8;
                break;
              case thisCircle.msFromAbs() <= t.hitJudgement['100']:
                t.latestHit = 100;
                t.totalHits['100']++;
                hitBonusValue = 8;
                t.bonus -= 24;
                break;
              case thisCircle.msFromAbs() <= t.hitJudgement['50']:
                t.latestHit = 50;
                t.totalHits['50']++;
                hitBonusValue = 4;
                t.bonus += 44;
                break;
              case thisCircle.msFromAbs() <= t.hitJudgement['0']:
                t.latestHit = 0;
                t.totalHits['0']++;
                t.bonus = 0;

                t.combo = 0;
                break;
            }

            if (!(t.latestHit === 0)) {
              if (t.bonus > 100) t.bonus = 100;
              if (t.bonus < 0) t.bonus = 0;

              const baseScore =
                ((1000000 * 0.5) / t.notes.length) * (t.latestHit / 320);

              const bonusScore =
                ((1000000 * 0.5) / t.notes.length) *
                ((hitBonusValue * Math.sqrt(t.bonus)) / 320);

              t.score += bonusScore + baseScore;
              t.combo += 1;

              createjs.Tween.removeTweens(thisCircle);
              t.ss.columnContainers[columnI].removeChild(thisCircle);
              t.readyNotes[columnI][i] = null;
            }
          }
        });
      });

      /* ===============
              NOTES
          =============== */

      t.notes.forEach((note) => {
        switch (note.type) {
          case 'note':
            const circleGraphic = new createjs.Graphics()
              .beginStroke('Black')
              .beginFill(t.circleColors[note.columnIndex])
              .drawCircle(t.stageColWidth / 2, -t.radius, t.radius);

            const thisCircle = new createjs.Shape(circleGraphic);
            thisCircle.name = 'thisCircle';
            thisCircle.i = note.columnIndex;
            thisCircle.msFrom = function () {
              console.log(
                (this.y - (t.stageHeight * t.hitPercent + t.radius) * 1000) /
                  (t.dy * t.stageFPS)
              );
              return (
                (this.y - (t.stageHeight * t.hitPercent + t.radius) * 1000) /
                (t.dy * t.stageFPS)
              );
            };
            thisCircle.msFromAbs = function () {
              return (
                (Math.abs(this.y - (t.stageHeight * t.hitPercent + t.radius)) *
                  1000) /
                (t.dy * t.stageFPS)
              );
            };

            // thisCircle.cache(0, -85, 120, 120);
            thisCircle.cache(
              t.stageColWidth / 2 - t.radius,
              -2 * t.radius,
              2 * t.radius + 30,
              2 * t.radius + 30
            );

            setTimeout(() => {
              t.ss.columnContainers[thisCircle.i].addChild(thisCircle);

              animate();

              function animate() {
                createjs.Tween.get(thisCircle, {
                  useTicks: true,
                  onChange: onChange,
                  onComplete: animate,
                }).to({ y: thisCircle.y + t.dy }, 1);
              }
              function onChange() {
                switch (true) {
                  // If ms from targetCircle is less than ...
                  case thisCircle.msFromAbs() <= t.hitJudgement['0'] &&
                    !thisCircle.ready:
                    if (!thisCircle.ready) {
                      thisCircle.ready = true;

                      thisCircle.readyIndex =
                        t.readyNotes[thisCircle.i].push(thisCircle) - 1;
                    }
                    break;

                  // If it reaches offscreen then ...
                  case thisCircle.y > t.stageHeight + 2 * t.radius:
                    // Remove tweens on the object
                    createjs.Tween.removeTweens(thisCircle);

                    // Reset everything
                    t.latestHit = 0;
                    t.totalHits['0']++;
                    t.bonus = 0;

                    t.combo = 0;

                    t.readyNotes[thisCircle.i][thisCircle.readyIndex] = null;

                    // Remove circle from stage
                    t.ss.columnContainers[thisCircle.i].removeChild(thisCircle);
                    break;
                }

                if (thisCircle.id === 16) {
                  console.log(thisCircle.msFrom());
                }

                if (thisCircle.id === 40) {
                  console.log(thisCircle.msFromAbs());
                }
              }
            }, note.time - t.beatmapIntro - (1000 * t.stageHeight * t.hitPercent + t.radius) / (t.dy * t.stageFPS));

            break;
          case 'hold':
            const sliderHeight =
              (t.dy * t.stageFPS * (note.endTime - note.time)) / 1000;

            const sliderGraphic = new createjs.Graphics()
              .beginStroke('Black')
              .beginFill(t.circleColors[note.columnIndex])
              .drawRoundRectComplex(
                10,
                -(sliderHeight + 2 * t.radius),
                2 * t.radius,
                sliderHeight + 2 * t.radius,
                t.radius,
                t.radius,
                t.radius,
                t.radius
              );

            const thisSlider = new createjs.Shape(sliderGraphic);
            thisSlider.name = 'thisSlider';

            setTimeout(() => {
              t.ss.columnContainers[note.columnIndex].addChild(thisSlider);

              animate();

              function animate() {
                /*
                useTicks: uses update ticks (60 fps) instead of ms
                onChange: runs ths function when the position is changed (thus this function is run every tick)
                onComplete: runs this function when animation is done
              */
                createjs.Tween.get(thisSlider, {
                  useTicks: true,
                  onChange: onChange,
                  onComplete: animate,
                }).to({ y: thisSlider.y + t.dy }, 1);
              }
              function onChange() {
                if (
                  thisSlider.y - sliderHeight >
                  t.stageHeight + 2 * t.radius
                ) {
                  // Remove tweens on the object
                  createjs.Tween.removeTweens(thisSlider);

                  /* // Reset combo
                  t.latestHit = 0;
                  t.totalHits['0']++;
                  t.bonus = 0;

                  t.combo = 0; */

                  // Remove slider from stage
                  t.ss.columnContainers[note.columnIndex].removeChild(
                    thisSlider
                  );
                }
              }
            }, note.time - t.beatmapIntro - (1000 * t.stageHeight * t.hitPercent + t.radius) / (t.dy * t.stageFPS));

            break;
          default:
            console.log(`Invalid note type: ${note.type}`);

            break;
        }
      });
    },
  },
};
</script>

<style scoped>
.canvas-container,
#canvas {
  height: 100vh;
}

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
