<template>
  <div class="beatmaps__content--body">
    <routeChange />
    <div class="under-nav"></div>

    <div id="play-index">
      <div class="play-content">
        <div class="play-title-textbox">
          <h1 class="play-title">♪ beatmaps listing</h1>
        </div>

        <div class="search-container">
          <form class="song-search-form">
            <input
              class="song-search-bar"
              type="text"
              placeholder="search for your song..."
            />

            <span class="deleteText">
              <img
                class="search-icon"
                src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDU2Ljk2NiA1Ni45NjYiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDU2Ljk2NiA1Ni45NjY7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4Ij4KPHBhdGggZD0iTTU1LjE0Niw1MS44ODdMNDEuNTg4LDM3Ljc4NmMzLjQ4Ni00LjE0NCw1LjM5Ni05LjM1OCw1LjM5Ni0xNC43ODZjMC0xMi42ODItMTAuMzE4LTIzLTIzLTIzcy0yMywxMC4zMTgtMjMsMjMgIHMxMC4zMTgsMjMsMjMsMjNjNC43NjEsMCw5LjI5OC0xLjQzNiwxMy4xNzctNC4xNjJsMTMuNjYxLDE0LjIwOGMwLjU3MSwwLjU5MywxLjMzOSwwLjkyLDIuMTYyLDAuOTIgIGMwLjc3OSwwLDEuNTE4LTAuMjk3LDIuMDc5LTAuODM3QzU2LjI1NSw1NC45ODIsNTYuMjkzLDUzLjA4LDU1LjE0Niw1MS44ODd6IE0yMy45ODQsNmM5LjM3NCwwLDE3LDcuNjI2LDE3LDE3cy03LjYyNiwxNy0xNywxNyAgcy0xNy03LjYyNi0xNy0xN1MxNC42MSw2LDIzLjk4NCw2eiIgZmlsbD0iIzAwMDAwMCIvPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K"
              />
            </span>
            <input class="song-submit-button" type="submit" value="" />
          </form>
        </div>

        <div class="my-video-audio">
          <div class="audio-cntrl-cont">
            <font-awesome-icon
              icon="backward"
              class="svg"
              @click="prevSongIndex()"
            />
            <!-- <fa-backward class="svg"/> -->
          </div>

          <div class="audio-cntrl-cont">
            <font-awesome-icon
              v-if="clicked"
              icon="fa-solid fa-play"
              class="svg"
              @click="toggleAudio()"
            />
            <font-awesome-icon
              v-else
              icon="fa-solid fa-pause"
              class="svg"
              @click="toggleAudio()"
            />
            <!-- <font-awesome-icon icon="pasue" class="svg"/> -->
          </div>

          <div class="audio-cntrl-cont">
            <font-awesome-icon
              icon="fa-solid fa-forward-step"
              class="svg"
              @click="nextSongIndex()"
            />
          </div>

          <div id="audioProgress"></div>

          <div class="audio-cntrl-cont">
            <font-awesome-icon
              v-if="mute"
              icon="fa-solid fa-volume-high"
              class="svg"
              @click="audioBarMute()"
            />
            <font-awesome-icon
              v-else
              icon="fa-solid fa-volume-xmark"
              class="svg"
              @click="audioBarMute()"
            />
          </div>
        </div>
        <div class="play-beatmap-content">
          <div v-if="!$fetchState.pending" class="play-beatmap-set-container">
            <div
              v-for="(oszArray, bmSetName) in bmSetsData"
              :key="bmSetName"
              class="play-beatmap-set"
              @click="
                (clickedBmSetName = bmSetName), beatmapSoundBit(), changeSound()
              "
            >
              <h2>Click For Audio Preview</h2>

              <img
                v-if="oszArray[0].events[0]"
                class="beatmap-set-img"
                :src="`/beatmaps/${bmSetName}/${oszArray[0].events[0][2]}`"
              />
              <p class="beatmap-set-title">{{ oszArray[0].metadata.Title }}</p>
              <p class="beatmap-set-artist">
                {{ oszArray[0].metadata.Artist }}
              </p>
            </div>
          </div>
          <div v-if="clickedBmSetName" class="play-sidebar">
            <div class="play-sidebar-image-container">
              <img
                :src="`/beatmaps/${clickedBmSetName}/${
                  bmSetsData[`${clickedBmSetName}`][0].events[0][2]
                }`"
              />
            </div>
            <div class="play-sidebar-text-container">
              <p class="play-sidebar-text-title">
                {{ bmSetsData[`${clickedBmSetName}`][0].metadata.Title }}
              </p>
              <p>
                Artist:
                {{ bmSetsData[`${clickedBmSetName}`][0].metadata.Artist }}
              </p>
              <p>
                Mapper:
                {{ bmSetsData[`${clickedBmSetName}`][0].metadata.Creator }}
              </p>
              <nuxt-link
                :to="`/leaderboard/${
                  bmSetsData[`${clickedBmSetName}`][0].metadata.BeatmapSetID
                }`"
                class=""
                >Leaderboard</nuxt-link
              >
            </div>
            <table class="play-sidebar-difficulties">
              <tbody>
                <tr
                  v-for="(bmDifficulty, index) in bmSetsData[
                    `${clickedBmSetName}`
                  ]"
                  :key="index"
                  @click="$store.commit('setBeatmap', bmDifficulty)"
                  @mouseover="$store.commit('setBeatmap', bmDifficulty)"
                >
                  <th>{{ bmDifficulty.metadata.Version }}</th>
                  <th>
                    <nuxt-link :to="`/play`">PLAY</nuxt-link>
                  </th>
                  <th>??? notes/s</th>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-else class="play-sidebar">
            <img
              class="img-placeholder"
              src="~/assets/images/backgrounds/landing.png"
            />
            <p class="hover-msg">hover, then click on a song!~</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */

export default {
  auth: false,
  data() {
    return {
      bmSets: {},
      songIndexs: null,
      mute: true,
      minIndex: 0,
      maxIndex: 24,
      currentSongIndex: null,
      currAudioBarVal: null,
      timeoutID: null,
      currAudioProg: null,
      userdata: null,
      bmSetsData: {},
      clickedBmSetName: null,
      clicked: true,
      clickBack: false,
      searchQuery: null,
      id: null,
      SoundPrevBarDur: null,
      musicBeatmapDuration: 0,

      musicBeatmapDuration: 0,
      executed: false,
      chageExeuted: false,
      firstBeatmapVal: null,
      audioId: null,
      currVal: null,
      test: 1,
    };
  },

  async login() {
    await this.$auth.loginWith('auth0');
  },
  async fetch() {
    const beatmapsData = await fetch('/beatmaps/beatmaps.json');
    this.bmSets = await beatmapsData.json();

    Object.keys(this.bmSets).forEach((folder) => {
      this.bmSetsData[folder] = [];

      this.bmSets[folder].forEach((osz) => {
        this.bmSetsData[folder].push(this.getBmData(folder, osz));
      });
    });
  },

  mounted() {
    this.progressAudioBar = new ProgressBar.Line(audioProgress, {
      strokeWidth: 3,
      color: '#FFEA82',
      duration: 10000,
      trailColor: '#eee',
      trailWidth: 3,
      svgStyle: { width: '100%', height: '30%' },
    });
  },

  methods: {
    getBmData(folder, osz) {
      const beatmap = {
        general: {},
        metadata: {},
        difficulty: {},
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
                )}`,
                folder
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

              let key, value, array, parts, t, hit, hitSample;

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
                  array = line
                    .replaceAll('"', '')
                    .split(',')
                    .map((e) => {
                      return isNaN(e) ? e : +e;
                    });
                  beatmap.events.push(array);
                  break;
                case '[Difficulty]':
                  key = line.slice(0, line.indexOf(':'));
                  if (key === 'HPDrainRate' || key === 'OverallDifficulty') {
                    value = line.slice(line.indexOf(':') + 1).trim();
                    beatmap.difficulty[key] = +value;
                  } else continue;
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
                        `Attempted to decode unknown hit object type ${hit.type}: ${line}`,
                        folder,
                        osz
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

      return beatmap;
    },
    beatmapSoundBit() {
      const t = this;
      t.clicked = false;
      //  t.musicBeatmapDuration = Math.round(
      //   this.bmSetsData[this.clickedBmSetName][0].general.PreviewTime/1000
      // ) *1000 /2

      // t.musicBeatmapDuration = Math.round(
      //   this.bmSetsData[this.clickedBmSetName][0].general.PreviewTime / 2000
      // );
      // console.log(
      // console.log(
      //   `/beatmaps/${this.clickedBmSetName}/B${
      //     this.bmSetsData[this.clickedBmSetName][0].general.AudioFilename
      //   }`
      // );
      //   this.bmSetsData[this.clickedBmSetName][0].general.PreviewTime
      // );
      t.musicBeatmap = new Howl({
        src: [
          `/beatmaps/${this.clickedBmSetName}/B${
            this.bmSetsData[this.clickedBmSetName][0].general.AudioFilename
          }`,
        ],
        //  src: [`/beatmaps/defaultHitSound/normal-hitnormal.wav`],
        volume: 0.5,
        preload: true,
        html5: true,
        // sprite: {
        //   prevMusic: [t.musicBeatmapDuration, 10000, false],
        // },
      });

      if (!t.executed) {
        t.executed = true;

        // t.musicBeatmap.play('prevMusic');
        this.progressAudioBar.set(0);
        this.progressAudioBar.animate(1.0);
        t.musicBeatmap.play();
        t.firstBeatmapVal =
          t.bmSetsData[t.clickedBmSetName][0].general.AudioFilename;
        this.timeoutID = setTimeout(() => {
          this.resetAudio();
        }, 10000);
      }
      t.songIndexs = Object.keys(t.bmSets);

      t.currVal = t.bmSetsData[t.clickedBmSetName][0].general.AudioFilename;
    },
    changeSound() {
      const t = this;
      if (t.firstBeatmapVal !== t.currVal) {
        this.progressAudioBar.set(0);
        t.progressAudioBar.animate(1, {
          duration: 10000,
        });
        t.firstBeatmapVal = t.currVal;

        Howler.stop();
        t.musicBeatmap.play();
        //  t.musicBeatmap.play('prevMusic');
        clearTimeout(t.timeoutID);
        t.timeoutID = setTimeout(() => {
          t.resetAudio();
        }, 10000);
      }
    },
    resetAudio() {
      Howler.stop();
      this.executed = false;
      this.progressAudioBar.set(0);
      this.clicked = true;
    },
    toggleAudio() {
      const t = this;
      t.clicked = !t.clicked;

      if (t.clicked === true) {
        clearTimeout(t.timeoutID);
        t.currAudioBarVal = t.progressAudioBar.value();
        t.musicBeatmap.pause();
        t.progressAudioBar.stop();
      } else {
        // t.musicBeatmap.play('prevMusic');
        clearTimeout(t.timeoutID);
        t.currAudioProg = Math.round((1 - t.currAudioBarVal) * 10000);

        t.progressAudioBar.animate(1, {
          duration: t.currAudioProg,
        });
        t.timeoutID = setTimeout(() => {
          t.resetAudio();
        }, t.currAudioProg);

        t.musicBeatmap.play();
      }
    },
    prevSongIndex() {
      const t = this;
      // t.songIndexs

      const currSong = t.songIndexs.indexOf(t.clickedBmSetName);

      if (currSong > t.minIndex) {
        const prevSong = currSong - 1;
        t.clickedBmSetName = t.songIndexs[prevSong];
        t.currVal = t.bmSetsData[t.clickedBmSetName][0].general.AudioFilename;
        t.beatmapSoundBit();
        t.changeSound();
      }
    },
    nextSongIndex() {
      const t = this;
      const currSong = t.songIndexs.indexOf(t.clickedBmSetName);

      if (currSong <= t.maxIndex) {
        const prevSong = currSong + 1;
        t.clickedBmSetName = t.songIndexs[prevSong];
        t.currVal = t.bmSetsData[t.clickedBmSetName][0].general.AudioFilename;
        t.beatmapSoundBit();
        t.changeSound();
      }
    },
    audioBarMute() {
      this.mute = !this.mute;
      if (this.mute === false) {
        Howler.volume(0);
      } else {
        Howler.volume(1);
      }
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Fira+Sans&family=Montserrat:wght@600&display=swap');

*,
.beatmaps__content--body {
  font-family: 'Dongle', sans-serif;
}

.my-video-audio {
  height: 20%;
  width: 90%;
  display: flex;
  flex-direction: row;
  border: solid;
}

.audio-cntrl-cont {
  height: 100%;
  width: 15%;
  border: solid;
}

/* Beatmaps Title */
.play-index {
  width: 100vw;
}

.play-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  background-image: linear-gradient(
      rgba(41, 34, 80, 0.7),
      rgba(33, 26, 77, 0.7)
    ),
    /* url('~/assets/images/backgrounds/fleeting-colors.jpg'); */
      url('~/assets/images/backgrounds/landing.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
}

.play-title-textbox {
  width: 55vw;
  margin-top: 2rem;
  background-color: rgb(42, 36, 75);
}

.play-title {
  display: flex;
  align-items: center;
  font-size: 3.5rem;
  font-weight: 400;
  color: #f6f6f6;
  height: 5.5rem;
  margin: 0.5rem 1rem 0.5rem 3.5rem;
  padding-top: 0.5rem;
}

/* Search Container */

.search-container {
  width: 55vw;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2.5rem;
  background-image: linear-gradient(
      rgba(49, 45, 58, 0.7),
      rgba(49, 45, 58, 0.7)
    ),
    url('~/assets/images/backgrounds/enkanomiya-blurred.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
}
.svg {
  height: 4rem;
  width: 4rem;
}
.deleteText {
  transform: translateY(30%);
  left: 4%;
  width: 0;
  position: relative;
}

.search-icon {
  filter: invert(1);
  width: 2rem;
}

.song-search-form {
  width: 60vw;
  display: flex;
  justify-content: center;
  padding: 1.5rem;
}

.song-search-form > input {
  font-size: 2.5rem;
  height: initial;
  /* margin: 0 1rem; */
  /* height: 5vh; */

  overflow: hidden;
  background-color: rgb(49, 45, 58);
  border-radius: 0rem;
  box-shadow: 0 0.3rem 0.5rem rgba(0, 0, 0, 0.4);
  border: none;
  outline: none;
}

.song-search-bar {
  width: 45vw;
  height: 3rem;
  padding: 0.25rem 0 0 1.25rem;
}

.song-submit-button {
  width: 5vw;
  min-width: 4rem;
  height: 3rem;
  padding: 1rem;
  box-shadow: 0 0.3rem 0.5rem rgba(0, 0, 0, 0.4);
}

/* Beatmap Content */

.play-beatmap-content {
  --content-width: 55vw;
  --beatmap-set-container-width: 45vw;
  --sidebar: 25rem;
  width: var(--content-width);
  display: flex;
  align-items: flex-start;
  margin: 2rem 0 1rem 0;
  padding: 1.75rem;
  background-image: linear-gradient(
      rgba(49, 45, 58, 0.7),
      rgba(49, 45, 58, 0.7)
    ),
    url('~/assets/images/backgrounds/enkanomiya-blurred.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
}

.play-beatmap-set-container {
  width: calc(var(--content-width) - var(--sidebar));
  display: flex;
  flex-wrap: wrap;
  /* justify-content: center; */
  /* Gap => Column Gap, Row Gap */
  gap: 2rem 2rem;
}

.play-beatmap-set {
  position: relative;
  width: 28rem;
  height: 13.5rem;
  border: 0.2rem solid rgb(45, 40, 68);
  box-shadow: 0 0.3rem 0.5rem rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow: hidden;
  transition: all 100ms linear;
  cursor: pointer;
  border-radius: 1rem;
}

.play-beatmap-set:hover {
  transform: scale(1.05);
  /* transform: translate(0, -2%); */
}

.play-beatmap-set:hover::after {
  content: '';
  display: block;
  width: 100px;
  height: 175%;
  background: rgb(255, 255, 255);
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 1) 25%,
    rgba(255, 255, 255, 1) 50%,
    rgba(255, 255, 255, 1) 75%,
    rgba(255, 255, 255, 0) 100%
  );
  opacity: 0.25;
  position: absolute;
  top: -80px;
  left: 40px;
  animation: shine 250ms linear;
  transform: translateX(250px) rotate(-25deg);
}

.button.play {
  opacity: 1;
  width: 74px;
  height: 74px;
  border-style: solid;
  border-width: 37px 0px 37px 74px;
  border-color: transparent transparent transparent yellow;
  /* display: none; */
}

.fa-play {
  height: 6rem;
  width: 6rem;
  margin-left: auto;
  margin-right: auto;
  /* font-size: 6rem; */
  opacity: 1;
}

.fa-pause {
  height: 6rem;
  width: 6rem;
  margin-left: auto;
  margin-right: auto;
  /* font-size: 6rem; */
  opacity: 1;
}

.play-btn {
  height: 6rem;
  width: 6rem;
  margin-left: auto;
  margin-right: auto;
  /* font-size: 6rem; */
  opacity: 1;
}

/* */

@keyframes shine {
  0% {
    transform: translateX(-30px) rotate(-25deg);
  }

  100% {
    transform: translateX(250px) rotate(-25deg);
  }
}

/* */

.beatmap-set-img {
  position: absolute;
  width: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  opacity: 1;
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
  font-size: 3.25rem;
}

.beatmap-set-artist {
  font-size: 2.5rem;
}

.play-sidebar {
  width: calc(32rem + var(--sidebar));

  min-width: 0;
  min-height: 25rem;
  border: 0.2rem solid rgb(45, 40, 68);
  box-shadow: 0 0.3rem 0.5rem rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
  height: auto;
  background-image: linear-gradient(rgba(14, 7, 29, 0.7), rgba(17, 11, 36, 0.7)),
    url('~/assets/images/backgrounds/fleeting-colors.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
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
  font-size: 2.25rem;
  margin: 0 1rem 0 1rem;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.play-sidebar-text-title {
  font-size: 5.5rem;
  line-height: 4rem;
  color: #e7ffff;
}

.play-sidebar-difficulties {
  width: 100%;
  border-collapse: collapse;
}

.play-sidebar-difficulties > tbody > tr:nth-child(even) {
  background-color: #2d2f50;
}

.play-sidebar-difficulties > tbody > tr:nth-child(odd) {
  background-color: #3f405f;
}

.play-sidebar-difficulties > tbody > tr > th {
  font-size: 2.5rem;
}

.play-sidebar-difficulties > tbody > tr > th > * {
  font-size: 3.25rem;
  color: rgb(133, 185, 228);
  transition: all 100ms ease-in-out;
}

.play-sidebar-difficulties > tbody > tr > th > *:hover {
  text-decoration: underline;
  color: rgb(197, 221, 240);
}

.hover-msg {
  text-align: center;
  margin-bottom: 1rem;
  font-size: 4rem;
  text-shadow: 5px 5px 3px rgb(1, 5, 20);
}

.img-placeholder {
  height: 21.5rem;
  background-image: linear-gradient(
      rgba(49, 45, 58, 0.7),
      rgba(49, 45, 58, 0.7)
    ),
    url('~/assets/images/backgrounds/fleeting-colors.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
}
</style>
