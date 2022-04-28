<template>
  <!-- Replace 400px with canvasWidth -->

  <div id="canvas__container" :style="{ width: `calc(400px + 2rem)` }">
    <canvas id="canvas" :style="{ width: '400' + 'px' }">
      Canvas is not supported on your browser.
    </canvas>

    <div id="hitCombo__container" :style="{ width: '400' + 'px' }">
      <h1 id="game-combo">{{ combo }}</h1>
      <h1 id="game-hitValue" :style="lastestHitStyle">
        {{ displayedLatestHit }}
      </h1>
    </div>

    <div id="hp-bar__container">
      <div id="hp-bar" :style="{ height: health + '%' }"></div>
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

<style scoped>
#canvas__container {
  height: 100%;
}

#canvas__container > * {
  position: absolute;
  height: 100%;
}

#canvas {
  background-color: #181818;
}

#hitCombo__container {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  color: #fff;
}

#hitCombo__container > h1 {
  line-height: 1;
  height: 10rem;
}

#game-combo {
  font-size: 9rem;
  font-weight: 400;
}

#game-hitValue {
  font-size: 14rem;
  font-weight: 300;
}

#hp-bar__container {
  transform: rotate(180deg);
  height: 30vh;
  width: 2rem;

  position: relative;
  right: 50%;

  padding: 0.5rem;
  border-radius: 1rem;

  background-color: white;
}

#hp-bar {
  height: 0%;

  transition: height 0.15s linear;

  background-color: #38b000;
  border-radius: 0.5rem;
  box-shadow: inset -0.1rem -0.1rem 1rem rgb(0 0 0 / 0.5);
}
</style>
