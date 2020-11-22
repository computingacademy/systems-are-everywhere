<template>
  <component :is="element_"
    class="draggable" v-bind:style="{transform: 'translate('+x_+'px, '+y_+'px)'}">
    <slot></slot>
  </component>
</template>

<script>
import interact from 'interactjs'

export default {
  props: ['value', 'element', 'x', 'y'],
  data() {
    return {
      element_: this.element || 'div',
      x_: this.x || 0,
      y_: this.y || 0,
    }
  },
  mounted() {
    let vm = this

    function dragMoveListener(event) {
      event.preventDefault()

      var target = event.target
      // keep the dragged position in the x/y attributes
      vm.x_ += event.dx
      vm.y_ += event.dy
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
  touch-action: none;
}
</style>
