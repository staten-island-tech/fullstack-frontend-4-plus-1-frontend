<template>
  <div id="canvas__container" :style="{ width: canvasWidth + 'px' }">
    <canvas id="game__canvas" :style="{ width: canvasWidth + 'px' }">
      Canvas is not supported on your browser.
    </canvas>

    <div id="game__hitCombo__container" :style="{ width: canvasWidth + 'px' }">
      <h1 id="game__combo">{{ combo }}</h1>
      <h1 id="game__hitValue" :style="lastestHitStyle">
        {{ displayedLatestHit }}
      </h1>
    </div>

    <div id="game__hp-bar__container">
      <div id="game__hp-bar" :style="{ height: health + '%' }"></div>
    </div>
  </div>
</template>

<script>
/* global createjs:false, kd:false, Howl:false */
/* eslint-disable */

export default {
  props: {
    beatmapData: {
      required: true,
    },
    paused: {
      required: true,
    },
    beatmapIntro: {
      required: true,
    },
  },
  data() {
    return {
      loaded: {
        createjs: false,
        keydrown: false,
        howler: false,
      },
      areAllLoaded: false,
      started: false,

      // beatmaps data
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

      allKeys: ['A', 'S', 'D', 'F', 'SPACE', 'H', 'J', 'K', 'L'],
      keys: [],
      allColors: ['#E1D5E7', '#DAE8FC', '#f7a5cf', '#FFE6CC', '#F8CECC'],
      // allColors: ['#E1D5E7', '#DAE8FC', '#C8FFE4', '#FFE6CC', '#F8CECC'],
      colors: [],
      /* circleColors: ['#dddcdc', '#f7a5cf', '#f7a5cf', '#dddcdc'], */

      numColumns: null,
      columnWidth: 100, // in px (we change this to rem later)
      canvasWidth: null,

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
      noteObjectArray: [],
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
          src: '/lib/createjs.min.js',
          callback: () => (this.loaded.createjs = true),
        },
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
    '$store.state.howlerLoaded': function (newValue) {
      if (newValue) {
        this.loaded.howler = true;
      }
    },
    loaded: {
      handler() {
        // If ANY of the boolean values read false, the all scripts are NOT loaded.
        // If NO boolean values read false, then all scritps are loaded.
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
  },

  methods: {
    onLoad() {
      const t = this;

      t.notes = t.beatmapData.hitObjects;
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

      this.music = new Howl({
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
      t.stageHeight = $canvas.height = $canvas.getBoundingClientRect().height;

      t.stage = new createjs.Stage($canvas);
      t.stageColWidth = t.stageWidth / t.numColumns;

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
          SETUP CONTAINER
          =============== */

      t.ss.setupContainer = new createjs.Container();
      t.ss.setupContainer.name = 'setupContainer';

      t.stage.addChild(t.ss.setupContainer);
      t.stage.setChildIndex(t.ss.setupContainer, 0);

      /* ===============x
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

        const targetCircle = new createjs.Shape(
          new createjs.Graphics().beginStroke('Black')
        );
        const circleGraphic = targetCircle.graphics.beginFill('Gray').command;
        targetCircle.graphics.drawCircle(
          t.stageColWidth * (i + 0.5),
          t.hitPercent * t.stageHeight,
          t.radius
        );

        targetCircle.name = `targetCircle${i}`;

        t.ss.targetCircles.push(targetCircle);
        t.ss.targetCirclesGraphics.push(circleGraphic);
        t.ss.setupContainer.addChild(targetCircle);

        ////////////////////////////////////////

        t.readyNotes.push([]);
      }

      t.areAllLoaded = true;
      // emit this back to play.vue
      // as soon as this is loaded, we want to immediately start the game
    },
    startGame() {
      const t = this;

      t.started = true;

      t.songDuration = Math.round(t.music.duration()) * 1000;

      t.music.play();

      /* ===============
          HP DRAIN
          =============== */

      const HP = t.beatmapData.difficulty.HPDrainRate;

      function healthbarFinalVal(hitValue) {
        switch (hitValue) {
          case 320:
            t.health += 10;
            break;
          case 300:
            t.health += 10;
            break;
          case 200:
            t.health += 5;
            break;
          case 100:
            t.health += 5;
            break;
          case 50:
            t.health -= 5;
            break;
          case 0:
            t.health -= 10;
            break;
        }

        t.health = t.clamp(t.health, 0, 100);
      }

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

        const columnI = t.keys.findIndex(
          (key) => key === (e.key === ' ' ? 'SPACE' : e.key.toUpperCase())
        );

        // console.log('KEY PRESS:', t.notes[0].msFrom());

        if (!(columnI === -1)) {
          t.readyNotes[columnI].forEach((thisCircle) => {
            if (thisCircle) thisCircle.hit();
          });

          t.ss.targetCirclesGraphics[columnI].style = 'white';
        } else if (e.key.toUpperCase() === t.pauseKey) t.onPauseKey();
      });

      document.addEventListener('keyup', function (e) {
        const columnI = t.keys.findIndex(
          (key) => key === (e.key === ' ' ? 'SPACE' : e.key.toUpperCase())
        );
        if (!(columnI === -1)) {
          t.ss.targetCirclesGraphics[columnI].style = 'gray';
        }
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
          this.remove = this.remove.bind(this);
          this.cache(
            t.stageColWidth / 2 - t.radius,
            -2 * t.radius,
            2 * t.radius,
            2 * t.radius
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
          if (this.isRemoved) return;
          this.isRemoved = true;

          console.log('miss()');

          t.latestHit = 0;
          t.totalHits['0']++;
          t.bonus = 0;
          t.combo = 0;

          createjs.Tween.removeTweens(this);
          t.ss.columnContainers[this.i].removeChild(this);
          t.readyNotes[this.i].splice(t.readyNotes[this.i].indexOf(this), 1);
          healthbarFinalVal(t.latestHit);
        }

        hit() {
          t.beatmapData.hitObjects.forEach((note) => {
            t.noteHitSound = note.hitSample.filename;
          });

          if (this.isRemoved) return;
          this.isRemoved = true;

          let hitBonusValue = 0;

          switch (true) {
            case this.msFrom(true) <= t.hitJudgement['320']:
              t.latestHit = 320;
              t.totalHits['320']++;
              hitBonusValue = 32;
              t.bonus += 2;

              healthbarFinalVal(t.latestHit);
              break;
            case this.msFrom(true) <= t.hitJudgement['300']:
              t.latestHit = 300;
              t.totalHits['300']++;
              hitBonusValue = 32;
              t.bonus += 1;

              healthbarFinalVal(t.latestHit);

              break;
            case this.msFrom(true) <= t.hitJudgement['200']:
              t.latestHit = 200;
              t.totalHits['200']++;
              hitBonusValue = 16;
              t.bonus -= 8;

              healthbarFinalVal(t.latestHit);
              break;
            case this.msFrom(true) <= t.hitJudgement['100']:
              t.latestHit = 100;
              t.totalHits['100']++;
              hitBonusValue = 8;
              t.bonus -= 24;

              healthbarFinalVal(t.latestHit);
              break;
            case this.msFrom(true) <= t.hitJudgement['50']:
              t.latestHit = 50;
              t.totalHits['50']++;
              hitBonusValue = 4;
              t.bonus -= 44;

              healthbarFinalVal(t.latestHit);
              break;
            case this.msFrom(true) <= t.hitJudgement['0']:
              this.miss();
              healthbarFinalVal(t.latestHit);
              return;
          }

          t.bonus = t.clamp(t.bonus, 0, 100);

          const baseScore =
            ((1000000 * 0.5) / t.notes.length) * (t.latestHit / 320);

          const bonusScore =
            ((1000000 * 0.5) / t.notes.length) *
            ((hitBonusValue * Math.sqrt(t.bonus)) / 320);

          t.score += bonusScore + baseScore;
          t.combo += 1;

          //  this.hitSample = note.hitSample;
          //  this.hitSound = note.hitSound;

          if (this.hitSound === 0) {
            t.defaultHitSoftNormal.play();
          } else {
            t.softSliderWhistle.play();
          }

          this.remove();
        }

        remove() {
          createjs.Tween.removeTweens(this);
          t.ss.columnContainers[this.i].removeChild(this);
          t.readyNotes[this.i].splice(t.readyNotes[this.i].indexOf(this), 1);
        }

        animate() {
          createjs.Tween.get(this, {
            useTicks: true,
            onComplete: this.animate,
          }).to({ y: this.y + t.dy }, 1);

          console.log(this.msFrom(), t.hitJudgement['50']);

          switch (true) {
            // If ms from targetCircle is less than ...
            case this.msFrom(true) <= t.hitJudgement['0'] && !this.ready:
              this.ready = true;
              t.readyNotes[this.i].push(this);

              // Start fading out
              createjs.Tween.get(this, {
                onComplete: this.remove,
              }).to(
                { alpha: 0, visible: false },
                2 * t.hitJudgement['0'],
                createjs.Ease.linear
              );
              break;
            // If it reaches offscreen then ...
            // Remove the circle and time it correctly
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
          if (this.isRemoved) return;
          this.isRemoved = true;

          console.log('Slider Miss');

          t.latestHit = 0;
          t.totalHits['0']++;
          t.bonus = 0;

          t.combo = 0;

          healthbarFinalVal(t.latestHit);
        }

        hit() {
          if (this.isRemoved) return;
          this.isRemoved = true;

          let hitBonusValue = 0;

          switch (true) {
            case this.avgMs <= t.hitJudgement['320'] && !this.releasedMs:
              t.latestHit = 320;
              t.totalHits['320']++;
              hitBonusValue = 32;
              t.bonus += 2;

              healthbarFinalVal(t.latestHit);
              break;
            case this.avgMs <= t.hitJudgement['300'] && !this.releasedMs:
              t.latestHit = 300;
              t.totalHits['300']++;
              hitBonusValue = 32;
              t.bonus += 1;

              healthbarFinalVal(t.latestHit);
              break;
            case this.avgMs <= t.hitJudgement['300'] ||
              (!this.finalMs && this.initialMs <= t.hitJudgement['300']):
              t.latestHit = 200;
              t.totalHits['200']++;
              hitBonusValue = 16;
              t.bonus -= 8;

              healthbarFinalVal(t.latestHit);
              break;
            case this.avgMs <= t.hitJudgement['200'] ||
              (!this.finalMs && this.initialMs <= t.hitJudgement['200']):
              t.latestHit = 100;
              t.totalHits['100']++;
              hitBonusValue = 8;
              t.bonus -= 24;

              healthbarFinalVal(t.latestHit);
              break;
            case this.avgMs <= t.hitJudgement['50'] ||
              (!this.finalMs && this.initialMs <= t.hitJudgement['50']):
              t.latestHit = 50;
              t.totalHits['50']++;
              hitBonusValue = 4;
              t.bonus -= 44;
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
  background-color: #181818;
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

#game__hitValue {
  font-size: 14rem;
  font-weight: 300;
}

#game__hp-bar__container {
  transform: rotate(180deg);
  height: 25rem;
  width: 2rem;

  position: relative;
  left: calc(100% + 2rem);
  bottom: 10rem;

  padding: 0.5rem;
  border-radius: 1rem;

  background-color: white;
}

#game__hp-bar {
  height: 0%;

  transition: height 0.15s linear;

  background-color: #38b000;
  border-radius: 0.5rem;
  box-shadow: inset -0.1rem -0.1rem 1rem rgb(0 0 0 / 0.5);
}
</style>
