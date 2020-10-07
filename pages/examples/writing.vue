<template>
  <div class="container">
    <div>
      <h1 class="title">
        Systems are in your <em>books</em>
      </h1>
      <h2 class="instructions">
        Create a 4 letter word
      </h2>
      <h3 class="subtitle">
        Writing system
      </h3>
      <WritingInteractive v-on:complete="complete = true" />
      <div class="links">
        <NextButton to="examples/solar-system" v-bind:disabled="!complete" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      complete: false,
    }
  }
}
</script>
