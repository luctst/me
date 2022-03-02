require('dotenv').config();
export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  loading: '~/components/Loader.vue',
  head: {
    title: 'Software Engineer Paris, Tostée Lucas',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'user-scalable=no, width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Software engineer fullstack javascript working on some cool projects :)' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/main.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugin/api.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/dotenv',
    "@nuxtjs/svg",
    '@nuxtjs/eslint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/style-resources',
  ],

  styleResources: {
    scss: ['@/assets/main.scss']
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
