<template>
  <div id="section" class="full-width full-height">
    <div class="full-width full-height position-relative">
      <AddContentSection />
      <AlbumSection />
    </div>
  </div>
</template>

<script>
import AlbumSection from './sectionComponents/AlbumSection.vue';
import AddContentSection from './sectionComponents/AddContentSection.vue'
export default {
  components: {
    AlbumSection,
    AddContentSection
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
