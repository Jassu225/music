<template>
  <div id="footer" class="grid footer-grid">
    <div id="miniNavbar">
      <div class='image-container'></div>
    </div>

    <div id="current-time" class="grid-center-horizontal grid-center-vertical"> {{ currentTime }} </div>

    <SeekbarContainer
      class="grid-center-horizontal grid-center-vertical"
      :updateCurrentTime="updateCurrentTime"
      :updateDuration="updateDuration"
      :changePlayPauseIconIndex="changePlayPauseIconIndex"
      :setToPlayIcon="setToPlayIcon"
      :setToPauseIcon="setToPauseIcon"
    />
  
    <div id="duration" class="grid-center-horizontal grid-center-vertical"> {{ duration }} </div>
    
    <PlayerControls id="player-controls" :playPauseIconIndex="playPauseIconIndex" />
  </div>
</template>

<script>
import SeekbarContainer from './SeekbarContainer.vue';
import PlayerControls from './PlayerControls.vue';

export default {
  data() {
    return {
      currentTime: "00:00",
      duration: "00:00",
      playPauseIconIndex: 0
    }
  },
  components: {
    SeekbarContainer,
    PlayerControls
  },
  methods: {
    getHumanReadableFormatTime: function(value) {
      value = Math.round(value);
      let minutes = Math.floor(value / 60);
      let seconds = value % 60;
      if(minutes < 10)
        minutes = `0${minutes}`;
      if(seconds < 10)
        seconds = `0${seconds}`;

      return (`${minutes}:${seconds}`);
    },
    updateCurrentTime: function(value) {
      this.currentTime = this.getHumanReadableFormatTime(value);
    },
    updateDuration: function(value) {
      this.duration = this.getHumanReadableFormatTime(value);
    },
    changePlayPauseIconIndex: function() {
      this.playPauseIconIndex = 1 - this.playPauseIconIndex;
    },
    setToPlayIcon: function() {
      this.playPauseIconIndex = 0;
    },
    setToPauseIcon: function() {
      this.playPauseIconIndex = 1;
    }
  }
}
</script>

<style>
#footer {
  background-color: rgb(7, 8, 9);
  grid-area: Footer;
}

#miniNavbar {
  background-color: rgb(23, 23, 23);
  grid-area: MiniMenu;
}

#current-time {
  grid-area: CurrentTime;
}

#player-controls {
  grid-area: PlayerControls;
}

#duration {
  grid-area: TotalTime;
}
</style>
