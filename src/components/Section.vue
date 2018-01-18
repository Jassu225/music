<template>
  <div id="section" class="full-width full-height">
    <div class="full-width full-height position-relative">
      <AddContentSection :class="{active: this.$store.state.section.isAddContentSectionActive}"/>
      <AlbumSection :class="{active: this.$store.state.section.isAlbumsSectionActive}" />
      <AlbumContentSection :class="{active: this.$store.state.section.isAlbumContentSectionActive}"/>
    </div>
  </div>
</template>

<script>
import AlbumSection from './sectionComponents/AlbumSection.vue';
import AddContentSection from './sectionComponents/AddContentSection.vue';
import AlbumContentSection from './sectionComponents/AlbumContentSection.vue';

export default {
  components: {
    AlbumSection,
    AddContentSection,
    AlbumContentSection
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
