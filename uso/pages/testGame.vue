<template>
  <div id="test-game-index">
    <div class="canvas-container" :style="{ width: canvasWidth + 'px', height: canvasHeight + 'px' }">
      <canvas id="canvas" :style="{ width: canvasWidth + 'px', height: canvasHeight + 'px' }">Canvas is not supported on your browser.</canvas>
    </div>
    <div>
      <h1 id="score">Score: {{ score }}</h1>
      <h1 id="combo">Combo: {{ combo }}</h1>
      <h1 id="speed">Scroll Speed: {{ scrollSpeed }}</h1>
    </div>
  </div>
</template>

<script>
/* global createjs */
/* eslint-disable */

export default {
  head: {
    script: [
      {
        src: "/lib/createjs.min.js", 
       },
             {
        src: "/lib/tweenjs.min.js", 
       },
    ],
  },
  
  // head() {
  //   return {
  //     script: [
  //       { src: "/lib/createjs.min.js",
  //       body: true, /* callback: () => {
  //         console.log("1");
  //         this._mounted();
  //         console.log("2");
          
  //       } */}, { src: "/lib/keydrown.min.js" }
  //     ]
  //   }
  // },
  
  data() {
    return {
       externalLoaded: false,
      isCreatejsLoaded: false,

      score: 0,
      combo: 0,
      scrollSpeed: 10,

      keys: ["d", "f", "j", "k"],

      numColumns: 4,
      columnWidth: 100, // in px (we change this to rem later)
      canvasHeight: 700, // in px (we change this to rem later)

      circleColors: ["#FFE6CC", "#E1D5E7", "#DAE8FC", "#F8CECC"],
      radius: 40,

      thisCircle: null,
      stage: null,
      stageWidth: null,
      stageColWidth: null,
      stageHeight: null,
      columnContainers: [],
      loader: null,
      targetCircles: [],
      circles: null,

      beatmapData: {},
      notes: [],
    }
  },


  computed: {
    canvasWidth() {
      return this.numColumns * this.columnWidth;
    }
  },


  mounted() {
    this._fetch();
  },

  methods: {
    _fetch() {
      fetch("/DJ OKAWARI - Flower Dance (Narcissu) [CS' Normal].json").then((response) => response = response.json()).then(data => {
          this.beatmapData = data;
          this.notes = data.hitObjects;
          this.init();
        })
    },
    init() {
      const t = this;

      const $canvas = document.querySelector("#canvas");

      // Sets the canvas width/height pixels = to canvas display size width/height
      $canvas.width = $canvas.offsetWidth;
      $canvas.height = $canvas.offsetHeight;

      t.stage = new createjs.Stage("canvas");
      t.stageWidth = t.stage.canvas.width;
      t.stageColWidth = t.stageWidth / t.numColumns;
      t.stageHeight = t.stage.canvas.height;

      /* ===============
          TICKER
          =============== */

      createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
      // Each tick is run 1/60 times per second
      createjs.Ticker.framerate = 60;
      // Automatically updates the stage every tick (aka frame)
      createjs.Ticker.addEventListener("tick", t.stage);

      /* ===============
          BACKGROUND
          =============== */

      const background = new createjs.Shape();

      // Draws the gray background on the canvas
      background.graphics
        .beginFill("#D3D3D3")
        .drawRect(0, 0, t.stageWidth, t.stageHeight);

      // "Mounts" the background to the stage
      t.stage.addChild(background);

      /* ===============
          COLUMN CONTAINER
          =============== */

      for (let i = 0; i < t.numColumns; i++) {
        // Creates a new column container for each column
        t.columnContainers.push(new createjs.Container());

        // Sets the x-offset for each container
        t.columnContainers[i].x = i * 100;

        // "Mounts" the container to the stage
        t.stage.addChild(t.columnContainers[i]);
      }

      /* ===============
          COLUMN BORDERS
          =============== */

      // Creates a graphic which is then used as a template for the shape (which we mount onto the canvas)
      const borderGraphic = new createjs.Graphics()
        .beginStroke("Black")
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
        .beginStroke("Black")
        .beginFill("Gray")
        .drawCircle(50, t.stageHeight - 50, t.radius);

      t.columnContainers.forEach((container) => {
        const targetCircle = new createjs.Shape(circleGraphic);

        t.targetCircles.push(targetCircle);

        container.addChild(targetCircle);
      });

      /* ===============
              NOTES
          =============== */

      t.notes.forEach((note) => {
        const h = (note.endTime - note.time) / 1.25;

        const sliderGraphic = new createjs.Graphics()
        .beginStroke("Black")
        .beginFill(t.circleColors[note.columnIndex])
        .drawRoundRectComplex(10, -h, 80, h, 40, 40, 40, 40);
        
        const circleGraphic = new createjs.Graphics()
        .beginStroke("Black")
        .beginFill(t.circleColors[note.columnIndex])
        .drawCircle(50, -(t.radius), t.radius);

        const Slider = new createjs.Shape(sliderGraphic);
        const thisCircle = new createjs.Shape(circleGraphic);

        thisCircle.name = "thisCircle";
        Slider.name = "Slider";

        // Adds it to the column container which mounts it onto the stage
   
        if (note.type === "hold") {
          console.log(note.type)
          // Creates the circle "template" for later use to initialize a shape
          t.columnContainers[note.columnIndex].addChild(Slider);
          createjs.Tween.get(Slider, { onComplete: animate }).wait(
            note.time - 25000 - (6860 * (650 / 700) + 6860) / t.scrollSpeed
          );

          function animate() {
            /* 
            useTicks: uses update ticks (60 fps) instead of ms
            onChange: runs ths function when the position is changed (thus t function is run every tick)
            onComplete: runs this function when animation is done
            */
            createjs.Tween.get(Slider, {
              useTicks: true,
              onChange: onChange,
              onComplete: animate,
            }).to(
              {
                y:
                  Slider.y +
                  (t.scrollSpeed * 1000 * t.canvasHeight) /
                    (60 * (6860 * (650 / 700) + 6860)),
              },
              1
            );
          }
          function onChange() {
            // while (h / (scrollSpeed * 1000 * canvasHeight) /
            // (60 * (6860 * (650 / 700) + 6860))) {
            //   noteType = "hold";
            // }
            // combo = 0;
            // If it reaches offscreen, dismount the circle
            if (Slider.y - h > t.canvasHeight + 2 * t.radius) {
              t.columnContainers[note.columnIndex].removeChild(Slider);
            }
          }
        } /* ELSEIF NOTE.TYPE === "NOTE" */ else {
          t.columnContainers[note.columnIndex].addChild(thisCircle);
          // Creates the circle "template" for later use to initialize a shape
          // Sets the delay before the notes animate (or before the notes drop)
          createjs.Tween.get(thisCircle, { onComplete: animateCircle }).wait(
            note.time - 25000 - (6860 * (650 / 700) + 6860) / t.scrollSpeed
          );
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
            }).to(
              {
                y:
                  thisCircle.y +
                  (t.scrollSpeed * 1000 * t.canvasHeight) /
                    (60 * (6860 * (650 / 700) + 6860)),
              },
              1
            );
          }
          function onChange() {
            // noteType = true;
            // If it reaches offscreen then ...
            if (thisCircle.y > t.canvasHeight + 2 * t.radius) {
              // Remove tweens on the object
              createjs.Tween.removeTweens(thisCircle);
              // Reset combo
              // combo = 0;
            
              // $combo.innerHTML = `Combo: ${combo}`;
              // Remove circle from stage
              t.columnContainers[note.columnIndex].removeChild(thisCircle);
            }
          }
        }
      });
      
    },
  },
}

</script>

<style scoped>

#test-game-index {
  box-sizing: border-box;
  margin: 0;

  display: flex;
  align-items: center;
  justify-content: space-evenly;
}


</style>
