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
    section: {
      isAlbumsSectionActive: true,
      isArtistsSectionActive: false,
      isFoldersSectionActive: false,
      isPlaylistsSectionActive: false,
      isAddContentSectionActive: false,
      isAlbumContentSectionActive: false
    },
    library: {
      songs: [],
      albums: []
    },
    selectedAlbum: null
  },

  mutations: {
    [mutationTypes.TOGGLE_SIDEBAR] (state) {
      state.sidebar.toggle = !state.sidebar.toggle;
      console.log(state.sidebar.toggle);
    },

    [mutationTypes.ADD_SONGS] (state, payload) {
      state.library.songs = payload.songs;
    },

    [mutationTypes.ADD_ALBUMS] (state, payload) {
      state.library.albums = payload.albums;
    },

    [mutationTypes.ADD_SONGS_AND_ALBUMS] (state, payload) {
      console.log(payload);
      state.library.songs =  state.library.songs.concat(payload.songs);
      state.library.albums = payload.albums;
      // state.library.albums = payload.albums;
      console.log(state);
    },

    [mutationTypes.CHANGE_SELECTED_ALBUM] (state, payload) {
      state.selectedAlbum = payload.album;
    },

    [mutationTypes.OPEN_ALBUMS_PAGE] (state) {
      hideAllSections();
      state.section.isAlbumsSectionActive = true;
    },

    [mutationTypes.SHOW_ADD_CONTENT_SECTION] (state) {
      hideAllSections();
      state.section.isAddContentSectionActive = true;
    },

    [mutationTypes.SHOW_ALBUM_CONTENT_SECTION] (state, payload) {
      hideAllSections();
      state.section.isAlbumContentSectionActive = true;
    },

    // HELPER FUNCTIONS
    hideAllSections () {
      state.section.isAlbumsSectionActive = false;
      state.section.isArtistsSectionActive = false;
      state.section.isFoldersSectionActive = false;
      state.section.isPlaylistsSectionActive = false;
      state.section.isAddContentSectionActive = false;
      state.section.isAlbumContentSectionActive = false;
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
    },

    [actionTypes.SHOW_ALBUM_CONTENT_PAGE] (context, payload) {
      context.commit({
        type: mutationTypes.CHANGE_SELECTED_ALBUM,
        album: payload.album
      });
      context.commit( mutationTypes.SHOW_ALBUM_CONTENT_SECTION );
    }
  },
}); 

export default store;