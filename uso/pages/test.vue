<template>
  <div id="test-index">
    <div class="spacing-div"></div>
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
  </div>
</template>

<script>
/* global createjs:false */

export default {
  data() {
    return {
      loaded: {
        createjs: false,
      },
      areAllLoaded: false,

      canvasWidth: 500,
      canvasHeight: 500,

      stage: null,
      stageWidth: null,
      stageColWidth: null,
      stageHeight: null,
      stageFPS: 60,

      circle: null,
    };
  },
  head() {
    return {
      script: [
        {
          src: '/lib/createjs.min.js',
          callback: () => (this.loaded.createjs = true),
        },
      ],
    };
  },
  watch: {
    loaded: {
      handler(newValue, oldValue) {
        const t = this;

        // If ANY of the boolean values read false, the all scripts are NOT loaded.
        // If NO boolean values read false, then all scritps are loaded.
        t.areAllLoaded = !Object.values(t.loaded).some((bool) => !bool);

        if (t.areAllLoaded) t.init();
      },
      deep: true,
    },
  },
  methods: {
    init() {
      const t = this;

      /* ===============
          CANVAS SETUP
          =============== */

      const $canvas = document.querySelector('#canvas');

      // Sets the canvas width/height pixels = to canvas display size width/height
      $canvas.width = $canvas.offsetWidth;
      $canvas.height = $canvas.offsetHeight;

      t.stage = new createjs.Stage('canvas');
      t.stageWidth = t.stage.canvas.width;
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

      const background = new createjs.Shape();

      // Draws the gray background on the canvas
      background.graphics
        .beginFill('#D3D3D3')
        .drawRect(0, 0, t.stageWidth, t.stageHeight);

      // "Mounts" the background to the stage
      t.stage.addChild(background);

      // Test Circle

      const circleGraphic = new createjs.Graphics()
        .beginStroke('Black')
        .beginFill('Gray')
        .drawCircle(100, 100, 50);

      t.circle = new createjs.Shape(circleGraphic);

      t.stage.addChild(t.circle);
    },
  },
};
</script>

<style>
.spacing-div {
  width: 1rem;
  height: 12rem;
}
</style>
