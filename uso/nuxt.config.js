export default {

  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    script: [
    
      {
        src: '/lib/howler.min.js',
        src: '/lib/progressbar.min.js',
      },

    ],
    title: 'uso',
    htmlAttrs: {
      lang: 'en',




    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/global.css', '~/assets/loading-bar.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/auth0'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/dotenv',
    '@nuxtjs/fontawesome',
  ],
  fontawesome: {
    icons: {
      solid: true,
      brands: true,
    },
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next'
  ],

  auth: {
    redirect: {
      login: '/home', // redirect user when not connected
      callback: '/home'
    },
    strategies: {
      auth0: {
        domain: "dev-2szf794g.us.auth0.com",
        client_id: "TUkKq8Vy2c0V85piTSKDhyMTQmavtQE7"
      }
    }
  },
  router: {
    middleware: ['auth']
  },
  server: {
    host: '0.0.0.0',
    port: 8090,
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
};
