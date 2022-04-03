<template>
  <div id="game-index">
    <div
      class="game-image-container"
      :style="{
        'background-image': `urL(/beatmaps/${$store.state.beatmapData.metadata.BeatmapSetID}/${$store.state.beatmapData.events[0][2]})`,
      }"
    >
    </div>
    <button
      v-if="areAllLoaded && !started && songLoaded"
      class="game-start-button"
      @click="startGame"
    >
      START 4 Keys: D, F, H, J
    </button>
    <div class="game-canvas-container" :style="{ width: canvasWidth + 'px' }">
      <canvas id="canvas" :style="{ width: canvasWidth + 'px' }"
        >Canvas is not supported on your browser.</canvas
      >
    </div>
<div class="health-bar-cont">
        <div id="health-bar"></div>
</div>
    <div class="game-statistics-container">
      <h1>{{ Math.floor(score) }}</h1>
      <h1>x{{ combo }}</h1>
      <h1>
        {{ accuracy ? `${Math.round(accuracy * 10000) / 100}%` : '100%' }}
      </h1>
      <h1 :style="lastestHitStyle">{{ displayedLatestHit }}</h1>
    </div>

    <div class="game-pb-container">
      <div id="game-pb"></div>
      <div id="game-pb-vol" :style="{ opacity: opacity }"></div>
     
      <button
        v-if="areAllLoaded && started && songLoaded"
        :style="{ opacity: opacity }"
        class="game-mute-button"
        @click="muteButton"
      >
        MUTE
      </button>
    </div>

    <div v-show="paused" class="game-pause-menu">
      <div class="game-pause-button-container">
        <button @click="onPauseKey()">Continue</button>
        <button>Retry</button>
        <button @click="$router.push('/beatmaps')">Return</button>
      </div>
    </div>
  </div>
</template>

<script>
/* global createjs:false, Howl:false, Howler:false, kd:false, ProgressBar:false */
/* eslint-disable */

export default {
  layout: 'nonav',

  data() {
    return {
      loaded: {
        createjs: false,
        keydrown: false,

        progressbar: false,
      },
      areAllLoaded: false,
      started: false,
      songLoaded: false,

      beatmapData: {},
      notes: [],

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

      pauseKey: 'P',
      paused: false,
      allKeys: ['A', 'S', 'D', 'F', 'SPACE', 'H', 'J', 'K', 'L'],
      keys: [],
      allColors: ['#E1D5E7', '#DAE8FC', '#C8FFE4', '#FFE6CC', '#F8CECC'],
      colors: [],
      /* circleColors: ['#dddcdc', '#f7a5cf', '#f7a5cf', '#dddcdc'], */

      numColumns: 4,
      columnWidth: 100, // in px (we change this to rem later)

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
      },
      noteObjectArray: [],
      readyNotes: [],
      readySliders: [],

      hitPercent: 0.85,
      radius: 40,
      noteHitSound: null,
      music: null,
      beatmapIntro: null,
      songDuration: 0,
      volume: 0.1,
      pbVolProgress: 1,
      scale: 0,
      opacity: 1,
      pbdur: null,
      songDuration: 0,
      progressBarVol: null,
      health: 1,

      Page: this.$route.name,
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
        {
          src: '/lib/progressbar.min.js ',
          callback: () => (this.loaded.progressbar = true),
        },
      ],
    };
  },

  created() {
    window.addEventListener('wheel', this.onScroll);
  },

  destroyed() {
    window.removeEventListener('wheel', this.onScroll);
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
      return isNaN(accuracy) ? null : accuracy;
    },
  },

  watch: {
    loaded: {
      handler(newValue, oldValue) {
        // If ANY of the boolean values read false, the all scripts are NOT loaded.
        // If NO boolean values read false, then all scritps are loaded.
        if (!Object.values(this.loaded).some((bool) => !bool)) this.onLoad();
      },
      deep: true,
    },
  },

  methods: {
    onLoad() {
      {
        const t = this;
        Howler.volume(1);
        t.beatmapData = t.$store.state.beatmapData;
        t.notes = t.beatmapData.hitObjects;
        t.beatmapIntro = t.notes[0].time < 3000 ? 0 : t.notes[0].time - 3000;

        t.keys = [
          ...t.allKeys.slice(-(Math.floor(t.numColumns / 2) + 5), -5),
          ...(t.numColumns % 2 ? [t.allKeys[4]] : []),
          ...t.allKeys.slice(5, Math.floor(t.numColumns / 2) + 5),
        ];

        t.colors = [
          ...t.allColors.slice(-(Math.floor(t.numColumns / 2) + 2), -2),
          ...(t.numColumns % 2 ? [t.allColors[4]] : []),
          ...t.allColors
            .slice(-(Math.floor(t.numColumns / 2) + 2), -2)
            .reverse(),
        ];

        t.music = new Howl({
          src: [
            `/beatmaps/${t.beatmapData.metadata.BeatmapSetID}/${t.beatmapData.general.AudioFilename}`,
          ],
          volume: t.volume,
          onload: () => (t.songLoaded = true),
        });
        t.songDuration = t.music.duration();
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
        //

        /* ===============
              PROGRESS BAR
              =============== */

        t.progressBarVol = new ProgressBar.Circle('#game-pb-vol', {
          color: '#FCB03C',
          // This has to be the same size as the maximum width to
          // prevent clipping
          strokeWidth: 7, 
          easing: 'easeInOut',
          trailColor: '#eee',
          trailWidth: 7,
          duration: 1400,

          from: { color: '#aaa', width: 8 },
          to: { color: '#333', width: 8 },
          // Set default step function for all animate calls
          step: function (state, circle) {
            circle.path.setAttribute('stroke', state.color);
            circle.path.setAttribute('stroke-width', state.width);

            const value = Math.round(circle.value() * 100);
            if (value === 0) {
              circle.setText('Volume');
            } else {
              circle.setText(value);
            }
          },
        });

        t.progressBarVol.animate(t.pbVolProgress);

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
          .beginFill('#181818')
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
              t.stageColWidth * (i + 0.5),
              t.hitPercent * t.stageHeight,
              t.radius
            );

          const targetCircle = new createjs.Shape(circleGraphic);

          targetCircle.name = `targetCircle${i}`;

          t.ss.targetCircles.push(targetCircle);
          t.ss.setupContainer.addChild(targetCircle);

          ////////////////////////////////////////

          t.readyNotes.push([]);
        }

        t.areAllLoaded = true;
      }
    },
    startGame() {
      const t = this;

      t.started = true;
      t.music.play();
      t.songDuration = Math.round(t.music.duration()) * 1000;

      t.healthBar = new ProgressBar.Line('#health-bar', {
    strokeWidth: 4,
    easing: 'easeInOut',
    duration: 500,
    color: '#FFEA82',
    trailColor: '#eee',
    trailWidth: 4,
    svgStyle: {width: '80rem', height: '4rem',}
      });

      t.progressBar = new ProgressBar.Circle('#game-pb', {
        color: '#FCB03C',
        strokeWidth: 50,
        trailColor: '#D3D3D3',
        duration: t.songDuration,
        text: {
          value: '0',
        },
      });

      t.progressBar.animate(1);
      
        t.healthBar.animate(1);
        
      function healthbarFinalVal(currentHealth) {
//       switch (currentHealth) {
//   case t.latestHit === 320:
//        if(t.health > 0  && t.health < 1) {
//        t.health += 0.1;  
//  }
//     break;
//   case t.latestHit === 300:
//       if(t.health > 0  && t.health < 1) {
//        t.health += 0.1;  
//  }
//     break;
//   case t.latestHit === 200:
//        if(t.health > 0  && t.health < 1 ) {
//           t.health += 0.05;
//      }
//     break;
//   case t.latestHit === 100:
//       if(t.health > 0  && t.health < 1 ) {
//           t.health += 0.05;
//      }
//     break;
//   case 4:
//     day = "Thursday";
//     break;
//   case 5:
//     day = "Friday";
//     break;
//   case 6:
//     day = "Saturday";
// }

       if(t.latestHit === 320 || t.latestHit === 300  && t.health > 0  && t.health < 1) {
          t.health += 0.1;
        }
          else if (t.latestHit === 200 || t.latestHit === 100 && t.health > 0  && t.health < 1 ) {
          t.health += 0.05;
      }
         else if (t.latestHit === 50 || t.latestHit === 0 && t.health > 0) {
          t.health -= 0.1
        }
        else {
          t.health = 0;
          console.log("0 heath gg!")
        }
       currentHealth = Math.round(100* t.health)/100;
        console.log(currentHealth)
        t.healthBar.animate(currentHealth);
      }

      // function healthbarHitGood() {
      //   if(t.health > 0  && t.health < 1) {
      //     t.health += 0.1;
      //     console.log(  t.health )  
      //   }

      // }

      // function healthbarHitBad() {
      //   if(t.health > 0  && t.health < 1 ) {
      //     t.health += 0.05;
        
      // }
      
      // }

      // function healthbarMiss() {
      //     if(t.health > 0) {
      //     t.health -= 0.1

      //     console.log(  t.health )
      //   }
      //   else {
      //     t.health = 0;
      //     console.log("0 heath gg!"
      //      )
      //   }
      // }
 
      /* ===============
          KEY PRESS
          =============== */

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
        if (e.repeat) return;

        const columnI = t.keys.findIndex((key) => key === e.key.toUpperCase());
        if (!(columnI === -1)) {
          t.readyNotes[columnI].forEach((thisCircle) => {
            console.log('hit');
            if (thisCircle) thisCircle.hit();
          });
        } else if (e.key.toUpperCase() === t.pauseKey) t.onPauseKey();
      });

      for (let i = 0; i < t.numColumns; i++) {
        kd[t.keys[i]].down(function () {
          if (!t.readySliders[i]) return;
          t.readySliders[i].held = true;

          if (!t.readySliders[i].initialMs)
            t.readySliders[i].initialMs = t.readySliders[i].msFrom('bot', true);
        });

        kd[[t.keys[i]]].up(function () {
          if (!t.readySliders[i]) return;
          t.readySliders[i].held = false;

          if (t.readySliders[i].msFrom('top', true) <= t.hitJudgement['50']) {
            t.readySliders[i].finalMs = t.readySliders[i].msFrom('top', true);

            t.readySliders[i].avgMs =
              (t.readySliders[i].initialMs + t.readySliders[i].finalMs) / 2;

            t.readySliders[i].hit();
          } else {
            if (t.readySliders[i].releasedMs) t.readySliders[i].miss();
            else t.readySliders[i].releasedMs = t.readySliders[i].msFrom('top');
          }
        });
      }

      kd.run(function () {
        kd.tick();
      });

      /* ===============
              NOTES
          =============== */

      class Note extends createjs.Shape {
        constructor(note) {
          super(
            new createjs.Graphics()
              .beginStroke('Black')
              .beginFill(t.colors[note.columnIndex])
              .drawCircle(t.stageColWidth / 2, -t.radius, t.radius)
          );

          this.name = 'thisCircle';
          this.i = note.columnIndex;
          this.hitSample = note.hitSample;
          this.hitSound = note.hitSound;
          this.time = note.time;

          this.animate = this.animate.bind(this);
          this.cache(
            t.stageColWidth / 2 - t.radius,
            -2 * t.radius,
            2 * t.radius + 30,
            2 * t.radius + 30
          );

          this.remainingTime =
            note.time -
            t.beatmapIntro -
            (1000 * t.stageHeight * t.hitPercent + t.radius) /
              (t.dy * t.stageFPS);
          this.startTime, this.timerID;

          this.resumeTimer();
        }

        msFrom(isAbs = false) {
          return isAbs
            ? Math.abs(
                ((this.y - (t.stageHeight * t.hitPercent + t.radius)) * 1000) /
                  (t.dy * t.stageFPS)
              )
            : ((this.y - (t.stageHeight * t.hitPercent + t.radius)) * 1000) /
                (t.dy * t.stageFPS);
        }

        miss() {
          if (this.removed) return;
          this.removed = true;

          t.latestHit = 0;
          t.totalHits['0']++;
          t.bonus = 0;

          t.combo = 0;

          createjs.Tween.removeTweens(this);
          t.ss.columnContainers[this.i].removeChild(this);
          t.readyNotes[this.i].splice(t.readyNotes[this.i].indexOf(this), 1);
          healthbarFinalVal( t.health );
        }

        hit() {
          t.beatmapData.hitObjects.forEach((note)   => {
            t.noteHitSound = note.hitSample.filename;
          });

          if (this.removed) return;
          this.removed = true;

          let hitBonusValue = 0;

          switch (true) {
            case this.msFrom(true) <= t.hitJudgement['320']:
              t.latestHit = 320;
              t.totalHits['320']++;
              hitBonusValue = 32;
              t.bonus += 2;
          
              healthbarFinalVal( t.health );
              break;
            case this.msFrom(true) <= t.hitJudgement['300']:
              t.latestHit = 300;
              t.totalHits['300']++;
              hitBonusValue = 32;
              t.bonus += 1;
     
              healthbarFinalVal( t.health );

              break;
            case this.msFrom(true) <= t.hitJudgement['200']:
              t.latestHit = 200;
              t.totalHits['200']++;
              hitBonusValue = 16;
              t.bonus -= 8;
          
               healthbarFinalVal( t.health );
              break;
            case this.msFrom(true) <= t.hitJudgement['100']:
              t.latestHit = 100;
              t.totalHits['100']++;
              hitBonusValue = 8;
              t.bonus -= 24;
         
               healthbarFinalVal( t.health );
              break;
            case this.msFrom(true) <= t.hitJudgement['50']:
              t.latestHit = 50;
              t.totalHits['50']++;
              hitBonusValue = 4;
              t.bonus -= 44;
     
               healthbarFinalVal( t.health );
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
          t.combo += 1;

          createjs.Tween.removeTweens(this);
          t.ss.columnContainers[this.i].removeChild(this);
          t.readyNotes[this.i].splice(t.readyNotes[this.i].indexOf(this), 1);

          //  this.hitSample = note.hitSample;
          //  this.hitSound = note.hitSound;
   console.log(this.hitSound);

          if (this.hitSound === 0) {
           
            t.defaultHitSoftNormal.play();
          } else {
            t.softSliderWhistle.play();
          }
        }

        animate() {
          createjs.Tween.get(this, {
            useTicks: true,
            onComplete: this.animate,
          }).to({ y: this.y + t.dy }, 1);

          switch (true) {
            // If ms from targetCircle is less than ...
            case this.msFrom(true) <= t.hitJudgement['50'] && !this.ready:
              this.ready = true;

              // this.readyIndex = t.readyNotes[this.i].push(this) - 1;
              t.readyNotes[this.i].push(this);
              break;

            // If it reaches offscreen then ...
            case this.msFrom() > t.hitJudgement['50']:
              this.miss();
              break;
          }
        }

        resumeTimer() {
          this.startTime = new Date();

          this.timerID = setTimeout(() => {
            t.ss.columnContainers[this.i].addChild(this);
            t.noteObjectArray.splice(t.noteObjectArray.indexOf(this), 1);

            this.animate();
          }, this.remainingTime);
        }

        pauseTimer() {
          clearTimeout(this.timerID);
          this.remainingTime -= new Date() - this.startTime;
        }

        startTimer() {
          this.resumeTimer();
          t.noteObjectArray.push(this);
        }
      }

      class Slider extends createjs.Shape {
        constructor(note) {
          const height =
            (t.dy * t.stageFPS * (note.endTime - note.time)) / 1000;

          super(
            new createjs.Graphics()
              .beginStroke('Black')
              .beginFill(t.colors[note.columnIndex])
              .drawRoundRectComplex(
                10,
                -(height + 2 * t.radius),
                2 * t.radius,
                height + 2 * t.radius,
                t.radius,
                t.radius,
                t.radius,
                t.radius
              )
          );

          this.height = height;

          this.name = 'thisSlider';
          this.i = note.columnIndex;
          this.hitSample = note.hitSample;
          this.hitSound = note.hitSound;
          this.time = note.time;

          this.animate = this.animate.bind(this);
          /* this.cache(
            t.stageColWidth / 2 - t.radius,
            -2 * t.radius,
            2 * t.radius + 30,
            2 * t.radius + 30
          ); */

          this.remainingTime =
            note.time -
            t.beatmapIntro -
            (1000 * t.stageHeight * t.hitPercent + t.radius) /
              (t.dy * t.stageFPS);
          this.startTime, this.timerID;

          this.resumeTimer();
        }

        msFrom(position, isAbs = false) {
          if (position === 'bot') {
            return isAbs
              ? Math.abs(
                  ((this.y - (t.stageHeight * t.hitPercent + t.radius)) *
                    1000) /
                    (t.dy * t.stageFPS)
                )
              : ((this.y - (t.stageHeight * t.hitPercent + t.radius)) * 1000) /
                  (t.dy * t.stageFPS);
          } else if (position === 'top') {
            return isAbs
              ? Math.abs(
                  ((this.y -
                    (t.stageHeight * t.hitPercent + t.radius + this.height)) *
                    1000) /
                    (t.dy * t.stageFPS)
                )
              : ((this.y -
                  (t.stageHeight * t.hitPercent + t.radius + this.height)) *
                  1000) /
                  (t.dy * t.stageFPS);
          } else console.log('Invalid position in slider.msFrom()');
        }

        miss() {
          if (this.removed) return;
          this.removed = true;

          t.latestHit = 0;
          t.totalHits['0']++;
          t.bonus = 0;

          t.combo = 0;

          createjs.Tween.removeTweens(this);
          t.ss.columnContainers[this.i].removeChild(this);
          t.readySliders[this.i] = null;

          healthbarFinalVal( t.health );
        }

        hit() {
          if (this.removed) return;
          this.removed = true;

          let hitBonusValue = 0;

          switch (true) {
            case this.avgMs <= t.hitJudgement['320'] && !this.releasedMs:
              t.latestHit = 320;
              t.totalHits['320']++;
              hitBonusValue = 32;
              t.bonus += 2;
     
              healthbarFinalVal( t.health );
              break;
            case this.avgMs <= t.hitJudgement['300'] && !this.releasedMs:
              t.latestHit = 300;
              t.totalHits['300']++;
              hitBonusValue = 32;
              t.bonus += 1;
       
              healthbarFinalVal( t.health );
              break;
            case this.avgMs <= t.hitJudgement['300'] ||
              (!this.finalMs && this.initialMs <= t.hitJudgement['300']):
              t.latestHit = 200;
              t.totalHits['200']++;
              hitBonusValue = 16;
              t.bonus -= 8;
          
              healthbarFinalVal( t.health );
              break;
            case this.avgMs <= t.hitJudgement['200'] ||
              (!this.finalMs && this.initialMs <= t.hitJudgement['200']):
              t.latestHit = 100;
              t.totalHits['100']++;
              hitBonusValue = 8;
              t.bonus -= 24;
    
              healthbarFinalVal( t.health );
              break;
            case this.avgMs <= t.hitJudgement['50'] ||
              (!this.finalMs && this.initialMs <= t.hitJudgement['50']):
              t.latestHit = 50;
              t.totalHits['50']++;
              hitBonusValue = 4;
              t.bonus -= 44;
    
              healthbarFinalVal( t.health );
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
          t.combo += 1;

          createjs.Tween.removeTweens(this);
          t.ss.columnContainers[this.i].removeChild(this);
          t.readySliders[this.i] = null;
        }

        animate() {
          createjs.Tween.get(this, {
            useTicks: true,
            onComplete: this.animate,
          }).to({ y: this.y + t.dy }, 1);

          switch (true) {
            case this.msFrom('bot', true) <= t.hitJudgement['50'] &&
              !this.ready:
              this.ready = true;

              t.readySliders[this.i] = this;
              break;

            case this.msFrom('bot') > t.hitJudgement['50'] && !this.initialMs:
              this.miss();
              break;

            case this.msFrom('top') > t.hitJudgement['50']:
              if (this.held && this.initialMs) this.hit();
              else this.miss();
              break;
          }
        }

        resumeTimer() {
          this.startTime = new Date();

          this.timerID = setTimeout(() => {
            t.ss.columnContainers[this.i].addChild(this);
            t.noteObjectArray.splice(t.noteObjectArray.indexOf(this), 1);

            this.animate();
          }, this.remainingTime);
        }

        pauseTimer() {
          clearTimeout(this.timerID);
          this.remainingTime -= new Date() - this.startTime;
        }

        startTimer() {
          this.resumeTimer();
          t.noteObjectArray.push(this);
        }
      }

      t.notes.forEach((note) => {
        if (note.type === 'note') new Note(note);
        else if (note.type === 'hold') new Slider(note);
        else console.log(`Invalid note type: ${note.type}`);
      });
    },
    onPauseKey() {
      this.paused = !this.paused;
      if (this.paused) {
        this.noteObjectArray.forEach((note) => note.pause());
        createjs.Ticker.paused = true;
        this.music.pause();
      } else {
        this.noteObjectArray.forEach((note) => note.resume());
        createjs.Ticker.paused = false;
        this.music.play();
      }
    },
    onScroll(e) {
      e.preventDefault();

      this.scale += e.deltaY * -0.0002;
      // Restrict scale
      this.scale = Math.min(Math.max(0, this.scale), 1);
      // Apply scale transform
      Howler.volume(this.scale);
      this.pbVolProgress = Math.round(100 * this.scale) / 100;

      this.progressBarVol.set(this.pbVolProgress);
    },
    muteButton() {
      if (this.music.mute() === false) {
        this.music.mute(true);
        this.opacity = 0.5;
      } else {
        this.music.mute(false);
        this.opacity = 1;
      }
      // this.music.mute(true);
    },
  },
};
</script>

<style scoped>
#game-index {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}

.game-image-container {
  position: absolute;

  width: 100%;
  height: 100%;

  opacity: 0.5;
  z-index: -100;

  background-size: cover;
}

.game-image-container > img {
  width: 100%;
}

.game-start-button {
  height: 20vh;
  width: 20vw;
  background-color: gray;
  font-size: 3rem;
}

.game-canvas-container,
#canvas {
  height: 100vh;
}

.game-statistics-container {
  min-width: 35rem;
  height: 30rem;

  padding: 1rem 2rem;

  background-color: rgba(128, 128, 128, 0.8);

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

.game-statistics-container > h1 {
  font-size: 7rem;
}

.game-pb-container {
  height: 50vh;
  width: 20vw;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.health-bar-cont {
    height: 80vh;
  width: 5vw;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

#game-pb {
  height: 20%;
  width: 20%;
}




#health-bar {
transform: rotate(0.75turn);
}

#game-pb-vol {
  position: relative;
  width: 80%;
  font-family: 'Raleway', Helvetica, sans-serif;
  font-size: 5rem;
}

/* #game-pb-vol > svg {
  position: relative;
} */

#game-pb-vol > div {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.game-mute-button {
  color: black;
  height: 5vh;
  width: 5vw;
  font-size: 3rem;
}

.game-pause-menu {
  position: absolute;
  z-index: 100;

  width: 100%;
  height: 100%;

  background-color: rgba(128, 128, 128, 0.4);
}

.game-pause-button-container {
  position: absolute;

  width: 40rem;
  height: 60rem;
  background-color: black;
  border-radius: 8rem;
  border: #30d5c8 solid 0.5rem;

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
}

.game-pause-button-container > button {
  width: 20rem;
  height: 6rem;
  background-color: black;
  border-radius: 3rem;
  border: #30d5c8 solid 0.5rem;

  font-size: 3rem;
  color: white;

  transition: 0.3s all;
}

.game-pause-button-container > button:hover {
  transform: translate(0, -0.5rem) scale(1.05);
}
</style>
