<template>
  <div id="seekbar-tip"></div>
</template>

<script>
export default {
  mounted() {
    this.dragSeekbar();
  },
  methods: {
    dragSeekbar: function() {
      // let pos1 = 0,
      //   pos2 = 0,
      //   pos3 = 0,
      //   pos4 = 0;
      
      // let element = this.$el;
      // let parent = this.$el.parentElement;
      // element.onmousedown = dragMouseDown;

      // function dragMouseDown(e) {
      //   e = e || window.event;
      //   // get the mouse cursor position at startup:
      //   pos3 = e.clientX;
      //   pos4 = e.clientY;
      //   element.onmouseup = closeDragElement;
      //   // call a function whenever the cursor moves:
      //   element.onmousemove = elementDrag;
      // }

      // function elementDrag(e) {
      //   e = e || window.event;
      //   // calculate the new cursor position:
      //   pos1 = pos3 - e.clientX;
      //   pos2 = pos4 - e.clientY;
      //   pos3 = e.clientX;
      //   pos4 = e.clientY;
      //   // set the element's new position:
      //   element.style.top = element.offsetTop - pos2 + "px";
      //   element.style.left = element.offsetLeft - pos1 + "px";
      // }

      // function closeDragElement() {
      //   /* stop moving when mouse button is released:*/
      //   element.onmouseup = null;
      //   element.onmousemove = null;
      // }
    }
  }
};
</script>

<style>
#seekbar-tip {
  float: right;
  width: 8px;
  height: 8px;
  margin-top: -2px;
  border-radius: 50%;
  background-color: aliceblue;
  cursor: pointer;
  position: relative;
}
</style>