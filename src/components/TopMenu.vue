<template>
  <div id='top-menu' class="grid top-menu-grid">
    <i class='fas fa-bars menu-icon button grid-center-vertical' @click="toggleSidebar"></i>
    <div v-for="(icon, index) in icons" :key="index" class="button top-menu-item menu-item grid-center-horizontal grid-center-vertical" @click="menuItem(index)">
      <i :class="icon.name" ></i>
      <span> {{ icon.title }} </span>
    </div>
  </div>
</template>

<script>
import mutationTypes from "../store/mutationTypes";

export default {
  data() {
    return {
      icons: [
        { name: 'fas fa-dot-circle', title: 'albums' },
        { name: 'fas fa-users', title: 'artists' },
        { name: 'fas fa-folder', title: 'folders' },
        { name: 'fas fa-list-ul', title: 'playlists' }
      ]
    };
  },
  methods: {
    toggleSidebar: function() {
      console.log('toggle sidebar');
      this.$store.commit({ type: mutationTypes.TOGGLE_SIDEBAR });
    },
    menuItem: function(index) {
      switch(index) {
        case 0:
          this.$store.commit({ type: mutationTypes.OPEN_ALBUMS_PAGE });
          break;
      }
    }
  }
}
</script>

<style>
#top-menu {
  width: 100%;
  background-color: rgb(29, 30, 31);
  height: 50px;
  grid-area: TopMenu;
}
</style>




