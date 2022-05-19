<template>
  <div class="background">
    <button class="btn" @click="gameStart()">
        GAME START
    </button>
        <!-- <canvas id="game__canvas" >
    </canvas> -->
  </div>
</template>

<script>
 /* eslint-disable */ 
export default {
  layout: 'nonav',

  data() {
    return {
      loaded: {
        createjs: false,
        keydrown: false,
      },
      areAllLoaded: false,
      started: false,

      // beatmaps data
      i: 0,
      notes: [],
      texture: null,
      score: 0,
      combo: 0,
      maxCombo: 0,
      scrollSpeed: 15,
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

      missedCombo: 0,
      comboOn: false,
      comboReset: false,

      comboVKey: 0,
      hitValueVKey: 1,

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

      numColumns: 4,
      columnWidth: 100, // in px (we change this to rem later)
      canvasWidth: 400,
      targetCircle: null,
      gameCircle1: null,

      stage: null,
      stageWidth: null,
      stageColWidth: null,
      stageHeight: 900,
      stageFPS: 60,
      // Stands for stageSetup
      ss: {
        setupContainer: null,
        columnContainers: [],
        columnBorders: [],
        targetCircles: [],
        targetCirclesGraphics: [],
      },
      notesToFallArray: [],
      remainingNotes: null,
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
      circleContainer: [],
      childIndx: null,
      child: null,
      chunkSize: 4,
      gameCircle:null,
      gameCircleAnim: null,
      t1: null,
      t2: null,
          t3: null,
      t4: null,
    };
  },

  created() {
    this.notes = this.$store.state.beatmapData.hitObjects;
  },

  methods: {
    gameStart() {
      const t = this;

      // t.notes.forEach(element => {
      //      console.log(element.columnIndex)
      // });
      //   t.notes = t.beatmapData.hitObjects;
      t.remainingNotes = t.notes.length;
      t.numColumns = t.$store.state.beatmapData.columns;

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

      // Move container to the center



// Move container to the center

// Listen for animate update

// const renderer = new PIXI.Renderer({
//   width:400,
//   height: 900,
// })
      // Sets the canvas width/height pixels = to canvas display size width/height

 const app = new PIXI.Application({
  width: 400,
  height: 900,
  backgroundColor: 0x2c3e50
});
document.body.appendChild(app.view);
// const ticker = new PIXI.Ticker();


      // app.stage.addChild(circle )

// app.stage.addChild(circle )
 t.targetCircle  = new PIXI.Graphics();

for (let i = 0; i < t.numColumns; i++) {

    

 t.targetCircle.beginFill(0xFF0000);
 t.targetCircle.drawCircle( 100 * (i + 0.5), t.hitPercent * t.stageHeight, t.radius);
 t.targetCircle.endFill();

app.stage.addChild( t.targetCircle);

      for (let i = 0; i < t.numColumns; i++) {
        t.targetCircle.beginFill(0xff0000);
        t.targetCircle.drawCircle(
          100 * (i + 0.5),
          t.hitPercent * t.stageHeight,
          t.radius
        );
        t.targetCircle.endFill();

       app.stage.addChild(t.targetCircle);
      }

}

// let container = new PIXI.ParticleContainer();




// let tick = 5;

//   const gameCircle = new PIXI.Sprite(texture);
//        gameCircle.interactive = true;
//  gameCircle.hitArea = new PIXI.Rectangle(0, 0, 400, 100);
const sprites = new PIXI.ParticleContainer(t.notes.length, {
    scale: true,
    position: true,
    rotation: true,
    roundPixels: false, 
    uvs: true,
    alpha: true,
});

const notes = [];//
app.stage.addChild(sprites);
// const totalSprites = app.renderer instanceof PIXI.Renderer ? t.notes.length : 100;

    // for (let i = 0; i <  t.notes.length; i += t.chunkSize) {
    // const chunk = t.notes.slice(i, i + t.chunkSize);
         t.notes.forEach((note, index) => {
            
       setTimeout(() => {
        //  const gameCircle = new PIXI.Sprite(texture);

     t.gameCircle = PIXI.Sprite.from('https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Circle_-_black_simple.svg/500px-Circle_-_black_simple.svg.png');
           t.gameCircle.y = -40
    t.gameCircle.width = 80;
    t.gameCircle.height = 80;
    t.gameCircle.anchor.set(0.5);

        notes.push(t.gameCircle);



        if( note.columnIndex === 0) {
             t.gameCircle.x = 100 * (0 + 0.5)
                     sprites.addChild(t.gameCircle);
        }
        // else if( note.columnIndex === 1) {
        //      t.gameCircle.x = 100 * (1 + 0.5)
        //             sprites.addChild(t.gameCircle);
        // }
        //        else if( note.columnIndex === 2) {
        //      t.gameCircle.x = 100 * (2 + 0.5)
        //             sprites.addChild(t.gameCircle);
        // }
        // else {
        //      t.gameCircle.x = 100 * (3 + 0.5)
        //          sprites.addChild(t.gameCircle);
        // }


        app.ticker.add((delta) => {
            t.gameCircleAnim = notes[index];
         t.gameCircleAnim.y += 5 * delta
  if(   t.gameCircleAnim.y > 150 ){
      t.t2 =  t.gameCircleAnim
  }
        
         if(   t.gameCircleAnim.y > 750 ) { 
          t.t1 = t.gameCircleAnim.y
          t.t2 = t.gameCircleAnim
     
                   sprites.removeChild(t.t2);

}  
})
     

      //  t.childIndx = container.getChildAt(index)
    // t.child = container.getChildAt(index)
    // t.childIndx = container.getChildIndex(t.childIndx)
    // console.log(t.childIndx)

   // const childIndx = container.getChildAt(index)

      }, note.time-25000);
   
    // do whatever
})
  window.addEventListener('keydown', function (e) {
        if (e.code === 'KeyD') {
            console.log(   t.gameCircleAnim )
 
          if( t.gameCircleAnim.x === 50) {
            console.log("hi")
          }

          if ( t.t1 > 600 ) {
        // console.log( t.gameCircleAnim.y);
             sprites.removeChild(t.t2);
          }
        }
      });


    // tick += 0.1;
// }

} }
  }

</script>

<style scoped>
.background {
  background-color: white;
  width: 100vw;
  height: 10vh;
}

.btn {
  color: black;
  font-size: 5rem;
  height: 10rem;
  width: 100rem;
}
</style>
