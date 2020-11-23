<template>
  <component :is="element_"
    class="draggable" v-bind:style="{transform: 'translate('+x_+'px, '+y_+'px)'}">
    <slot></slot>
  </component>
</template>

<script>
import interact from 'interactjs'

export default {
  props: ['value', 'element', 'x', 'y', 'spread'],
  data() {
    let pos = this.spread ? this.spreadPos(this.spread) : {x: 0, y: 0}

    return {
      element_: this.element || 'div',
      x_: null,
      y_: null,
    }
  },
  mounted() {
    let vm = this

    let pos = this.spread ? this.spreadPos(this.spread) : {x: 0, y: 0}
    let width = this.$el.offsetWidth
    let height = this.$el.offsetHeight 
    this.x_ = (this.x || pos.x) * this.$el.parentElement.offsetWidth - width/2
    this.y_ = (this.y || pos.y) * this.$el.parentElement.offsetHeight - height/2

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
  methods: {
    spreadPos(spread) {
      let x = spread.from[0] + (spread.to[0] - spread.from[0]) * (spread.index%2) 
      let y = spread.from[1] + (spread.to[1] - spread.from[1])/(Math.floor(spread.count/2)) * (spread.index/2)
      console.log(x)

      return {x, y}
    },
  }
}
</script>

<style>
.draggable {
  display: inline-block; 
  position: absolute;
  left: 0px;
  top: 0px;
  touch-action: none;
}
</style>
