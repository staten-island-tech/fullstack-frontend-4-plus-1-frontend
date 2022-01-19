<template>
    <div>
        <div class="canvas-container">
            <canvas id="canvas"></canvas>
        </div>
        <div>
            <h1 id="score">Score: 0</h1>
            <h1 id="combo">Combo: 0</h1>
            <h1 id="speed">Scroll Speed: ?</h1>
         </div>
    </div>
</template>

<script>
// import Game from 'Game'
export default {

}
</script>

<style>
body {
  box-sizing: border-box;
  margin: 0;

  display: flex;
  align-items: center;
  justify-content: space-evenly;
}



#canvas {
    border: 3px solid black;
      width: 50vh;
  height: 50vw;
  /* width: 100%;
  height: 100%; */
}

</style>