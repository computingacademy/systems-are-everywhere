<template>
  <div class="slide">
    <div class="content">
      <h1 class="title" v-html="title"></h1>
      <h2 class="instructions" v-html="instructions"></h2>
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
      completed: false,
    }
  },
  created() {
    let vm = this
    this.$on('complete', function() {
      vm.completed = true
    })
  },
}
</script>
