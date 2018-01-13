<template>
  <div id='top-menu'>
    <div class="flex-container full-height" style="align-items: center;">
      <i class='fas fa-bars menu-icon button' @click="toggleSidebar"></i>
      <div class="flex-basis-0_85 full-height">
        <div class="full-height" style="display: flex; align-items: center;">
          <div v-for="(icon, index) in icons" :key="index" class="button top-menu-item">
            <i :class="icon.name" ></i>
            <span> {{ icon.title }} </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mutationTypes from "../store/mutationTypes";
// import { icon } from '@fortawesome/fontawesome';

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
    }
  }
}
</script>

<style>
#top-menu {
  width: 100%;
  background-color: rgb(29, 30, 31);
  height: 50px;
}

.flex-basis-0_85 {
  flex-basis: 85%;
}

.top-menu-item {
  min-width: 20%;
  text-align: center;
}

.menu-icon {
  margin-left: 10px;
  flex-basis: 15%;
}
</style>




