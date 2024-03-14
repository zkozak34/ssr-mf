export default defineNuxtConfig({
  devtools: { enabled: true },
  devServer: {
    port: 3002,
  },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})
