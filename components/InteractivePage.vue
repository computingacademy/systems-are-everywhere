<template>
  <div class="container">
    <div>
      <h1 class="title" v-html="title"></h1>
      <h2 class="instructions" v-html="instructions"></h2>
      <h3 class="subtitle" v-html="subtitle"></h3>
      <slot></slot>
      <div class="links">
        <NextButton v-bind:to="next" v-bind:disabled="!completed" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['title', 'instructions', 'subtitle', 'next'],
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
