<template>
  <div id="footer">
    <div class="flex-container full-height">
      <div id="topMenuAlias">
        <div class='image-container'></div>
      </div>
      <div class="flex-item">
        <div class="flex-container full-height" style="flex-direction: column;">
          <SeekbarContainer class="flex-item"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SeekbarContainer from './SeekbarContainer.vue';

export default {
  components: {
    SeekbarContainer
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
</style>
