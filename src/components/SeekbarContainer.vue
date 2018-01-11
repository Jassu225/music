<template>
  <div>
    <div class="flex-container center-horizontal center-vertical full-height">
      <div class="seek-container">
        <Seekbar />
      </div>
    </div>
  </div>
</template>

<script>
import Seekbar from "./Seekbar.vue";
export default {
  components: {
    Seekbar
  }
}
</script>

<style>
.seek-container {
  width: 75%;
  height: 3px;
  background-color: rgb(57, 74, 73);
  border-radius: 3px;
}
</style>


