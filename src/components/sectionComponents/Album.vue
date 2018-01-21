<template>
  <div class="album full-width table center-text button grid-center-horizontal" @click="openAlbum">
    <div class="table-cell vertically-middle background padding-top-10">
      <div class="image table">
        <img class="table-cell vertically-middle" :src="album.cover"/>
      </div>
      <div class="album-title">{{album.title}}</div>
    </div>
  </div>
</template>

<script>
import actionTypes from './../../store/actionTypes';

export default {
  props: ['album'],
  methods: {
    openAlbum: function() {
      this.$store.dispatch({
        type: actionTypes.SHOW_ALBUM_CONTENT_PAGE,
        album: this.album
      });
    }
  }
}
</script>

<style>
.background {
  background-color: rgb(53, 55, 56);
}

.inline {
  display: inline-block;
}

.padding-top-10 {
  padding-top: 10px;
}

.table {
  display: inline-table;
}

.table-cell {
  display: table-cell;
}

.vertically-middle {
  vertical-align: middle;
}

#albumContainer .album {
  height: 210px;
  max-width: 180px !important;
}

#albumContainer .album-title {
  width: 8rem;
  height: 34px;
  margin: auto;
  white-space: nowrap;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
}

#albumContainer .album .image {
  width: 120px;
  height: 156px;
}

#albumContainer .album .image img {
  width: 120px;
  max-height: 156px;
}
</style>