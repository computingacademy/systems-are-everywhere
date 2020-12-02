<template>
  <div class="drop-zone" v-bind:class="{hover: hover}">
    <slot></slot>
  </div>
</template>

<script>
import interact from 'interactjs'

export default {
  props: ['snap', 'multiple'],
  data() {
    return {
      hover: false,
      contents: null,
      value: null,
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

      if (obj == vm.contents)
        vm.contents = null
    }

    function ondrop(event) {
      vm.hover = false 

      let oldContents = vm.contents
      vm.contents = event.relatedTarget.__vue__
      vm.value = vm.contents.value

      if (vm.snap) {
        if (oldContents && !vm.multiple) {
          oldContents.$nextTick(() => {
            oldContents.x_ -= 20
            oldContents.y_ -= 20
          })
        }
        vm.contents.$nextTick(() => {
          vm.contents.x_ = vm.$el.offsetLeft + vm.$el.offsetWidth/2 - vm.contents.$el.offsetWidth/2 - vm.contents.$el.offsetLeft
          vm.contents.y_ = vm.$el.offsetTop + vm.$el.offsetHeight/2 - vm.contents.$el.offsetHeight/2 - vm.contents.$el.offsetTop
        })
      }

      vm.$emit('drop', vm.value)
    }

    function onremove(event) {
      vm.contents = null
      vm.$emit('remove', vm.value)
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
.dragdrop {
  position: relative;
}
</style>
