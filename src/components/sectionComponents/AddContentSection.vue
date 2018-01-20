<template>
  <div id='addContentSection' class="full-width full-height position-absolute table section">
    <div class="table-cell">
      <p id='addSongs' class="center-text">Hi</p>
      <div class="flex-container center-horizontal center-vertical">
        <div class="button addBtn center-text table" @click="addFolders"><p class="table-cell">add Folders</p></div>
        <div class="button addBtn center-text table" @click="addSongs"><p class="table-cell">add Songs</p></div>
      </div>
    </div>
  </div>
</template>

<script>
import actionTypes from '../../store/actionTypes.js';

export default {
  methods: {
    addFolders: function() {
      this.$store.dispatch(actionTypes.ADD_FOLDERS_TO_LIBRARY);
    },
    addSongs: function() {
      this.$store.dispatch(actionTypes.ADD_SONGS_TO_LIBRARY);
    }
  }
}
</script>

<style>

.section {
  z-index: 1;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgb(39, 39, 39);
}

.section.active {
  z-index: 2;
}

.table {
  display: table;
}

.table-cell {
  display: table-cell;
  vertical-align: middle;
}

.addBtn {
  width: 120px;
  margin: 0 20px;
  height: 40px;
  background-color: rgb(36, 83, 143);
}
</style>