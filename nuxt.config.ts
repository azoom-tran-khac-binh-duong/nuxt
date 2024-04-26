// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', ['@nuxtjs/google-fonts', {
    families: {
      'DM Sans': [300, 400, 700],
    },
    display: 'swap',
  }], '@nuxtjs/fontaine', '@nuxt/image', 'nuxt-icon'],
  eslint: {
    config: {
      stylistic: true,
    },
  },
  css: ['@/assets/styles/main.scss'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/styles/abstracts/_index.scss";',
        },
      },
    },
  },
  typescript: {
    typeCheck: true,
    strict: true,
  },
})
