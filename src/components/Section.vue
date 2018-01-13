<template>
  <div id="section" class="full-height full-width">
    <div class="full-width full-height position-relative">
      <AlbumSection />
    </div>
  </div>
</template>

<script>
import AlbumSection from './sectionComponents/AlbumSection.vue';

export default {
  components: {
    AlbumSection
  }
}
</script>

<style>
#section {
  display: inline-block;
  background-color: rgb(42, 44, 43);
}

.position-relative {
  position: relative;
}
</style>
