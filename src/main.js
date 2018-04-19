import Vue from 'vue';
import App from './App.vue';

// stylesheets
import './assets/css/fontawesome-all.css';
import './assets/css/google-material-icons.css';
import './assets/css/generic.css';
import './assets/css/grid.css';
import './assets/css/audio.css';

// generic scripts
import store from './store';
import './assets/js/generic.js';

require("babel-core/register");
require("babel-polyfill");

// // jqueryUI imports
// import jq from './assets/jqueryUI/jquery.js';
// // import './assets/jqueryUI/jquery-ui.min.css';
// import './assets/jqueryUI/jquery-ui.js';


// // font awesome icons
// import 'vue-awesome/icons';
// import Icon from 'vue-awesome/components/Icon';

// Vue.component('icon', Icon)
new Vue({
  el: '#app',
  store,
  // render: h => h(App)
  template: '<App />',
  components: {
    App
  }
});
