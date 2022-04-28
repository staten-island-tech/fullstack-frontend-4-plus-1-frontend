<template>
  <div class="game-canvas-container" :style="{ width: canvasWidth + 'px' }">
    <canvas id="canvas" :style="{ width: canvasWidth + 'px' }">
      Canvas is not supported on your browser.
    </canvas>

    <div class="hitCombo__container" :style="{ width: canvasWidth + 'px' }">
      <h1 id="combo">x{{ combo }}</h1>
      <h1 id="hitValue" :style="lastestHitStyle">
        {{ displayedLatestHit }}
      </h1>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    beatmapData: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style></style>
