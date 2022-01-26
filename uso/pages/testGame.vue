<template>
  <div id="test-game-index">
    <div class="canvas-container">
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
    }
  },

  head() {
    return {
      script: [
        { src: "/lib/createjs.min.js", callback: () => {
          this._mounted();
        }}
      ]
    }
  },

  computed: {},

  created () {},

  mounted () {},

  methods: {
    _mounted() {
      const $canvas = document.querySelector("#canvas");
      const $canvasContainer = document.querySelector(".canvas-container");
      
      // Sets the canvas container display size
      $canvasContainer.style.width = `${this.canvasWidth}px`;
      $canvasContainer.style.height = `${this.canvasHeight}px`;

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

    },
    _mounted2() {
      console.log("HELLO");
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

/* .canvas-container {
  width: 64rem;
  height: 48rem;
} */

#canvas {
  border: 0.1rem solid black;
  width: 100%;
  height: 100%;
}
</style>
