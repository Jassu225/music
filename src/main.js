import Vue from 'vue';
import App from './App.vue';

// stylesheets
import './assets/css/fontawesome-all.css'
import './assets/css/generic.css';

// generic scripts
import store from './store';

// // font awesome icons
// import 'vue-awesome/icons';
// import Icon from 'vue-awesome/components/Icon';

// Vue.component('icon', Icon)
new Vue({
  el: '#app',
  store,
  render: h => h(App)
});
