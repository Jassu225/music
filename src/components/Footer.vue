<template>
  <div id="footer">
    <div class="flex-container full-height">

      <div id="topMenuAlias">
        <div class='image-container'></div>
      </div>

      <div class="flex-item">
        <div class="flex-container full-height" style="flex-direction: column;">
            <div class="flex-item flex-basis-0_4">
              <div class="flex-container center-horizontal center-vertical full-height">
                <div style="width: 80px; text-align: center; height: 100%;">
                  <div class="full-height flex-container center-horizontal center-vertical">
                    <div> {{ currentTime }} </div>
                  </div>
                </div>

                <div class="flex-item full-height">
                  <div class="full-height flex-container center-horizontal center-vertical">
                    <SeekbarContainer
                    :updateCurrentTime="updateCurrentTime"
                    :updateDuration="updateDuration"
                    :changePlayPauseIconIndex="changePlayPauseIconIndex"
                    :setToPlayIcon="setToPlayIcon"
                    :setToPauseIcon="setToPauseIcon" />
                  </div>
                </div>

                <div style="width: 80px; text-align: center; height: 100%;">
                  <div class="full-height flex-container center-horizontal center-vertical">
                    <div> {{ duration }} </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- Player Controls -->
            <div class="flex-item flex-basis-0_6">
              <div class="flex-container center-horizontal center-vertical full-height">
                <PlayerControls :playPauseIconIndex="playPauseIconIndex"/>
              </div>
            </div>
        </div>
      </div>
    </div>
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
  height: 56px;
  background-color: rgb(7, 8, 9);
}

#topMenuAlias {
  width: 50px;
  background-color: rgb(23, 23, 23);
}

.flex-basis-0_4 {
  flex-basis: 40%;
}

.flex-basis-0_6 {
  flex-basis: 60%;
}
</style>
