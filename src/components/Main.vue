<template>
  <div id="main" class="flex-container">
    <TopMenu />
    <div class="flex-item" style="position: relative;">
      <Sidebar />
      <Section />
    </div>
    <Footer />
  </div>
</template>

<script>
import TopMenu from './TopMenu.vue';
import Sidebar from './Sidebar.vue';
import Section from './Section.vue';
import Footer from './Footer.vue';

export default {
  data() {
    return {};
  },
  components: {
    TopMenu,
    Sidebar,
    Section,
    Footer
  },
  methods: {
    toggleSidebar: function() {
      console.log('toggle sidebar main.vue');
    }
  }
}
</script>

<style>
#main {
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.flex-container {
  display: flex;
}

.flex-item {
  flex: 1;
}

.flex-basis-0_1 {
  flex-basis: 10%;
}

.flex-basis-0_25 {
  flex-basis: 25%;
}

.flex-basis-0_8 {
  flex-basis: 80%;
}
</style>
