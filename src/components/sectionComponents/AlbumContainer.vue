<template>
  <div id='albumContainer' :style="{height: ( Math.ceil(this.$store.state.library.albums.length / this.$store.state.section.albumSectionColumnCount) * (this.$store.state.section.albumHeight + 30)) + 'px'}">
    <div class="grid album-container-section-grid">
      <Album v-for="(album, index) in this.$store.state.library.albums.slice(0, 60)"
        :key="index"
        :album="album"
      />
    </div>
    <div class="grid album-container-section-grid">
      <Album v-for="(album, index) in this.$store.state.library.albums.slice(60, 120)"
        :key="index"
        :album="album"
      />
    </div>
  </div>
</template>

<script>
import Album from './Album.vue';

export default {
  data: function() {
    return { 
    };
  },
  components: {
    Album
  },
  methods: {
  }
}
</script>