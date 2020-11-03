<template>
  <div class="drop-zone" v-bind:class="{hover: hover}">
    <slot></slot>
  </div>
</template>

<script>
import interact from 'interactjs'

function getOffset(el) {
  return {
    left: el.offsetLeft + (el.offsetParent ? el.offsetParent.offsetLeft : 0),
    top: el.offsetTop + (el.offsetParent ? el.offsetParent.offsetTop : 0),
  };
}

export default {
  props: ['snap'],
  data() {
    return {
      hover: false,
    }
  },
  mounted() {
    let vm = this

    function ondragenter(event) {
      vm.hover = true
    }

    function ondragleave(event) {
      vm.hover = false 

      let obj = event.relatedTarget.__vue__
      vm.$emit('leave', obj.value)
    }

    function ondrop(event) {
      vm.hover = false 

      let obj = event.relatedTarget.__vue__
      if (vm.snap) {
        obj.$nextTick(function() {
          obj.x_ = getOffset(vm.$el).left + vm.$el.offsetWidth/2 - obj.$el.offsetWidth/2 - obj.$el.offsetLeft
          obj.y_ = getOffset(vm.$el).top + vm.$el.offsetHeight/2 - obj.$el.offsetHeight/2 - obj.$el.offsetTop
        })
      }

      vm.$emit('drop', obj.value)
    }

    function onremove(event) {
      vm.contains.splice(vm.contains.indexOf(event.target.__vue__), 1)

      let obj = event.relatedTarget.__vue__
      vm.$emit('remove', obj.value)
    }

    interact(vm.$el)
      .dropzone({
        overlap: 0.51,
        ondragenter, ondragleave,
        ondrop, onremove
      })
  },
}
</script>

<style>
.drop-zone {
}
</style>
