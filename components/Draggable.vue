<template>
  <component :is="element"
    class="draggable" v-bind:style="{transform: 'translate('+x+'px, '+y+'px)'}">
    <slot></slot>
  </component>
</template>

<script>
import interact from 'interactjs'

export default {
  props: ['value', 'element', 'x', 'y'],
  data() {
    return {
      element: this.element || 'div',
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
