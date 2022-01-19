<template>
<div id="parse-container">
  <h1>Check Vue-Dev Tools</h1>

  <input id="file-upload" ref="fileInput" type="file" accept=".osz" hidden @change="selectFile">

  <div class="drop-area" :class="{hovered: isHovered}" v-on="dropboxEventHandlers">
    <img src="/img/upload-icon.png" alt="Upload Icon"/>
    <p><b>Drop</b> your .osz file here!</p>
    <p>Or <b>click</b> to browse through files to upload</p>
  </div>
</div>
</template>

<script>

export default {
  name: 'ParseTest',
  head() {
      return{
          meta: [
            "script": [{ src: '/lib/zip.min.js' }, { src: '/lib/localforage.min.js' }],
          ]
      }
  },
  data() {
    return {
      dropboxEventHandlers: {
        "dragover": this.dropboxEvents,
        "dragleave": this.dropboxEvents,
        "drop": this.dropboxEvents,

        "mouseover": this.dropboxEvents,
        "mouseleave": this.dropboxEvents,

        "click": this.dropboxEvents,
      },
      isHovered: false,
      rawFile: null,
      entries: null,
      readEntries: [],
    }
  },
  created () {
  },
  methods: {
    selectFile(event) {
      this.rawFile = event.target.files[0];
      this.readFile(this.rawFile);
    },
    async readFile(rawfile) {
      // If the current file is a .osz file
      if (rawfile.name.slice(-4) === ".osz") {
        /* localforage.setItem(rawfile.name, rawfile, function(err, val) {
          if (err) {
            console.error(`Error while saving beatmap: ${rawfile.name}`)
          }
        }) */
        
        this.entries = await new zip.ZipReader(new zip.BlobReader(this.rawFile)).getEntries();

        /* for (let i = 0; i < this.entries.length; i++) {
          const data = await this.entries[i].getData(new zip.Writer());

          this.readEntries.push(data);
        } */

      } else {
        alert(`${this.rawFile.name} is not a valid .osz file!`);
      }

    },
    dropboxEvents(event) {
      event.preventDefault();
      switch (event.type) {
        case "dragover":
        case "mouseover":
          this.isHovered = true;
          break;
        
        case "dragleave":
        case "mouseleave":
          this.isHovered = false;
          break;

        case "drop":
          this.isHovered = false;

          this.rawFile = event.dataTransfer.files[0];
          // If the file exists, then read it.
          if (this.rawFile) {
            this.readFile(this.rawFile);
          } else {
            alert(`An unrecognized file was dropped!`);
          }
          break;

        case "click": 
          this.$refs.fileInput.click();
          break;

        default:
          alert(`Dropbox event does not exist: ${event.type}`)
          break;
      }
    },
  },
}
</script>

<style scoped>


#parse-container {
  display: flex;
  justify-content: center;
  flex-direction: column;

  text-align: center;
}

h1 {
  font-size: 2.5rem;
  margin: 2rem 0rem;
}

.drop-area {
  margin: 1rem auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40rem;
  height: 16rem;
  border: 0.5rem dashed grey;
  border-radius: 1.5rem;
}

.drop-area img {
  width: 5rem;
}

.drop-area p {
  font-size: 2rem;
  margin: 1rem;
}

.hovered {
  border-color: green;
  cursor: pointer;
}

</style>