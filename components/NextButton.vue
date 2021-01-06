<template>
  <Button type="primary" rel="noopener noreferrer" v-bind:to="to">
    <strong>NEXT</strong>
    <Icon type="ios-arrow-forward" />
  </Button>
</template>

<script>
export default {
 props: ['to'],
}
</script>

<style>
</style>
