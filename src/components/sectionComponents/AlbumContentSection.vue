<template>
  <div id="albumContentSection" class="full-height section grid album-content-section-grid">

    <img 
      :src="this.$store.state.selectedAlbum ? this.$store.state.selectedAlbum.cover: null"
      class="grid-center-horizontal grid-center-vertical"
    />

    <div id="album-content" class="padding-left-10" v-if="this.$store.state.selectedAlbum">
      <div>
        <div class="color-fix">Title</div>
        <div class="color-data">{{ this.$store.state.selectedAlbum.title }}</div>
      </div>

      <br />

      <div class="color-fix">Artists</div>
      <ul class="color-data">
        <li v-for="(artist, index) in this.$store.state.selectedAlbum.artists"
          :key="index"
          class="artist">
            {{ artist }}
        </li>
      </ul>

      <br />

      <div>
        <div class="color-fix">Tracks</div>
        <div class="color-data">{{ this.$store.state.selectedAlbum.tracks }}</div>
      </div>

      <br />

      <div>
        <div class="color-fix">Year</div>
        <div class="color-data">{{ this.$store.state.selectedAlbum.year }}</div>
      </div>
      
      <br />

      <div>
        <div class="color-fix">Duration</div>
        <div class="color-data">{{ (duration.toString()).toHHMMSS() }}{{ durationOfAlbum }}</div>
      </div>
    </div>

    <div class="scroll songs-container">
      <div v-for="(song, index) in (this.$store.state.selectedAlbum ? this.$store.state.selectedAlbum.songsList : [])"
        :key="index" class="song table button" @click="playSong(song.path)">
        <div class="table-cell vertically-middle">{{ song.title }}</div>
      </div>
    </div>

  </div>
</template>

<script>

export default {
  data: function() {
    return {
      duration: 0
    };
  },
  methods: {
    playSong: function(src) {
      audioPlayer.src = src;
      audioPlayer.load();
      audioPlayer.play();
    }
  },
  computed: {
    durationOfAlbum: function() {
      this.duration = 0;
      let songList = this.$store.state.selectedAlbum.songsList;
      
      for(let i = 0; i < songList.length; i++) {
        let audio = new Audio();
        audio.preload = 'metadata';
        audio.addEventListener('loadedmetadata', () => {
          console.log(audio.duration);
          this.duration += audio.duration;
        });
        audio.src = songList[i].path;
        audio.load();
      }
    },
  }
}
</script>

<style>
ul,li {
  margin: 0;
  padding: 0;
}

.list-style-type-disc {
  list-style-type: disc;
}

#albumContentSection img {
  width: 165px;
  max-height: 210px;
  grid-area: AlbumCover;
}

#album-content {
  grid-area: AlbumContent;
}

.color-fix {
  font-weight: bold;
  color: rgb(76, 177, 117);
}

.color-data {
  font-size: 14px;
  color: rgb(212, 212, 212);
}

.padding-left-10 {
  padding-left: 10px;
}

.padding-20 {
  padding: 20px;
}

.width-200 {
  width: 200px;
}

.height-250 {
  height: 250px;
}

.scroll {
  overflow: auto;
}

#albumContentSection .songs-container {
  grid-area: AlbumSongs;
  background-color: rgb(35, 34, 34);
}

#albumContentSection .song {
  width: 100%;
  height: 3rem;
  padding-left: 10px;
  border-bottom: 1px solid rgb(80, 80, 80);
}

#albumContentSection .song:last-child {
  border-bottom: none;
}

#albumContentSection .song:hover {
  background-color: rgb(95, 93, 91);
}
</style>
