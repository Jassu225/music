<template>
  <div id="seek-container" @click="getOffsetX">
    <Seekbar :seek="seek" :seekPercentage="seekPercentage"/>
  </div>
</template>

<script>
import Seekbar from "./Seekbar.vue";

export default {
  data() {
    return {
      seek: false,
      seekPercentage: 0
    };
  },
  components: {
    Seekbar
  },
  methods: {
    getOffsetX: function(event) {
      // console.log(event);
      // console.log(this.$el.offsetWidth);
      // console.log(event.offsetWidth);
      this.seekPercentage = ( event.offsetX / this.$el.offsetWidth );
      this.seek = !this.seek;
      // console.log()
    }
  }
}
</script>

<style>
#seek-container {
  width: 75%;
  height: 3px;
  background-color: rgb(57, 74, 73);
  border-radius: 3px;
  cursor: pointer;
}
</style>


