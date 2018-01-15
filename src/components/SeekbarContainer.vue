<template>
  <div id="seek-container" @mousedown="getOffsetX">
    <Seekbar
    :seekPercentage="seekPercentage"
    :updateCurrentTime="updateCurrentTime"
    :updateDuration="updateDuration"
    :posX1="posX1"
    :posX2="posX2"
    :draggable="draggable"
    :disableDrag="disableDrag"
    :changePlayPauseIconIndex="changePlayPauseIconIndex"
    :setToPlayIcon="setToPlayIcon"
    :setToPauseIcon="setToPauseIcon" />
  </div>
</template>

<script>
import Seekbar from "./Seekbar.vue";

export default {
  data() {
    return {
      seekPercentage: 0,
      draggable: false,
      posX1: 0,
      posX2: 0
    };
  },
  props: [
    'updateCurrentTime',
    'updateDuration',
    'changePlayPauseIconIndex',
    'setToPlayIcon',
    'setToPauseIcon'
  ],
  components: {
    Seekbar
  },
  methods: {
    getOffsetX: function(event) {
      // console.log(event);
      // console.log(this.$el.offsetWidth);
      // console.log(event.offsetWidth);
      // console.log(this.$el.getClientRects());
      let boundinClientRect = this.$el.getBoundingClientRect();
      this.posX1 = boundinClientRect.left;
      this.posX2 = boundinClientRect.right;
      console.log(this.posX2 - this.posX1);
      this.seekPercentage = ( (event.x - this.posX1) / (this.posX2 - this.posX1) );
      this.draggable = true;
      console.log(this.seekPercentage);
      // this.seek = !this.seek;
      // console.log('et')
    },
    disableDrag: function() {
      // this.removeListener  = !this.removeListener;
      this.draggable = false;
    }
  }
}
</script>

<style>
#seek-container {
  width: 100%;
  height: 3px;
  background-color: rgb(57, 74, 73);
  border-radius: 3px;
  cursor: pointer;
}
</style>


