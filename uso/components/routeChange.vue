<template>
  <div id="app">
    <nuxt />
  </div>
</template>


<script>
export default {
  /* eslint-disable */


  
    data() {
    return {
      page:  this.$route.name
    }
  },



        watch: {

   $route(to, from) {
    console.log(this.page)
           console.log(from.name)
      if (to.name !== "play" ) {// if you're going to somewhere else than `wallpaper`
      // the `return` will end the execution and not go further

         this.music.stop()
      }
      else {
        console.log("yes refresh yo")
      
      }
    },
  },
  components: {},
  /* head() {
    return {
      titleTemplate: '%s - Real World Events', 
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Where you can find all the events taking pla`ce in your neighborhood',
        },
      ],
    }
  }, */
  methods: {
   onLoad() {
     {
        t.music = new Howl({
          src: [
            `/beatmaps/${t.beatmapData.metadata.BeatmapSetID}/${t.beatmapData.general.AudioFilename}`,
          ],
          volume: t.volume,
            preload: 'metadata',
          onload: () => (t.songLoaded = true),
        });
     }
   }
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Dongle:wght@300;400;700&display=swap');

/* html {
  -webkit-text-size-adjust: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
} */

body {
  margin: 0;
  font-family: 'Dongle', sans-serif;
  font-size: 16px;
  line-height: 1.25;
  /* background-color: rgb(15, 15, 15); */
  background-image: url('~/assets/images/backgrounds/background.png');
}

</style>
