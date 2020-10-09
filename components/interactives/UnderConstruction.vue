<template>
  <div class="interactive under-construction">
    <h2>Under construction</h2>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$parent.$emit('complete')
  }
}
</script>

<style>
.under-construction {
  text-align: center;
  background-color: #ffee33;
}
</style>
