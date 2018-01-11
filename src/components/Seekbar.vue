<template>
  <div id="seekbar" :style="{width: width + '%'}">
    <div id="seekbar-tip"></div>
    <audio id='audio-player' src="file:///C:/Users/jaswa/Music/chain smokers.mp3" @loadeddata="loadeddata" @play="readyToPlay" @playing="startedPlaying" @pause="paused"/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      width: 0,
      duration: 0,
      element: null,
      timerID: null
    };
  },
  methods: {
    loadeddata: function(event) {
      this.element = event.currentTarget;
      this.duration = this.element.duration;
      console.log(this.duration);
    },
    readyToPlay: function() {

    },
    startedPlaying: function() {
      this.timerID = setInterval(this.updateSeekbarWidth, 900);
    },
    paused: function() {
      clearInterval(this.timerID);
      this.timerID = null;
    },
    updateSeekbarWidth: function() {
      this.width = (this.element.currentTime / this.duration) * 100;
      console.log(this.width);
    }
  }
}
</script>

<style>
#seekbar {
  height: 100%;
  width: 0%;
  background-color: aquamarine;
}

#seekbar-tip {
  float: right;
  width: 8px;
  height: 8px;
  position: relative;
  margin-top: -2px;
  border-radius: 50%;
  background-color: aliceblue;
}
</style>
