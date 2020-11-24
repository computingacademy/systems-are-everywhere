<template>
  <div class="slide">
    <div class="content">
      <h1 class="title" v-html="title"></h1>
      <h2 class="instructions" v-html="instruction"></h2>
      <slot></slot>
      <h3 class="subtitle" v-html="subtitle"></h3>
    </div>
    <NavBar :completed="completed"/>
  </div>
</template>

<script>
export default {
  props: ['title', 'instructions', 'subtitle'],
  data() {
    return {
      step: 0,
      completed: false,
    }
  },
  created() {
    let vm = this
    this.$on('complete', function() {
      this.step++
      if (this.step == this.instructions.length)
        vm.completed = true
    })
  },
  computed: {
    instruction() {
      if (typeof this.instructions == 'string')
        return this.instructions
      else
        return this.instructions[Math.min(this.step, this.instructions.length-1)]
    },
  }
}
</script>
