<template>

<div>
  <div class="under-nav"></div>
  <div id="play-index">
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
            <p class="beatmap-set-artist">{{ beatmapSet.artist }}</p>
          </div>
        </div>
        <div class="play-sidebar">
          <div class="play-sidebar-image-container">
            <!-- <img src="/songs/533037 illion - AIWAGUMA/49389130_p0.png" /> -->
            <img src="/songs/476691 DJ OKAWARI - Flower Dance/BG.jpg" />
          </div>
          <div class="play-sidebar-text-container">
            <p class="play-sidebar-text-title">Flower Dance</p>
            <p>Artist: DJ OKAWARI</p>
            <p>Mapper: Narcissu</p>
            <nuxt-link to="/leaderboard" class="">Leaderboard</nuxt-link>
          </div>
          <table class="play-sidebar-difficulties">
            <tbody>
              <tr>
                <th>CS' Normal</th>
                <th>Difficulty: 2</th>
              </tr>
              <tr>
                <th>CS' Hard</th>
                <th>Difficulty: 3</th>
              </tr>
            </tbody>
          </table>
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
          artist: 'Hanatan',
          bgImageURL: 'airmancutebg.jpg',
        },
        '241526 Soleily - Renatus': {
          title: 'Renatus',
          artist: 'Soleily',
          bgImageURL: 'machinetop_background.jpg',
        },
        '277421 Lindsey Stirling - Senbonzakura': {
          title: 'Senbonzakura',
          artist: 'Lindsey Stirling',
          bgImageURL: '1645085.jpg',
        },
        '356253 ginkiha - Borealis': {
          title: 'Borealis',
          artist: 'ginkiha',
          bgImageURL: '1.jpg',
        },
        '476691 DJ OKAWARI - Flower Dance': {
          title: 'Flower Dance',
          artist: 'DJ OKAWARI',
          bgImageURL: 'BG.jpg',
        },
        '533037 illion - AIWAGUMA': {
          title: 'AIWAGUMA',
          artist: 'illion',
          bgImageURL: '49389130_p0.png',
        },
      },
    };
  },
};
</script>

<style scoped>

.under-nav {
  height: 9.5rem;
}

.play-index {
  width: 100vw;
}

.play-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100vh - 9.5rem);
  background-image: url('~/assets/images/backgrounds/fleeting-colors.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  /* background-position: center center; */
}

.play-content > * {
  margin-bottom: 2rem;
}

.play-title-textbox {
  width: 60vw;

  border: 0.125rem solid gray;
  box-shadow: 0.4rem 0.4rem rgb(255, 255, 255, 0.5);
  margin-top: 2rem;
}

.play-title {
  margin: 0.5rem 0rem 0.5rem 1rem;
  font-size: 2.5rem;
}

.song-search-form {
  width: 60vw;

  display: flex;
  justify-content: center;
}

.song-search-form > input {
  font-size: 1.5rem;

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
  --content-width: 60vw;
  --beatmap-set-container-width: 45vw;
  --sidebar: 20rem;

  width: var(--content-width);

  display: flex;
  align-items: flex-start;
}

.play-beatmap-set-container {
  width: calc(var(--content-width) - var(--sidebar));

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  /* Gap => Column Gap, Row Gap */
  gap: 2rem 2rem;
}

.play-beatmap-set {
  position: relative;

  width: 16rem;
  height: 9rem;

  border: 0.2rem solid white;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  overflow: hidden;

  transition: 0.3s all;
  background-image: url(~/assets/images/navigation/nav-bg.jpg);
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

.beatmap-set-artist {
  font-size: 1.5rem;
}

.play-sidebar {
  width: var(--sidebar);
  min-height: 25rem;

  border: 0.2rem solid white;

  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.play-sidebar-image-container {
  width: 100%;

  aspect-ratio: 16 / 9;
}

.play-sidebar-image-container > img {
  width: 100%;

  display: block;

  overflow: hidden;
}

.play-sidebar-text-container > * {
  font-size: 1.5rem;

  margin: 0 0 0 0.5rem;
}

.play-sidebar-text-title {
  font-size: 3rem;
}

.play-sidebar-difficulties {
  width: 100%;

  border-collapse: collapse;
}

.play-sidebar-difficulties > tbody > tr:nth-child(even) {
  background-color: #404040;
}

.play-sidebar-difficulties > tbody > tr:nth-child(odd) {
  background-color: #505050;
}

.play-sidebar-difficulties > tbody > tr > th {
  font-size: 1.5rem;
}
</style>
