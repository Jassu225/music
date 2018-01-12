<template>
  <div id="seekbar" :style="{width: width + '%'}">
    <SeekbarTip />
    <audio id='audio-player' src="file:///C:/Users/jaswa/Desktop/lucifer/Cold Blood - Valen.mp3"
      @loadeddata="loadeddata"
      @play="readyToPlay"
      @playing="startedPlaying"
      @pause="paused"
      @seeked="seeked"
      @ended="ended"/>
  </div>
</template>

<script>
import SeekbarTip from './SeekbarTip.vue';

export default {
  mounted: function () {
    this.$nextTick(function () {
      // Code that will run only after the
      // entire view has been rendered
      window.audioPlayer = document.getElementById('audio-player');
    })
  },
  props: ['seek','seekPercentage'],
  data: function() {
    return {
      width: 0,
      duration: 0,
      element: null,
      timerID: null
    };
  },
  components: {
    SeekbarTip
  },
  watch: {
    seek: 'changeCurrentTime'
  },
  methods: {
    clear: function() {
      clearInterval(this.timerID);
      this.timerID = null;
    },
    loadeddata: function(event) {
      this.element = event.currentTarget;
      this.duration = this.element.duration;
    },
    readyToPlay: function() {
      this.timerID = setInterval(this.updateSeekbarWidth, 900);
    },
    startedPlaying: function() {

    },
    paused: function() {
      this.clear();
    },
    seeked: function() {
      console.log('audio seeked');
      this.updateSeekbarWidth();
    },
    ended: function() {
      this.clear();
      this.width = 100;
    },
    updateSeekbarWidth: function() {
      this.width = (this.element.currentTime / this.duration) * 100;
    },
    changeCurrentTime: function() {
      if( audioPlayer.readyState == 4) // HAVE_ENOUGH_DATA - enough data available to start playing
        audioPlayer.currentTime = this.seekPercentage * audioPlayer.duration;
    }
  }
}
</script>

<style>
#seekbar {
  float: left;
  height: 100%;
  width: 0%;
  background-color: aquamarine;
}
</style>
