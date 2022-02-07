<template>
  <div id="test-game-index">
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
      areScriptsLoaded: {
        createjs: false,
        keydrown: false,
      },
      areAllScriptsLoaded: false,

      score: 0,
      combo: 0,
      scrollSpeed: 10,

      keys: ['d', 'f', 'j', 'k'],

      numColumns: 4,
      columnWidth: 100, // in px (we change this to rem later)
      canvasHeight: 700, // in px (we change this to rem later)

      circleColors: ['#FFE6CC', '#E1D5E7', '#DAE8FC', '#F8CECC'],
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
     firstVal:0,
      beatmapData: {},
      notes: [],
    };
  },

  head() {
    return {
      script: [
        {
          src: '/lib/createjs.min.js',   
          callback: () => {
            this.areScriptsLoaded.createjs = true;
            this.scriptsLoaded();
          },
        },
        {
          src: '/lib/keydrown.min.js',
          callback: () => {
            this.areScriptsLoaded.keydrown = true;
            this.scriptsLoaded();
          },
        },
        {
          src: 'https://code.createjs.com/1.0.0/soundjs.min.js',   
          callback: () => {
            this.areScriptsLoaded.soundjs = true;
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
  },

  mounted() {},

  methods: {
    scriptsLoaded() {
      // If ANY of the boolean values read false, the all scripts are NOT loaded.
      // If NO boolean values read false, then all scritps are loaded.
      this.areAllScriptsLoaded = !Object.values(this.areScriptsLoaded).some(
        (bool) => !bool
      );

      if (this.areAllScriptsLoaded) this.fetchBeatmap();
    },
    fetchBeatmap(
      beatmapFileName = "DJ OKAWARI - Flower Dance (Narcissu) [CS' Normal].json"
    ) {
      fetch(`/${beatmapFileName}`)
        .then((response) => (response = response.json()))
        .then((data) => {
          this.beatmapData = data;
          this.notes = data.hitObjects;
          this.init();
        });
    },
    init() {
      const t = this;

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
createjs.Sound.on("fileload", handleLoadComplete);
createjs.Sound.alternateExtensions = ["mp3"];
createjs.Sound.registerSound({src:"/music_test/file_example_MP3_2MG.mp3", id:"sound"});
function handleLoadComplete(event) {
	createjs.Sound.play("sound");

}
// I think we have to add sound when we click the route 
   window.onload = function() {
	var context = new AudioContext();
  context.resume()
}


 

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

          if (circle.y >= 610  && circle.name === "thisSlider") {
            
            if(t.firstVal === 0) {
              firstValY = diffFromTargetCircle;
              console.log(firstValY)
              t.firstVal = 1;
            }
            if (firstValY >= 0 && firstValY <= 6) {
              scoreMultplier = 300;
            } else if (
              firstValY >= 6 &&
              firstValY <= 12
            ) {
              scoreMultplier = 200;
            } else if (
              firstValY >= 12 &&
              firstValY <= 20
            ) {
              scoreMultplier = 100;
            } else if (firstValY >= 20 &&
              firstValY <= 30) {
              scoreMultplier = 50;
            }
            else {
              scoreMultplier = 1;
            }

  
          }
        });
      
  
    
     //console.log(circle.y);
   });

         kd.D.up(function () {
        t.columnContainers[0].children.forEach((circle) => {
          const diffFromTargetCircle = Math.abs(circle.y - 700);
          if (circle.y >= 610 && circle.name === "Slider") {
            // if (t.firstVal === 1) {
            //   t.firstVal = 0
            // }
            lastValY = diffFromTargetCircle;
         
            let sliderCombo = (lastValY - t.firstValY)/10;
            let sliderScore = sliderCombo * scoreMultplier
            console.log( sliderScore)
            console.log( sliderCombo)
            console.log( scoreMultplier)
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

                if (diffFromTargetCircle >= 0 && diffFromTargetCircle <= 6) {
                  t.score += 300 * t.combo;
                } else if (
                  diffFromTargetCircle >= 6 &&
                  diffFromTargetCircle <= 12
                ) {
                  t.score += 200 * t.combo;
                } else if (
                  diffFromTargetCircle >= 12 &&
                  diffFromTargetCircle <= 20
                ) {
                  t.score += 100 * t.combo;
                } else {
                  t.score += 50 * t.combo;
                }

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
            -sliderHeight,
            80,
            sliderHeight,
            40,
            40,
            40,
            40
          );

        const thisCircle = new createjs.Shape(circleGraphic);
        const thisSlider = new createjs.Shape(sliderGraphic);

        thisCircle.name = 'thisCircle';
        thisSlider.name = 'thisSlider';

        if (note.type === 'note') {
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

              // $combo.innerHTML = `Combo: ${combo}`;
              // Remove circle from stage
              t.columnContainers[note.columnIndex].removeChild(thisCircle);
            }
          }
        } else if (note.type === 'hold') {
          sliderHeight =
            (t.dy * t.stageFPS * (note.endTime - note.time)) / 1000;

          //console.log(sliderHeight);

          // Creates the slider "template" for later use to initialize a shape
          t.columnContainers[note.columnIndex].addChild(thisSlider);
          createjs.Tween.get(thisSlider, { onComplete: animate }).wait(
            note.time - 25000 - (6860 * (650 / 700) + 6860) / t.scrollSpeed
          );

          function animate() {
            /*
            useTicks: uses update ticks (60 fps) instead of ms
            onChange: runs ths function when the position is changed (thus t function is run every tick)
            onComplete: runs this function when animation is done
            */
            createjs.Tween.get(thisSlider, {
              useTicks: true,
              onChange: onChange,
              onComplete: animate,
            }).to({ y: thisSlider.y + t.dy }, 1);
          }
          function onChange() {
            // while (h / (scrollSpeed * 1000 * canvasHeight) /
            // (60 * (6860 * (650 / 700) + 6860))) {
            //   noteType = "hold";
            // }
            // combo = 0;
            // If it reaches offscreen, dismount the circle
            if (thisSlider.y - sliderHeight > t.canvasHeight + 2 * t.radius) {
              t.columnContainers[note.columnIndex].removeChild(thisSlider);
            }
          }
        } else {
          console.log(`Invalid note type: ${note.type}`);
        }
      });
    },
  },
};
</script>

<style scoped>
#test-game-index {
  box-sizing: border-box;
  margin: 0;

  display: flex;
  align-items: center;
  justify-content: space-evenly;
}
</style>q   jatgfr5
