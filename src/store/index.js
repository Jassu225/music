import Vuex from 'vuex';
import Vue from 'vue';
import mutationTypes from './mutationTypes';
import actionTypes from './actionTypes';
import libraryFunctions from '../assets/js/libraryFunctions';

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
    },
    [mutationTypes.PLAY_OR_PAUSE] (state) {

    }
  },

  actions: {
    [actionTypes.ADD_FOLDERS_TO_LIBRARY] (context) {
      libraryFunctions.addFolders();
    },
    [actionTypes.ADD_SONGS_TO_LIBRARY] (context) {
      libraryFunctions.fetchMetaData('df');
    }
  }
}); 

export default store;