<template>
  <div id="test-game-index">
    <div class="canvas-container" :style="{ width: canvasWidth + 'px', height: canvasHeight + 'px' }">
      <canvas id="canvas">Canvas is not supported on your browser.</canvas>
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
  data() {
    return {
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
      notes: [
        {
            "x": 448,
            "time": 26597,
            "type": "note",
            "hitSound": 0,
            "hitSample": {
                "normalSet": 0,
                "additionSet": 0,
                "index": 0,
                "volume": 0,
                "filename": ""
            },
            "columnIndex": 3
        },
        {
            "x": 64,
            "time": 26897,
            "type": "note",
            "hitSound": 0,
            "hitSample": {
                "normalSet": 0,
                "additionSet": 0,
                "index": 0,
                "volume": 0,
                "filename": ""
            },
            "columnIndex": 0
        },
        {
            "x": 192,
            "time": 27347,
            "type": "note",
            "hitSound": 0,
            "hitSample": {
                "normalSet": 0,
                "additionSet": 0,
                "index": 0,
                "volume": 0,
                "filename": ""
            },
            "columnIndex": 1
        },
        {
            "x": 320,
            "time": 27497,
            "type": "note",
            "hitSound": 0,
            "hitSample": {
                "normalSet": 0,
                "additionSet": 0,
                "index": 0,
                "volume": 0,
                "filename": ""
            },
            "columnIndex": 2
        },
        {
            "x": 448,
            "time": 27647,
            "type": "note",
            "hitSound": 0,
            "hitSample": {
                "normalSet": 0,
                "additionSet": 0,
                "index": 0,
                "volume": 0,
                "filename": ""
            },
            "columnIndex": 3
        },
        {
            "x": 64,
            "time": 27797,
            "type": "note",
            "hitSound": 0,
            "hitSample": {
                "normalSet": 0,
                "additionSet": 0,
                "index": 0,
                "volume": 0,
                "filename": ""
            },
            "columnIndex": 0
        },
        {
            "x": 192,
            "time": 28097,
            "type": "note",
            "hitSound": 0,
            "hitSample": {
                "normalSet": 0,
                "additionSet": 0,
                "index": 0,
                "volume": 0,
                "filename": ""
            },
            "columnIndex": 1
        },
        {
            "x": 448,
            "time": 28397,
            "type": "note",
            "hitSound": 0,
            "hitSample": {
                "normalSet": 0,
                "additionSet": 0,
                "index": 0,
                "volume": 0,
                "filename": ""
            },
            "columnIndex": 3
        },
        {
            "x": 320,
            "time": 28997,
            "type": "note",
            "hitSound": 0,
            "hitSample": {
                "normalSet": 0,
                "additionSet": 0,
                "index": 0,
                "volume": 0,
                "filename": ""
            },
            "columnIndex": 2
        },
        {
            "x": 192,
            "time": 29447,
            "type": "note",
            "hitSound": 0,
            "hitSample": {
                "normalSet": 0,
                "additionSet": 0,
                "index": 0,
                "volume": 0,
                "filename": ""
            },
            "columnIndex": 1
        },
        {
            "x": 448,
            "time": 29597,
            "type": "note",
            "hitSound": 0,
            "hitSample": {
                "normalSet": 0,
                "additionSet": 0,
                "index": 0,
                "volume": 0,
                "filename": ""
            },
            "columnIndex": 3
        },
        {
            "x": 320,
            "time": 30047,
            "type": "note",
            "hitSound": 0,
            "hitSample": {
                "normalSet": 0,
                "additionSet": 0,
                "index": 0,
                "volume": 0,
                "filename": ""
            },
            "columnIndex": 2
        },
        {
            "x": 64,
            "time": 30197,
            "type": "note",
            "hitSound": 0,
            "hitSample": {
                "normalSet": 0,
                "additionSet": 0,
                "index": 0,
                "volume": 0,
                "filename": ""
            },
            "columnIndex": 0
        },
        {
            "x": 192,
            "time": 30497,
            "type": "note",
            "hitSound": 0,
            "hitSample": {
                "normalSet": 0,
                "additionSet": 0,
                "index": 0,
                "volume": 0,
                "filename": ""
            },
            "columnIndex": 1
        },
        {
            "x": 448,
            "time": 30797,
            "type": "note",
            "hitSound": 0,
            "hitSample": {
                "normalSet": 0,
                "additionSet": 0,
                "index": 0,
                "volume": 0,
                "filename": ""
            },
            "columnIndex": 3
        },
        {
            "x": 320,
            "time": 31097,
            "type": "note",
            "hitSound": 0,
            "hitSample": {
                "normalSet": 0,
                "additionSet": 0,
                "index": 0,
                "volume": 0,
                "filename": ""
            },
            "columnIndex": 2
        },
        {
            "x": 64,
            "time": 31397,
            "type": "note",
            "hitSound": 0,
            "hitSample": {
                "normalSet": 0,
                "additionSet": 0,
                "index": 0,
                "volume": 0,
                "filename": ""
            },
            "columnIndex": 0
        },
        {
            "x": 192,
            "time": 31697,
            "type": "note",
            "hitSound": 0,
            "hitSample": {
                "normalSet": 0,
                "additionSet": 0,
                "index": 0,
                "volume": 0,
                "filename": ""
            },
            "columnIndex": 1
        },
        {
            "x": 448,
            "time": 31997,
            "type": "note",
            "hitSound": 0,
            "hitSample": {
                "normalSet": 0,
                "additionSet": 0,
                "index": 0,
                "volume": 0,
                "filename": ""
            },
            "columnIndex": 3
        },
        {
            "x": 64,
            "time": 32297,
            "type": "note",
            "hitSound": 0,
            "hitSample": {
                "normalSet": 0,
                "additionSet": 0,
                "index": 0,
                "volume": 0,
                "filename": ""
            },
            "columnIndex": 0
        },
        {
            "x": 192,
            "time": 32597,
            "type": "note",
            "hitSound": 0,
            "hitSample": {
                "normalSet": 0,
                "additionSet": 0,
                "index": 0,
                "volume": 0,
                "filename": ""
            },
            "columnIndex": 1
        },
        {
            "x": 320,
            "time": 32897,
            "type": "note",
            "hitSound": 0,
            "hitSample": {
                "normalSet": 0,
                "additionSet": 0,
                "index": 0,
                "volume": 0,
                "filename": ""
            },
            "columnIndex": 2
        },
        {
            "x": 64,
            "time": 33197,
            "type": "note",
            "hitSound": 0,
            "hitSample": {
                "normalSet": 0,
                "additionSet": 0,
                "index": 0,
                "volume": 0,
                "filename": ""
            },
            "columnIndex": 0
        },
        {
            "x": 448,
            "time": 33497,
            "type": "note",
            "hitSound": 0,
            "hitSample": {
                "normalSet": 0,
                "additionSet": 0,
                "index": 0,
                "volume": 0,
                "filename": ""
            },
            "columnIndex": 3
        },
        {
            "x": 192,
            "time": 33797,
            "type": "note",
            "hitSound": 0,
            "hitSample": {
                "normalSet": 0,
                "additionSet": 0,
                "index": 0,
                "volume": 0,
                "filename": ""
            },
            "columnIndex": 1
        },
      ],
    }
  },

  head() {
    return {
      script: [
        { src: "/lib/createjs.min.js", /* callback: () => {
          console.log("1");
          this._mounted();
          console.log("2");
        } */}
      ]
    }
  },

  computed: {
    canvasWidth() {
      return this.numColumns * this.columnWidth;
    }
  },

  created () {
    /* try {
      fetch("/DJ OKAWARI - Flower Dance (Narcissu) [CS' Normal].json").then((response) => response = response.json()).then(data => {
        this.beatmapData = data;
        this.notes = data.hitObjects;
      })
    } catch (error) {
      console.log(error);
    } */
  },

  beforeMount() {
    try {
      fetch("/DJ OKAWARI - Flower Dance (Narcissu) [CS' Normal].json").then((response) => response = response.json()).then(data => {
        this.beatmapData = data;
        this.notes = data.hitObjects;
      })
    } catch (error) {
      console.log(error);
    }
  },

  mounted () {
    this._mounted();
  },

  methods: {
    _mounted() {
      const self = this;
      
      /* fetch("/DJ OKAWARI - Flower Dance (Narcissu) [CS' Normal].json").then((response) => response = response.json()).then(data => {
          this.beatmapData = data;
          this.notes = data.hitObjects;
        }) */

      const $canvas = document.querySelector("#canvas");

      // Sets the canvas width/height pixels = to canvas display size width/height
      $canvas.width = $canvas.offsetWidth;
      $canvas.height = $canvas.offsetHeight;

      this.stage = new createjs.Stage("canvas");
      this.stageWidth = this.stage.canvas.width;
      this.stageColWidth = this.stageWidth / this.numColumns;
      this.stageHeight = this.stage.canvas.height;

      /* ===============
          TICKER
          =============== */

      createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
      // Each tick is run 1/60 times per second
      createjs.Ticker.framerate = 60;
      // Automatically updates the stage every tick (aka frame)
      createjs.Ticker.addEventListener("tick", this.stage);

      /* ===============
          BACKGROUND
          =============== */

      const background = new createjs.Shape();

      // Draws the gray background on the canvas
      background.graphics
        .beginFill("#D3D3D3")
        .drawRect(0, 0, this.stageWidth, this.stageHeight);

      // "Mounts" the background to the stage
      this.stage.addChild(background);

      /* ===============
          COLUMN CONTAINER
          =============== */

      for (let i = 0; i < this.numColumns; i++) {
        // Creates a new column container for each column
        this.columnContainers.push(new createjs.Container());

        // Sets the x-offset for each container
        this.columnContainers[i].x = i * 100;

        // "Mounts" the container to the stage
        this.stage.addChild(this.columnContainers[i]);
      }

      /* ===============
          COLUMN BORDERS
          =============== */

      // Creates a graphic which is then used as a template for the shape (which we mount onto the canvas)
      const borderGraphic = new createjs.Graphics()
        .beginStroke("Black")
        .drawRect(0, 0, this.stageColWidth, this.stageHeight);

      this.columnContainers.forEach((container) => {
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
        .drawCircle(50, this.stageHeight - 50, this.radius);

      this.columnContainers.forEach((container) => {
        const targetCircle = new createjs.Shape(circleGraphic);

        this.targetCircles.push(targetCircle);

        container.addChild(targetCircle);
      });

      /* ===============
              NOTES
          =============== */

      this.notes.forEach((note) => {
        console.log(note);
        const h = (note.endTime - note.time) / 1.25;

        const sliderGraphic = new createjs.Graphics()
        .beginStroke("Black")
        .beginFill(this.circleColors[note.columnIndex])
        .drawRoundRectComplex(10, -h, 80, h, 40, 40, 40, 40);
        
        const circleGraphic = new createjs.Graphics()
        .beginStroke("Black")
        .beginFill(this.circleColors[note.columnIndex])
        .drawCircle(50, 2(this.radius), this.radius);

        const Slider = new createjs.Shape(sliderGraphic);
        const thisCircle = new createjs.Shape(circleGraphic);

        thisCircle.name = "thisCircle";
        Slider.name = "Slider";

        // Adds it to the column container which mounts it onto the stage
   
        if (note.type === "hold") {
          console.log(note.type)
          // Creates the circle "template" for later use to initialize a shape
          this.columnContainers[note.columnIndex].addChild(Slider);
          createjs.Tween.get(Slider, { onComplete: animate }).wait(
            note.time - 25000 - (6860 * (650 / 700) + 6860) / this.scrollSpeed
          );

          function animate() {
            /* 
            useTicks: uses update ticks (60 fps) instead of ms
            onChange: runs ths function when the position is changed (thus this function is run every tick)
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
                  (this.scrollSpeed * 1000 * this.canvasHeight) /
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
            if (Slider.y - h > this.canvasHeight + 2 * this.radius) {
              this.columnContainers[note.columnIndex].removeChild(Slider);
            }
          }
        } /* ELSEIF NOTE.TYPE === "NOTE" */ else {
          this.columnContainers[note.columnIndex].addChild(thisCircle);
          // Creates the circle "template" for later use to initialize a shape
          // Sets the delay before the notes animate (or before the notes drop)
          createjs.Tween.get(thisCircle, { onComplete: animateCircle }).wait(
            note.time - 25000 - (6860 * (650 / 700) + 6860) / this.scrollSpeed
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
                  (this.scrollSpeed * 1000 * this.canvasHeight) /
                    (60 * (6860 * (650 / 700) + 6860)),
              },
              1
            );
          }
          function onChange() {
            // noteType = true;
            // If it reaches offscreen then ...
            if (thisCircle.y > this.canvasHeight + 2 * this.radius) {
              // Remove tweens on the object
              createjs.Tween.removeTweens(thisCircle);
              // Reset combo
              // combo = 0;
            
              // $combo.innerHTML = `Combo: ${combo}`;
              // Remove circle from stage
              this.columnContainers[note.columnIndex].removeChild(thisCircle);
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

.canvas-container {
  border: 0.1rem black solid;
}

#canvas {
  width: 100%;
  height: 100%;
}
</style>
