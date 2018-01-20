<template>
  <div class="flex-container" style="text-align: center;width: 50%;">
    <i class="material-icons button flex-item media-controls" @click="replay">replay</i>
    <i class="material-icons button flex-item media-controls" @click="seekBackward">fast_rewind</i>
    <i class="material-icons button flex-item media-controls">skip_previous</i>
    <i class='material-icons button flex-item media-controls' @click="playOrPause">{{icons[playPauseIconIndex]}}</i>
    <i class="material-icons button flex-item media-controls">skip_next</i>
    <i class="material-icons button flex-item media-controls" @click="seekForward">fast_forward</i>
    <i :class="{selected: selected}" class="material-icons button flex-item media-controls" @click="changeRepeatMode">{{ repeatModes[repeatModeSelector] }}</i>
    <input class="flex-item media-controls" type="range" min="0" max="100" />
  </div>
</template>

<script>
import keyCodes from '../assets/js/keys';

export default {
  props: ['playPauseIconIndex'],
  data: function() {
    return {
      icons: ['play_arrow','pause'],
      iconSelector: 0,
      repeatModes: ['repeat','repeat', 'repeat_one'],
      repeatModeSelector: 0,
      selected: false
    };
  },
  mounted: function() {
    window.addEventListener("keyup", (event) => {
      let keyCode = event.which | event.keyCode ;
      // console.log(keyCode);
      switch(keyCode) {
        case keyCodes.SPACE_BAR:
          this.playOrPause();
          break;
        
        case keyCodes.l:
        case keyCodes.L:
          this.setOrRemoveLoop();
          break;

        case keyCodes.m:
        case keyCodes.M:
          this.muteOrUnmute();
          break;
        case keyCodes.LEFT_ARROW:
          this.seekBackward();
          break;

        case keyCodes.RIGHT_ARROW:
          this.seekForward();
          break;
      }
    });
  },
  methods: {
    changeRepeatMode() {
      this.repeatModeSelector = (this.repeatModeSelector + 1) % 3;  // Toggles from  0 to 1 and vice-versa
      switch(this.repeatModeSelector) {
        case 0:
          this.selected = false;
          audioPlayer.loop = false;
          break;
        case 1:
          this.selected = true;
          break;
        case 2:
          audioPlayer.loop = true;
          this.selected = true;
          break;
      }
      console.log(this.selected);
    },
    playOrPause() {
      // this.togglePlayPauseIcon();
      audioPlayer.paused? audioPlayer.play() : audioPlayer.pause();
    },
    togglePlayPauseIcon() {
      this.iconSelector = 1 - this.iconSelector;
    },
    setOrRemoveLoop() {
      audioPlayer.loop = !audioPlayer.loop;
    },
    muteOrUnmute() {
      audioPlayer.muted = !audioPlayer.muted;
    },
    replay() {
      audioPlayer.currentTime = 0;
      audioPlayer.paused? (audioPlayer.play()) : null;
    },
    // 0 = HAVE_NOTHING - no information whether or not the audio/video is ready
    // 1 = HAVE_METADATA - metadata for the audio/video is ready
    // 2 = HAVE_CURRENT_DATA - data for the current playback position is available, but not enough data to play next frame/millisecond
    // 3 = HAVE_FUTURE_DATA - data for the current and at least the next frame is available
    // 4 = HAVE_ENOUGH_DATA - enough data available to start playing
    seekBackward() {
      (audioPlayer.readyState >= 2) ? (audioPlayer.currentTime -= 3) : null;
    },
    seekForward() {
      (audioPlayer.readyState >= 2) ? (audioPlayer.currentTime += 3) : null;
    }
  }
}
</script>

<style>
.selected {
  background-color: rgb(39, 39, 41);
  border-radius: 10px;
}

.font-size-22 {
  font-size: 22px; 
}

.material-icons {
  margin-top: -3px;
  font-size: 22px;
}

.media-controls:hover {
  color: rgb(119, 142, 168);
}

input[type=range].media-controls {
  -webkit-appearance: none;
  height: 3px;
  cursor: pointer;
  margin-top: 6px;
}

input[type=range].media-controls::-webkit-slider-runnable-track {
  height: 3px;
  background-color: rgb(201, 201, 201);
}

input[type=range].media-controls::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-top: -2px;
  background-color: rgb(224, 224, 224);
}

input[type=range].media-controls:focus {
  outline: none;
}
</style>
