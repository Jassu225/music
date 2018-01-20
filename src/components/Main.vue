<template>
  <div id="main" class="grid app-grid">
    <TopMenu />
    <div class="main-section">
      <div class="position-relative full-height" >
        <Sidebar />
        <Section />
      </div>
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

.main-section {
  grid-area: MainSection;
}
</style>
