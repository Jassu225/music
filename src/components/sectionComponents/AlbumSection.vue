<template>
  <div id='albumSection' class="full-width full-height position-absolute section">
    <AlbumContainer />
  </div>
</template>

<script>
import AlbumContainer from './AlbumContainer.vue';

export default {
  components: {
    AlbumContainer
  }  
}
</script>

<style>
#albumSection {
  overflow: auto;
}

.position-absolute {
  position: absolute;
}
</style>
