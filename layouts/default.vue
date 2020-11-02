<template>
  <div class="container">
    <div class="slide">
      <Nuxt />
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      meta: [{
        hid: 'responsive',
        name: 'viewport',
        content: 'width=device-width, initial-scale=1.0',
      }, {
        hid: 'web-app',
        name: 'apple-mobile-web-app-capable',
        content: 'yes',
      }]
    },
  }
}
