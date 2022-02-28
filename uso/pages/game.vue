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
      <h1>{{ score }}</h1>
      <h1>x{{ combo }}</h1>
      <h1 :style="lastestHitStyle">{{ latestHit }}</h1>
    </div>
    <div class="progress-bar-container">
      <div id="myProgress">
        <div id="myBar"></div>
      </div>
    </div>
  </div>
</template>

<script>
/* global createjs:false, kd:false, Howl:false */
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
      beatmapIntro: 0,
      syncOffset: 0,
      oneButtonClick: true,
      latestHit: '⠀',
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
    lastestHitStyle() {
      let color = null;
      switch (this.latestHit) {
        case 300:
          return {
            background:
              'linear-gradient(to top, red, orange, yellow, green, blue, indigo, violet)',
            'background-clip': 'text',
            '-webkit-background-clip': 'text',
            '-webkit-text-fill-color': 'transparent',
          };
        case 200:
          color = '#66c010';
          break;
        case 100:
          color = '#1151a7';
          break;
        case 50:
          color = '#707680';
          break;
        case 'MISS':
          color = '#bf342f';
          break;
      }
      return { color: color };
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

  mounted() {
    /* this.fetchBeatmap('Soleily - Renatus (ExPew) [Hyper].json'); */
  },

  methods: {
    /* fetchBeatmap(beatmapFileName) {
      fetch(`/test-beatmaps/${beatmapFileName}`)
        .then((response) => (response = response.json()))
        .then((data) => {
          this.beatmapData = data;
          this.notes = data.hitObjects;
          this.loaded.beatmap = true;
          // this.src name of song data
        });
    }, */
    init() {
      // if(this.oneButtonClick === true) {

      const t = this;
      // t.oneButtonClick = false;

      t.started = true;
      t.music.play();
      t.songDuration = t.music.duration();

      let i = 0;

      let elem = document.getElementById('myBar');

      function progressBar() {
        let bar = 0;
        let id = setInterval(function () {
          bar++;
          elem.style.height = bar + '%';
          if (bar >= 100) {
            clearInterval(id);
          }
        }, (t.songDuration * 1000) / 100);
      }
      progressBar();

      let firstValY = 0;
      let lastValY = 0;
      let scoreMultplier = 1;
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

      kd.D.down(function () {
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
      });

      kd.D.up(function () {
        t.columnContainers[0].children.forEach((circle) => {
          const diffFromTargetCircle = Math.abs(circle.y - 700);
          if (circle.y >= 610 && circle.name === 'Slider') {
            // if (t.firstVal === 1) {
            //   t.firstVal = 0
            // }
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
      });

      // document.addEventListener("keyup", function (sliders) {
      //   // KEYPRESSES FOR NOTES: For each column, if the key press is equal to the key associated with that column, loop through each of the circles. If they are past a certain y-value, remove it from the specific container therefore "dismounting" it from the stage.
      //   for (let i = 0; i < numColumns; i++) {
      //     if (sliders.key === keys[i]) {
      //       columnContainers[i].children.forEach((circle) => {
      //         const diffFromTargetCircle = Math.abs(circle.y - 700);

      //         if (circle.y >= 610 && circle.name === "Slider") {
      //           if (firstVal === 1) {
      //             firstVal = 0
      //           }
      //           lastValY = diffFromTargetCircle;

      //           let sliderCombo = (lastValY - firstValY)/10;
      //           let sliderScore = sliderCombo * scoreMultplier
      //           console.log( sliderScore)
      //           console.log( sliderCombo)
      //           console.log( scoreMultplier)
      //           score += Math.round(sliderScore);
      //           combo += Math.round(sliderCombo);
      //           $score.innerHTML = `Score: ${score}`;
      //           $combo.innerHTML = `Combo: ${combo}`;
      //         }
      //       });
      //     }
      //   }
      // });

      document.addEventListener('keydown', function (e) {
        // KEYPRESSES FOR NOTES: For each column, if the key press is equal to the key associated with that column, loop through each of the circles. If they are past a certain y-value, remove it from the specific container therefore "dismounting" it from the stage.
        for (let i = 0; i < t.numColumns; i++) {
          if (e.key === t.keys[i]) {
            t.columnContainers[i].children.forEach((circle) => {
              // console.log(columnContainers[note.columnIndex].getChildByName("thisCircle"))

              const diffFromTargetCircle = Math.abs(circle.y - 700);

              if (circle.y >= 610 && circle.name === 'thisCircle') {
                // let arrCircles = Object.values(circles)

                //  arrCircles.forEach(el => {
                //   const found = el.find(element => element === thisCircle);
                //   console.log(found)
                //   });
                createjs.Tween.removeTweens(circle);
                t.columnContainers[i].removeChild(circle);

                if (diffFromTargetCircle > 0 && diffFromTargetCircle <= 6) {
                  t.latestHit = 300;
                  t.score += 300 * t.combo;
                } else if (
                  diffFromTargetCircle >= 6 &&
                  diffFromTargetCircle <= 12
                ) {
                  t.latestHit = 200;
                  t.score += 200 * t.combo;
                } else if (
                  diffFromTargetCircle >= 12 &&
                  diffFromTargetCircle <= 20
                ) {
                  t.latestHit = 100;
                  t.score += 100 * t.combo;
                } else {
                  t.latestHit = 50;
                  t.score += 50 * t.combo;
                }

                t.combo += 1;
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

            //  t.columnContainers[note.columnIndex].addChild(thisCircle);
            // Creates the circle "template" for later use to initialize a shape
            // Sets the delay before the notes animate (or before the notes drop)

            // createjs.Tween.get(thisCircle, { onComplete: animateCircle }).wait(
            //  note.time -
            //    t.beatmapIntro -
            //   (6860 * (650 / 700) + 6860) / t.scrollSpeed
            // );

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
                t.combo = 0;
                t.latestHit = 'MISS';

                // Remove circle from stage
                t.columnContainers[note.columnIndex].removeChild(thisCircle);
              }
            }
          }, note.time - t.beatmapIntro + t.syncOffset - (6860 * (650 / 700) + 6860) / t.scrollSpeed);
        } else if (note.type === 'hold') {
          setTimeout(() => {
            t.columnContainers[note.columnIndex].addChild(thisSlider);

            animateSlider();

            //  t.columnContainers[note.columnIndex].addChild(thisCircle);
            // Creates the circle "template" for later use to initialize a shape
            // Sets the delay before the notes animate (or before the notes drop)

            // createjs.Tween.get(thisSlider, { onComplete: animateSlider }).wait(
            //  note.time -
            //    t.beatmapIntro -
            //   (6860 * (650 / 700) + 6860) / t.scrollSpeed
            // );

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

                // Reset combo
                t.combo = 0;
                t.latestHit = 'MISS';

                // Remove circle from stage
                t.columnContainers[note.columnIndex].removeChild(thisSlider);
              }
            }
          }, note.time - t.beatmapIntro + t.syncOffset - (6860 * (650 / 700) + 6860) / t.scrollSpeed);
        } else {
          console.log(`Invalid note type: ${note.type}`);
        }
      });
      // }
    },
  },
};
</script>

<style scoped>
#myProgress {
  width: 1vw;
  height: 95vh;
  background-color: #ddd;
}

#myBar {
  transition: all 0.5s ease-in;
  width: 100%;
  height: 1%;
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
  font-size: 1rem;

  padding: 1rem 2rem;

  background-color: rgba(128, 128, 128, 0.8);

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}
</style>
