<template>
  <div id="app">
    <Main />
    <!-- <icon name="beer"></icon> -->
  </div>
</template>

<script>
import Main from './components/Main.vue';
export default {
  name: 'app',
  components: {
    Main
  }
}
</script>

<style>
body,html {
  margin: 0;
  background-color: #434447;
  color: whitesmoke;
  width: 100%;
  height: 100%;
  overflow-y: hidden;
}

#app {
  font-family: 'Roboto', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0px;
  width: 100%;
  height: 100%;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
