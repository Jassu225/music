<template>
  <div class="album col-3 table center-text button" @click="openAlbum">
    <div class="table-cell vertically-middle">
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
* {
  box-sizing: border-box;
}
  
.col-1 {
   width: 8.33%;
}

.col-2 {
   width: 16.67%;
}

.col-3 {
   width: 25%;
}

.col-4 {
   width: 33.33%;
}

.col-5 {
   width: 41.67%;
}

.col-6 {
   width: 50%;
}

.col-7 {
   width: 58.33%;
}

.col-8 {
   width: 66.67%;
}

.col-9 {
   width: 75%;
}

.col-10 {
   width: 83.33%;
}

.col-11 {
   width: 91.67%;
}

.col-12 {
   width: 100%;
}

.center-text {
  text-align: center;
}

.inline {
  display: inline-block;
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
  padding: 20px;
}

#albumContainer .album-title {
  height: 34px;
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