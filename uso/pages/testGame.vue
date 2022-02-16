<template>
  <div id="test-game-index">
    <button @click.once="init" class="button">BUTTTON</button>
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
      <h1>Score: {{ score }}</h1>
      <h1>Combo: {{ combo }}</h1>
      <h1>Scroll Speed: {{ scrollSpeed }}</h1>
      <h1 :style="lastestHitStyle">{{ latestHit }}</h1>
    </div>
  </div>
</template>

<script>
/* global createjs:false */
/* eslint-disable */

export default {
  data() {
    return {
      loaded: {
        createjs: false,
        keydrown: false,
        beatmap: false,
      },
      areAllLoaded: false,

      score: 0,
      combo: 0,
      scrollSpeed: 10,

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
      columnContainers: [],
      loader: null,
      targetCircles: [],
      circles: null,
      firstVal: 0,
      beatmapData: {},
      notes: [],
      beatmapIntro: 25000,
oneButtonClick: true,
      latestHit: null,
    };
  },

  head() {
    return {
      script: [
        {
          src: '/lib/createjs.min.js',
          callback: () => {
            this.loaded.createjs = true;
            this.scriptsLoaded();
          },
        },
        {
          src: '/lib/keydrown.min.js',
          callback: () => {
            this.loaded.keydrown = true;
            this.scriptsLoaded();
          },
        },
        {
          src: 'https://code.createjs.com/1.0.0/easeljs.min.js',
          callback: () => {
            this.loaded .easeljs = true;
            this.scriptsLoaded();
          },
        },
         {
          src: 'https://cdnjs.cloudflare.com/ajax/libs/howler/2.2.3/howler.min.js',
          callback: () => {
            this.loaded.howler = true;
            this.scriptsLoaded();
          },
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
            'font-size': '10rem',
            background:
              'linear-gradient(to top, red, orange, yellow, green, blue, indigo, violet)',
            'background-clip': 'text',
            '-webkit-background-clip': 'text',
            '-webkit-text-fill-color': 'transparent',
          };
          break;
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

  mounted() {
    this.fetchBeatmap();
  },

  methods: {
    scriptsLoaded() {
      // If ANY of the boolean values read false, the all scripts are NOT loaded.
      // If NO boolean values read false, then all scritps are loaded.
      this.areAllLoaded = !Object.values(this.loaded).some((bool) => !bool);

   // if (this.areAllLoaded) // {this.init();}
    },
    fetchBeatmap(
      beatmapFileName = "DJ OKAWARI - Flower Dance (Narcissu) [CS' Normal].json"
    ) {
      fetch(`/${beatmapFileName}`)
        .then((response) => (response = response.json()))
        .then((data) => {
          this.beatmapData = data;
          this.notes = data.hitObjects;
          this.loaded.beatmap = true;
          //this.src name of song data
          this.scriptsLoaded();
        });
    },
    init() {

      //if(this.oneButtonClick === true) {
          let sound = new Howl({
  src: ['/songs/241526 Soleily - Renatus/03. Renatus - Soleily 192kbps.mp3'],
   autoplay: true,
    volume: 0.3,
});

sound.play();
        const t = this;
       // t.oneButtonClick = false;


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


//   var sound = new Howl({
//   src: ['/songs/241526 Soleily - Renatus/03. Renatus - Soleily 192kbps.mp3'],
//    autoplay: true,
//     volume: 0.3,
//   onplayerror: function() {
//     sound.once('unlock', function() {
     
      
//     });
//   }
// });






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

        //console.log(circle.y);
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

        //console.log(circle.y);
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

                console.log(diffFromTargetCircle);

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


          thisCircle.cache(0, -85, 120, 120); 
        //   thisCircle.cache(0, -85, 120, 120); 

        thisCircle.name = 'thisCircle';
        thisSlider.name = 'thisSlider';

        if (note.type === 'note') { 
            setTimeout(() => {t.columnContainers[note.columnIndex].addChild(thisCircle);
        //  t.columnContainers[note.columnIndex].addChild(thisCircle);
          // Creates the circle "template" for later use to initialize a shape
          // Sets the delay before the notes animate (or before the notes drop)
          createjs.Tween.get(thisCircle, { onComplete: animateCircle })//.wait(
            //  note.time -
            //    t.beatmapIntro -
            //   (6860 * (650 / 700) + 6860) / t.scrollSpeed
         // );
          function animateCircle() {
            
            /*
            useTicks: uses update ticks (60 fps) instead of ms
            onChange: runs ths function when the position is changed (thus this function is run every tick)
            onComplete: runs this function when animation is done
            */
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
          }},     note.time -
               t.beatmapIntro -
              (6860 * (650 / 700) + 6860) / t.scrollSpeed);

        } else if (note.type === 'hold') {
          sliderHeight =
            (t.dy * t.stageFPS * (note.endTime - note.time)) / 1000;

          //console.log(sliderHeight);

          // Creates the slider "template" for later use to initialize a shape
           // setTimeout(() => { t.columnContainers[note.columnIndex].addChild(thisSlider)}, 5000);
           setTimeout(() => { createjs.Tween.get(thisSlider, { onComplete: animate1 })

          function animate1() {
            /*
            useTicks: uses update ticks (60 fps) instead of ms
            onChange: runs ths function when the position is changed (thus t function is run every tick)
            onComplete: runs this function when animation is done
            */
            createjs.Tween.get(thisSlider, {
              useTicks: true,
              onChange: onChange1,
              onComplete: animate1,
            }).to({ y: thisSlider.y + t.dy }, 1);
          }
          function onChange1() {
            // while (h / (scrollSpeed * 1000 * canvasHeight) /
            // (60 * (6860 * (650 / 700) + 6860))) {
            //   noteType = "hold";
            // }
            // If it reaches offscreen, dismount the circle
            if (thisSlider.y - sliderHeight > t.canvasHeight + 2 * t.radius) {
              t.columnContainers[note.columnIndex].removeChild(thisSlider);
            }
          }},note.time -
              t.beatmapIntro -
              (6860 * (650 / 700) + 6860) / t.scrollSpeed);
        
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
.button {
  height: 20vh;
  width: 20vw;
  color: black;
  font-size: 3rem;
}
#test-game-index {
  width: 100vw;
  height: 100vh;
background-color: wheat;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}

.statistics-container {
  width: 40%;
  font-size: 1rem;
}
</style>
