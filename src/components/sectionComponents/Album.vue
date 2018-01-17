<template>
  <div class="album">
    <div class="image">
      <img :src="album.cover"/>
    </div>
    <div class="album-title">{{album.title}}</div>
  </div>
</template>

<script>
export default {
  props: ['album']
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

.album .image {
  width: 100px;
  height: 120px;
  max-width: 100%;
}
</style>