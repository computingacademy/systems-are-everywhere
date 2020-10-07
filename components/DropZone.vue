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
    }

    function ondrop(event) {
      vm.hover = false 

      let obj = event.relatedTarget.__vue__
      obj.$nextTick(function() {
        obj.x = getOffset(vm.$el).left + vm.$el.offsetWidth/2 - obj.$el.offsetWidth/2
        obj.y = getOffset(vm.$el).top + vm.$el.offsetHeight/2 - obj.$el.offsetHeight/2
      })

      vm.$emit('drop', obj.value)
    }

    function onremove(event) {
      vm.contains.splice(vm.contains.indexOf(event.target.__vue__), 1)
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
