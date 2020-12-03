export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // for access on local network
  server: {
    port: 5555,
    host: '0.0.0.0',
  },

  // this needs to be updated for the ACA website. There is a separate branch.
  // Copy generated files to the relevant ACA folder.
  router: {
    base: '/resources/systems-are-everywhere/activity/',
    trailingSlash: true
  },

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'Systems Are Everywhere',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    'iview/dist/styles/iview.css',
    '~/assets/css/main.css'
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '@/plugins/iview'
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
  ],

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    publicPath: 'assets/',
  }
}
