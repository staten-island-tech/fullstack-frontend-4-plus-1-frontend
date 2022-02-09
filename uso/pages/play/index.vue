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
            v-for="(beatmapSet, key) in beatmapSetsTest"
            :key="key"
            class="play-beatmap-set"
          >
            <img
              class="beatmap-set-img"
              :src="`/beatmaps/${key}/${beatmapSet.bgImageURL}`"
            />
            <p class="beatmap-set-title">{{ beatmapSet.title }}</p>
            <p class="beatmap-set-artist">{{ beatmapSet.artist }}</p>
          </div>
        </div>
        <div class="play-sidebar">
          <div class="play-sidebar-image-container">
            <!-- <img src="/beatmaps/533037 illion - AIWAGUMA/49389130_p0.png" /> -->
            <img src="/beatmaps/476691 DJ OKAWARI - Flower Dance/BG.jpg" />
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
</template>

<script>
export default {
  data() {
    return {
      beatmapSetsTest: {
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
      beatmapSets: {},
      beatmapSetsData: {},
    };
  },

  async fetch() {
    const data = await fetch('/beatmaps/beatmaps.json');
    this.beatmapSets = await data.json();

    Object.keys(this.beatmapSets).forEach((folder) => {
      this.beatmapSetsData[folder] = [];

      this.beatmapSets[folder].forEach((osz) => {
        this.beatmapSetsData[folder].push(this.getBeatmapData(folder, osz));
      });
    });
  },

  mounted() {},

  methods: {
    getBeatmapData(folder, osz) {
      const beatmap = {
        general: {},
        metadata: {},
        colors: [],
        events: [],
        timingPoints: [],
        hitObjects: [],
        columns: null,
      };

      fetch(`/beatmaps/${folder}/${osz}`)
        .then((response) => response.text())
        .then((beatmapData) => {
          // Split the data by line breaks into an array
          const lines = beatmapData.replaceAll('\r', '').split('\n');

          // If it is NOT an osu file
          if (!lines[0].includes('osu file format')) {
            console.log('Not an osu file!');
          } else {
            // If it is an osu file but not the latest version
            if (lines[0] !== 'osu file format v14') {
              console.log(
                `Careful: The osu file version is ${lines[0].match(
                  '1[0-3]|[1-9]'
                )}`
              );
            }

            let section;
            const xValues = [];

            for (let i = 0; i < lines.length; i++) {
              // removes whitespace at beginning/end of line
              const line = lines[i].trim();

              // "continue" terminates current iteration of for loop and starts new iteration
              if (line === '') continue;
              if (line.indexOf('//') === 0) continue;
              if (line.indexOf('[') === 0) {
                section = line;
                continue;
              }

              let key, value, parts, t, hit, hitSample;

              switch (section) {
                case '[General]':
                  key = line.slice(0, line.indexOf(':'));
                  value = line.slice(line.indexOf(':') + 1).trim();

                  //  the +_ operator converts "value" to a number
                  beatmap.general[key] = isNaN(value) ? value : +value;
                  break;
                case '[Metadata]':
                  key = line.slice(0, line.indexOf(':'));
                  value = line.slice(line.indexOf(':') + 1).trim();
                  beatmap.metadata[key] = value;
                  break;
                case '[Events]':
                  beatmap.events.push(line.split(','));
                  console.log(line.split(','));

                  break;
                case '[TimingPoints]':
                  parts = line.split(',');
                  t = {
                    time: +parts[0],
                    millisecondsPerBeat: +parts[1],
                    beatsPerMeasure: +parts[2],
                    sampleSet: +parts[3],
                    sampleIndex: +parts[4],
                    volume: +parts[5],
                    uninherited: +parts[6],
                    kiaiMode: +parts[7],
                  };
                  if (t.millisecondsPerBeat < 0) {
                    t.uninherited = 0;
                  }
                  beatmap.timingPoints.push(t);
                  break;
                case '[HitObjects]':
                  parts = line.split(',');

                  // Columns are indexed 0.

                  hit = {
                    x: +parts[0],
                    time: +parts[2],
                    type: +parts[3],
                    hitSound: +parts[4],
                  };

                  // Stores all possible x-values in order to calculate numColumns with array.length
                  if (!xValues.includes(hit.x)) {
                    xValues.push(hit.x);
                  }

                  // Decode specific hit object type
                  switch (hit.type) {
                    case 1:
                    case 5:
                      hit.type = 'note';

                      hitSample = parts[5].split(':');

                      hit.hitSample = {
                        normalSet: +hitSample[0],
                        additionSet: +hitSample[1],
                        index: +hitSample[2],
                        volume: +hitSample[3],
                        filename: hitSample[4],
                      };

                      break;
                    case 128: // hold
                      hit.type = 'hold';

                      hitSample = parts[5].split(':');

                      hit.endTime = +hitSample[0];
                      hit.hitSample = {
                        normalSet: +hitSample[1],
                        additionSet: +hitSample[2],
                        index: +hitSample[3],
                        volume: +hitSample[4],
                        filename: hitSample[5],
                      };

                      break;
                    default:
                      // Unknown hit type
                      console.log(
                        `Attempted to decode unknown hit object type ${hit.type}: ${line}`
                      );
                      break;
                  }

                  beatmap.hitObjects.push(hit);
                  break;
              }
            }

            // Calculates the number of columns in beatmap with the number of distinct x-values.
            beatmap.columns = xValues.length;

            // Calculates the column for each hit object
            beatmap.hitObjects.forEach((hit) => {
              hit.columnIndex = Math.floor((hit.x * beatmap.columns) / 512);
            });
          }
        });
      console.log(beatmap);
      return beatmap;
    },
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
  font-size: 4rem;
}

.song-search-form {
  width: 60vw;

  display: flex;
  justify-content: center;
}

.song-search-form > input {
  font-size: 2rem;

  background-color: black;

  border: 0.125rem solid gray;
  margin: 0 1rem;
}

.song-search-bar {
  width: 40vw;
  height: 4rem;

  padding: 0 0 0 1rem;
}

.song-submit-button {
  width: 5vw;
  min-width: 4rem;
  height: 4.25rem;
}

.play-beatmap-content {
  --content-width: 60vw;
  --beatmap-set-container-width: 45vw;
  --sidebar: 30rem;

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

  width: calc(16rem * 1.6);
  height: calc(9rem * 1.6);

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

  margin: 0 0 0 0.5rem;

  display: inline;
  position: relative;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.beatmap-set-title {
  font-size: 3rem;
}

.beatmap-set-artist {
  font-size: 2.5rem;
}

.play-sidebar {
  width: var(--sidebar);
  min-height: 30rem;

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
  font-size: 2.5rem;

  margin: 0 0 0 0.5rem;
}

.play-sidebar-text-title {
  font-size: 4rem;
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
  font-size: 2.5rem;
}
</style>
