import Vuex from 'vuex';
import Vue from 'vue';
import mutationTypes from './mutationTypes';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    sidebar: {
      toggle: true
    }
  },

  mutations: {
    [mutationTypes.TOGGLE_SIDEBAR] (state) {
      state.sidebar.toggle = !state.sidebar.toggle;
      console.log(state.sidebar.toggle);
    }
  }
});

export default store;