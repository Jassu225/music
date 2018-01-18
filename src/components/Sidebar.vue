<template>
  <div id='sidebar' :class="{toggleSidebar: this.$store.state.sidebar.toggle}">
    <div class="sidebar-item button" @click="showAddContentSection">Add Songs</div>
    <div class="sidebar-item button">Item 2</div>
    <div class="sidebar-item button">Item 3</div>
    <div class="sidebar-item button">Item 4</div>
    <div class="sidebar-item button">Item 5</div>
    <div class="sidebar-item button">Item 6</div>
  </div>
</template>

<script>
import mutationTypes from "./../store/mutationTypes";

export default {
  data() {
    return {
      
    };
  },
  methods: {
    showAddContentSection: function() {
      this.$store.commit({ type: mutationTypes.SHOW_ADD_CONTENT_SECTION });
    }
  }
}
</script>

<style>
#sidebar {
  width: 21%;
  height: 100%;
  display: inline-block;
  position: absolute;
  background-color: rgb(32,32,32);
  transition: 0.4s transform ease;
  z-index: 5;
}

.sidebar-item {
  height: 45px;
  display: flex;
  align-items: center;
  padding-left: 15px;
}

.sidebar-item:nth-child(even) {
  background-color: rgb(45,45,45);
}

.toggleSidebar {
  transform: translate3d(-100%,0,0);
}
</style>
