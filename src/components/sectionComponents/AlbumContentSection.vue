<template>
  <div id="albumContentSection" class="full-height section">
    <div class="flex-container full-height">
      <div id="coverContainer">
        <div class="inline padding-20 width-200 height-250">
          <img :src="this.$store.state.selectedAlbum ? this.$store.state.selectedAlbum.cover: null" @click="clicked" />
        </div>
      </div>
      <div class="flex-item scroll songs-container">
        <Song v-for="(song, index) in (this.$store.state.selectedAlbum ? this.$store.state.selectedAlbum.songsList : [])"
          :key="index"
          :songpath="song"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Song from './Song.vue';

export default {
  data: function() {
    return {

    };
  },
  components: {
    Song
  },
  methods: {
    clicked: function() {
      console.log(this.$store.state.selectedAlbum);
    }
  }
}
</script>

<style>
#coverContainer {
  height: 250px;
  position: relative;
}

#coverContainer img {
  width: 165px;
  max-height: 210px;
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

.songs-container {
  background-color: rgb(35, 34, 34);
}
</style>
