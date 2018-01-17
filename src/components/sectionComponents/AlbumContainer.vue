<template>
  <div id='albumContainer'>
    <Album v-for="(album, index) in albums" :key="index"
      :album="album"
    />    
  </div>
</template>

<script>
import Album from './Album.vue';

export default {
  data: function() {
    return {
      albums: this.$store.state.library.albums
    };
  },
  components: {
    Album
  }
}
</script>