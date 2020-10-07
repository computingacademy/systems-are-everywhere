<template>
  <div class="draggable" v-bind:style="{left: x+'px', top: y+'px'}">
    <slot></slot>
  </div>
</template>

<script>
import interact from 'interactjs'

export default {
  props: ['value'],
  data() {
    return {
      x: 50 + Math.random()*200,
      y: 200 + Math.random()*250,
    }
  },
  mounted() {
    let vm = this

    function dragMoveListener(event) {
      var target = event.target
      // keep the dragged position in the x/y attributes
      vm.x += event.dx
      vm.y += event.dy
    }

    interact(vm.$el)
      .draggable({
        listeners: { move: dragMoveListener }
      })
  },
}
</script>

<style>
.draggable {
  display: inline-block; 
  position: absolute;
}
</style>
