<template>
  <div id="app">
    <Nuxt />
  </div>
</template>

<script>
export default {
  /* eslint-disable */
  data() {
    return {
      page: this.$route.name,
    };
  },

  head() {
    return {
      script: [
        {
          src: '/lib/howler.min.js',
        },
      ],
    };
  },

  watch: {
    $route(to, from) {
      if (to.name !== 'play') {
        // if you're going to somewhere else than `wallpaper`
        // the `return` will end the execution and not go further
        console.log('yes1');
        this.music.stop();
      } else {
        console.log('yes refresh yo');
      }
    },
  },
  components: {},
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
    },
  },
};
</script>

<style></style>
