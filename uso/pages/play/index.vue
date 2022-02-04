<template>
  <div id="play-index">
    <nav-bar />
    <div class="play-content">
      <div class="play-title-textbox">
        <h1 class="play-title">Beatmaps</h1>
      </div>

      <form class="song-search-form">
        <input
          class="song-search-bar"
          type="text"
          placeholder="EPIC SEARCH BAR"
        />
        <input class="song-submit-button" type="submit" value="Search" />
      </form>
      <div class="play-beatmap-content">
        <div class="play-beatmap-set-container">
          <div
            v-for="(beatmapSet, key) in beatmapSets"
            :key="key"
            class="play-beatmap-set"
          >
            <img
              class="beatmap-set-img"
              :src="`/songs/${key}/${beatmapSet.bgImageURL}`"
            />
            <p class="beatmap-set-title">{{ beatmapSet.title }}</p>
            <p class="beatmap-set-songwriter">{{ beatmapSet.songwriter }}</p>
          </div>
        </div>
        <div class="play-sidebar">
          <div class="play-sidebar-image-container">
            <img src="/song/476691 DJ OKAWARI - Flower Dance/BG.jpg" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      beatmapSets: {
        '134151 Hanatan - Airman ga Taosenai (SOUND HOLIC Ver)': {
          title: 'Airman ga Taosenai (SOUND HOLIC Ver)',
          songwriter: 'Hanatan',
          bgImageURL: 'airmancutebg.jpg',
        },
        '241526 Soleily - Renatus': {
          title: 'Renatus',
          songwriter: 'Soleily',
          bgImageURL: 'machinetop_background.jpg',
        },
        '277421 Lindsey Stirling - Senbonzakura': {
          title: 'Senbonzakura',
          songwriter: 'Lindsey Stirling',
          bgImageURL: '1645085.jpg',
        },
        '356253 ginkiha - Borealis': {
          title: 'Borealis',
          songwriter: 'ginkiha',
          bgImageURL: '1.jpg',
        },
        '476691 DJ OKAWARI - Flower Dance': {
          title: 'Flower Dance',
          songwriter: 'DJ OKAWARI',
          bgImageURL: 'BG.jpg',
        },
        '533037 illion - AIWAGUMA': {
          title: 'AIWAGUMA',
          songwriter: 'illion',
          bgImageURL: '49389130_p0.png',
        },
      },
    };
  },
};
</script>

<style scoped>
.play-index {
  width: 100vw;
}

.play-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.play-content > * {
  margin-bottom: 2rem;
}

.play-title-textbox {
  width: 60vw;

  border: 0.125rem solid gray;
  box-shadow: 0.4rem 0.4rem rgb(255, 255, 255, 0.5);
}

.play-title {
  margin: 0.5rem 0rem 0.5rem 1rem;
  font-size: 2.5rem;

  color: white;
}

.song-search-form {
  width: 60vw;

  display: flex;
  justify-content: center;
}

.song-search-form > input {
  font-size: 1.5rem;

  color: white;
  background-color: black;

  border: 0.125rem solid gray;
  margin: 0 1rem;
}

.song-search-bar {
  width: 40vw;
  height: 3rem;

  padding: 0 0 0 1rem;
}

.song-submit-button {
  width: 5vw;
  min-width: 4rem;
  height: 3.25rem;
}

.play-beatmap-content {
  width: 60vw;

  display: flex;
}

.play-beatmap-set-container {
  width: 45vw;

  background: yellow;

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.play-beatmap-set {
  position: relative;

  width: 16rem;
  height: 9rem;

  margin: 1rem;
  border: 0.2rem solid white;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  overflow: hidden;

  transition: 0.3s all;
}

.play-beatmap-set:hover {
  transform: scale(1.2);
}

.beatmap-set-img {
  position: absolute;

  width: 100%;

  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  opacity: 0.8;
}

.play-beatmap-set:hover > .beatmap-set-img {
  opacity: 0.5;
}

.play-beatmap-set > p {
  width: 100%;

  color: white;

  margin: 0 0 0 0.5rem;

  display: inline;
  position: relative;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.beatmap-set-title {
  font-size: 2rem;
}

.beatmap-set-songwriter {
  font-size: 1.5rem;
}

.play-sidebar {
  width: 15vw;
  height: 30rem;

  background-color: blue;
}

.play-sidebar-image-container {
  width: 100%;
  aspect-ratio: 16/9;
}

.play-sidebar-image-container > img {
  width: 100%;
  overflow: hidden;
}
</style>
