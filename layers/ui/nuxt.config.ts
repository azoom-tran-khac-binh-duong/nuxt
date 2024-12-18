export default defineNuxtConfig({
  css: ['./assets/style/app.css'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "./assets/style/scss/_mixins.scss" as *;',
        },
      },
    },
  },
})
