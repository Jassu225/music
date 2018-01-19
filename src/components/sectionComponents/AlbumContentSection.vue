<template>
  <div id="albumContentSection" class="full-height section">
    <div class="flex-container full-height">
      <div id="coverContainer">
        <div class="inline padding-20 width-200 height-250">
          <img :src="this.$store.state.selectedAlbum ? this.$store.state.selectedAlbum.cover: null" @click="clicked" />
        </div>
      </div>
      <div class="flex-item">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    clicked: function() {
      console.log(this.$store.state.selectedAlbum);
    }
  }
}
</script>

<style>
#coverContainer {
  height: 250px;
  position: relative;
}

#coverContainer img {
  width: 165px;
  height: 210px;
}

.padding-20 {
  padding: 20px;
}

.width-200 {
  width: 200px;
}

.height-250 {
  height: 250px;
}
</style>
