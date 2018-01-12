import keyCodes from './keys.js';
import store from '../../store';
import mutationTypes from '../../store/mutationTypes.js';

window.audioPlayer = null;    // captures audio html element in seekbar.vue

// key listeners

window.addEventListener("keypress", (event) => {
  var keyCode = event.which | event.keyCode ;
  console.log(keyCode);
  switch(keyCode) {
    case keyCodes.SPACE_BAR:
      audioPlayer.paused? audioPlayer.play() : audioPlayer.pause(); 
      break;
    
    case keyCodes.l:
    case keyCodes.L:
      audioPlayer.loop = !audioPlayer.loop;
      break;

    case keyCodes.m:
    case keyCodes.M:
      audioPlayer.muted = !audioPlayer.muted;
      break;
  }
});

window.addEventListener("keyup", (event) => {
  var keyCode = event.which | event.keyCode ;
  console.log(keyCode);
  switch(keyCode) {
    case keyCodes.LEFT_ARROW:
      // 0 = HAVE_NOTHING - no information whether or not the audio/video is ready
      // 1 = HAVE_METADATA - metadata for the audio/video is ready
      // 2 = HAVE_CURRENT_DATA - data for the current playback position is available, but not enough data to play next frame/millisecond
      // 3 = HAVE_FUTURE_DATA - data for the current and at least the next frame is available
      // 4 = HAVE_ENOUGH_DATA - enough data available to start playing
      (audioPlayer.readyState >= 2) ? (audioPlayer.currentTime -= 3) : null;
      break;

    case keyCodes.RIGHT_ARROW:
      (audioPlayer.readyState >= 2) ? (audioPlayer.currentTime += 3) : null;
      break;
  }
});

// Helper functions


