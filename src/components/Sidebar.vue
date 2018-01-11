<template>
  <div id='sidebar' :class="{toggleSidebar: this.$store.state.sidebar.toggle}">
    <div class="sidebar-item">Item 1</div>
    <div class="sidebar-item">Item 2</div>
    <div class="sidebar-item">Item 3</div>
    <div class="sidebar-item">Item 4</div>
    <div class="sidebar-item">Item 5</div>
    <div class="sidebar-item">Item 6</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      
    };
  }
}
</script>

<style>
#sidebar {
  width: 21%;
  height: 100%;
  display: inline-block;
  position: absolute;
  background-color: rgb(39, 39, 39);
  transition: 0.4s transform ease;
}

.sidebar-item {
  height: 45px;
  display: flex;
  align-items: center;
  padding-left: 15px;
}

.sidebar-item:nth-child(even) {
  background-color: rgb(27, 28, 31);
}

.toggleSidebar {
  transform: translate3d(-100%,0,0);
}
</style>
