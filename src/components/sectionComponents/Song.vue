<template>
  
</template>

<script>


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


</style>
