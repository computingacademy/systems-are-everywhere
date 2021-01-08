<template>
  <div class="slide">
    <div class="content">
      <h1 class="title" v-html="title"></h1>
      <slot></slot>
      <div class="instructions-container">
        <transition name="swap-instructions" v-for="(instruction, index) in instructions_" :key="instruction">
          <h2 class="instructions" v-html="instruction" v-if="index == step"></h2>
        </transition>
        <transition name="swap-instructions">
          <h2 class="instructions" v-if="step >= instructions_.length">
            <em>Task complete!</em>
          </h2>
        </transition>
      </div>
      <NavBar :completed="completed"/>
      <h3 class="subtitle" v-html="subtitle"></h3>
    </div>
  </div>
</template>

<script>
export default {
  props: ['title', 'instructions', 'subtitle'],
  data() {
    return {
      step: 0,
      instructions_: typeof this.instructions == 'string' ? [this.instructions] : this.instructions || [],
      completed: false,
    }
  },
  created() {
    let vm = this
    this.$on('complete', function() {
      this.step++
      if (this.step == this.instructions_.length)
        vm.completed = true
    })
    this.$on('backup', function() {
      this.step--
    })
    this.$on('jump', function(index) {
      this.step = index
    })
  },
}
</script>

<style scoped>
.instructions-container {
  text-align:right;
}
.swap-instructions-enter-active {
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: clip;
  transition: width 4s;
  width: 100%;
}
.swap-instructions-enter {
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: clip;
  width: 0px;
  text-align: center;
}
.swap-instructions-leave-to, .swap-instructions-leave-active {
  display: none;
}
</style>
