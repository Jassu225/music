<template>
  <transition>
    <div v-if="song" class="song table button" @click="playSong">
      <div class="table-cell vertically-middle">{{ song.title }}</div>
    </div>
  </transition>
</template>

<script>
import { Objects } from './../../assets/js/objectsAndSchemas';

export default {
  props: ['songpath'],
  data: function() {
    return {
      song: null
    };
  },
  mounted: async function() {
    this.song = await Objects.fetchSongFromDB(this.songpath);
    console.log(this.song);
  },
  methods: {
    playSong: function() {
      audioPlayer.src = this.songpath;
      audioPlayer.load();
      audioPlayer.play();
    }
  }
}
</script>

<style>
.song {
  width: 100%;
  height: 50px;
  padding-left: 10px;
  border-bottom: 1px solid rgb(122, 123, 123);
}

</style>
