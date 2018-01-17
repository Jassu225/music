import Vuex from 'vuex';
import Vue from 'vue';
import mutationTypes from './mutationTypes';
import actionTypes from './actionTypes';
import libraryFunctions from '../assets/js/libraryFunctions';
import { Objects } from '../assets/js/objectsAndSchemas';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    sidebar: {
      toggle: true
    },
    library: {
      songs: [],
      albums: []
    }
  },

  mutations: {
    [mutationTypes.TOGGLE_SIDEBAR] (state) {
      state.sidebar.toggle = !state.sidebar.toggle;
      console.log(state.sidebar.toggle);
    },
    [mutationTypes.ADD_SONGS_AND_ALBUMS] (state, payload) {
      console.log(payload);
      state.library.songs =  state.library.songs.concat(payload.songs);
      state.library.albums = payload.albums;
      // state.library.albums = payload.albums;
      console.log(state);
    }
  },

  actions: {
    async [actionTypes.ADD_FOLDERS_TO_LIBRARY] (context) {
      let songs = await libraryFunctions.addFolders();
      console.log(songs);
      let albums = await Objects.fetchAlbumsFromDB();
      console.log(albums);
      context.commit({
        type: mutationTypes.ADD_SONGS_AND_ALBUMS,
        songs: songs,
        albums: albums
      });
    },
    [actionTypes.ADD_SONGS_TO_LIBRARY] (context) {
      libraryFunctions.fetchMetaData('df');
    }
  }
}); 

export default store;