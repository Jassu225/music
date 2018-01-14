<template>
  <div class="flex-container" style="text-align: center;width: 50%;">
    <i class="material-icons button flex-item media-controls" @click="replay">replay</i>
    <i class="material-icons button flex-item media-controls" @click="seekBackward">fast_rewind</i>
    <i class="material-icons button flex-item media-controls">skip_previous</i>
    <i :class="icons[iconSelector]" class='fas button flex-item media-controls' @click="playOrPause"></i>
    <i class="material-icons button flex-item media-controls">skip_next</i>
    <i class="material-icons button flex-item media-controls" @click="seekForward">fast_forward</i>
    <i class="material-icons button flex-item media-controls" @click="changeRepeatMode">{{ repeatModes[repeatModeSelector] }}</i>
  </div>
</template>

<script>
import keyCodes from '../assets/js/keys';

export default {
  data: function() {
    return {
      icons: ['fa-play-circle','fa-pause-circle'],
      iconSelector: 0,
      repeatModes: ['repeat', 'repeat_one'],
      repeatModeSelector: 0
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
      this.repeatModeSelector = 1 - this.repeatModeSelector;  // Toggles from  0 to 1 and vice-versa
    },
    playOrPause() {
      this.iconSelector = 1 - this.iconSelector;
      audioPlayer.paused? audioPlayer.play() : audioPlayer.pause();
    },
    setOrRemoveLoop() {
      audioPlayer.loop = !audioPlayer.loop;
    },
    muteOrUnmute() {
      audioPlayer.muted = !audioPlayer.muted;
    },
    replay() {
      audioPlayer.currentTime = 0;
      audioPlayer.paused? (audioPlayer.play() && (this.iconSelector = 1 - this.iconSelector)) : null;
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
</style>
