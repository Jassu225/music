<template>
  <div id='albumContainer'>
    <Album v-for="(album, index) in this.$store.state.library.albums" :key="index"
      :album="album"
    />    
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