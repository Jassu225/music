<template>
  <div id="seekbar" :style="{width: width + '%'}" style="max-width:100%;">
    <SeekbarTip />
    <audio id='audio-player' src="file:///C:/Users/jaswa/Desktop/Selena Gomez/Selena Gomez, Marshmello - Wolves (Lyrics).mp3"
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
    });
    window.addEventListener("mouseup", this.addMouseUpListener);
    this.addMouseMoveListener();
    console.log('mounted');
  },
  props: ['seekPercentage', 'updateCurrentTime', 'updateDuration', 'posX1', 'posX2', 'draggable', 'disableDrag'],
  data: function() {
    return {
      width: 0,
      duration: 0,
      element: null,
      timerID: null,
      playingStarted: false
    };
  },
  components: {
    SeekbarTip
  },
  watch: {
    seekPercentage: 'updateSeekbarUI',
    // draggable: 'subsequentSeekbarUIUpdate'
  },
  methods: {
    clear: function() {
      clearInterval(this.timerID);
      this.timerID = null;
    },
    setTimer: function() {
      if( !this.timerID)
        this.timerID = setInterval(this.updateSeekbarWidth, 500);
    },
    loadeddata: function(event) {
      this.element = event.currentTarget;
      this.duration = this.element.duration;
      this.updateDuration(this.element.duration);
    },
    readyToPlay: function() {
      this.setTimer();
      console.log('ready to play');
    },
    startedPlaying: function() {
      console.log('started playing');
      this.playingStarted = true;
    },
    paused: function() {
      console.log('paused');
      this.clear();
    },
    seeked: function() {
      // console.log('audio seeked');
      this.updateSeekbarWidth();
    },
    ended: function() {
      this.playingStarted = false;
      this.clear();
      this.setWidth(100);
    },
    changeCurrentTime: function() {
      if( audioPlayer.readyState == 4) // HAVE_ENOUGH_DATA - enough data available to start playing
        audioPlayer.currentTime = this.seekPercentage * audioPlayer.duration;
    },
    addMouseMoveListener: function() {
      window.addEventListener("mousemove", this.subsequentSeekbarUIUpdate);
    },
    subsequentSeekbarUIUpdate: function(event) {
      // console.log("mouse move");
      if( this.draggable) {
        // console.log('subsequent seekbar UI update');
        this.setWidth( (event.x - this.posX1) / (this.posX2 - this.posX1) * 100);
      }
    },
    addMouseUpListener: function() {
      // console.log("mouseup listener");
      if (this.draggable ) {
        console.log('drag off');
        this.element.currentTime = this.width / 100 * this.element.duration;
        this.disableDrag();
        this.playingStarted? this.setTimer() : null;
      }
      // this.updateCurrentTime(this.element.currentTime);
      // this.removeMouseMoveListener();
    },
    removeMouseMoveListener: function() {
      window.removeEventListener("mousemove", this.subsequentSeekbarUIUpdate);
      console.log('remove mouse move listener');
    },
    updateSeekbarUI: function() {
      // console.log(this.seekPercentage * 100);
      this.clear();
      console.log('clear timer update seekbar UI');
      this.setWidth(this.seekPercentage * 100);
    },
    updateSeekbarWidth: function() {
      this.setWidth( (this.element.currentTime / this.duration) * 100);
      this.updateCurrentTime(this.element.currentTime);
    },
    setWidth: function(value) {
      // console.log(value);
      this.width = value;
    }
  },
  computed: {
    
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
